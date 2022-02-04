package controller

import (
	"context"
	"fmt"
	"log"

	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	"github.com/wurew34/Gator-SubleasingSESPR22/configs"

	helper "github.com/wurew34/Gator-SubleasingSESPR22/helpers"
	"github.com/wurew34/Gator-SubleasingSESPR22/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "users")
var validate = validator.New()

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

func VerifyPassword(userPassword string, givenPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(givenPassword), []byte(userPassword))
	if err != nil {
		return false, fmt.Sprintf("login password is not correct")
	}
	return true, ""
}
func CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {

		//allow all origins
		c.Header("Content-Type", "application/json")
		c.Header("Access-Control-Allow-Origin", "*")
		// c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		validationErr := validate.Struct(user)
		if validationErr != nil {
			log.Panic("Validation Error: ", validationErr)
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
			return
		}

		count, err := userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		defer cancel()
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error while checking for the email"})
			return
		}

		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "email already exists"})
			return
		}

		password := HashPassword(*user.Password)
		user.Password = &password

		user.Created_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.Updated_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.ID = primitive.NewObjectID()
		user.User_id = user.ID.Hex()
		token, refreshToken, _ := helper.GenerateTokens(*user.First_name, *user.Last_name, *user.Email, user.User_id)
		user.Token = &token
		user.Refresh_token = &refreshToken

		resultInsertionNumber, insertErr := userCollection.InsertOne(ctx, user)
		if insertErr != nil {
			msg := fmt.Sprintf("User was not created")
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}
		defer cancel()

		c.JSON(http.StatusOK, resultInsertionNumber)
	}
}
func LoginUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User
		var searchUser models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		filter := bson.M{"email": user.Email}
		err := userCollection.FindOne(ctx, filter).Decode(&searchUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error while getting user"})
			return
		}

		isValid, msg := VerifyPassword(*user.Password, *searchUser.Password)
		if isValid != true {
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}
		if searchUser.Email == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "email is not registered"})
			return
		}
		token, refreshToken, _ := helper.GenerateTokens(*searchUser.First_name, *searchUser.Last_name, *searchUser.Email, searchUser.User_id)
		helper.UpdateTokens(token, refreshToken, searchUser.User_id)

		err = userCollection.FindOne(ctx, filter).Decode(&searchUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error while getting user"})
			return
		}

		c.SetCookie(
			"token",
			token,
			3600,
			"",
			"",
			false,
			true,
		)

		c.JSON(http.StatusOK, gin.H{"token": token, "refresh_token": refreshToken, "user": searchUser})
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {

		cookie, cookie_err := c.Cookie("token")
		if cookie == "" || cookie_err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}
		token, msg := helper.ValidateToken(cookie)
		if msg != "" {
			c.JSON(http.StatusUnauthorized, gin.H{"authentication error": "user is not authenticated"})
			return
		}

		userId := token.Uid
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User
		filter := bson.M{"user_id": userId}
		err := userCollection.FindOne(ctx, filter).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error while getting user"})
			return
		}
		c.JSON(http.StatusOK, user)
	}
}
func GetUserById() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("userId")
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User
		filter := bson.M{"user_id": userId}
		err := userCollection.FindOne(ctx, filter).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error while getting user"})
			return
		}
		c.JSON(http.StatusOK, user)
	}
}

func LoginUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User
		var searchUser models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		filter := bson.M{"email": user.Email}
		err := userCollection.FindOne(ctx, filter).Decode(&searchUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error while getting user"})
			return
		}

		isValid, msg := VerifyPassword(*searchUser.Password, *user.Password)
		if isValid != true {
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}
		if searchUser.Email == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "email is not registered"})
			return
		}
		token, refreshToken, _ := helper.GenerateAllTokens(*searchUser.Email, *searchUser.First_name, *searchUser.Last_name, searchUser.User_id)
		helper.UpdateAllTokens(token, refreshToken, searchUser.User_id)

		err = userCollection.FindOne(ctx, filter).Decode(&searchUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error while getting user"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"token": token, "refresh_token": refreshToken, "user": searchUser})
	}
}
