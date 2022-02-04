package main

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/wurew34/Gator-SubleasingSESPR22/configs"
	"github.com/wurew34/Gator-SubleasingSESPR22/models"

	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"?\
)

var testUserCollection *mongo.Collection = configs.GetCollection(configs.DB, "users")

func Test_SignUp(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/users/signup", controller.CreateUser())
	// Test User for SignUp
	email := "test@test3.com"
	password := "test1234"
	first_name := "test"
	last_name := "user"

	test_user := models.User{
		Email:      &email,
		Password:   &password,
		First_name: &first_name,
		Last_name:  &last_name,
	}
	reqBody, _ := json.Marshal(test_user)

	req, _ := http.NewRequest(http.MethodPost, "/users/signup", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	// Check the status code is what we expect.
	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")

	// Test User is dropped after test
	drop_User(test_user)

}

func drop_User(testUser models.User) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	_, err := testUserCollection.DeleteOne(ctx, bson.M{"email": testUser.Email})
	if err != nil {
		log.Fatal(err)
	}
}
