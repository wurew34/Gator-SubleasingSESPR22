package main

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
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

<<<<<<< HEAD
func init_test_user() {
	// Test User for SignUp
	r := gin.Default()
	email := "test@test.com"
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

	req, _ := http.NewRequest(http.MethodPost, "api/users/signup", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
}

func TestMain(m *testing.M) {
	// Run the tests
	// run all tests

	os.Exit(m.Run())
}

=======
>>>>>>> 78261778f2e0295979902d5df45d255bd5676e58
func Test_SignUp(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/users/signup", controller.CreateUser())
	// Test User for SignUp
	email := "test@test.com"
	password := "test1234"
	first_name := "test"
	last_name := "user"
	test_user1 := models.User{
		Email:      &email,
		Password:   &password,
		First_name: &first_name,
		Last_name:  &last_name,
	}
	drop_User(test_user1)

	reqBody, _ := json.Marshal(test_user1)

	req, _ := http.NewRequest(http.MethodPost, "/api/users/signup", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
	// drop_User(test_user1)
<<<<<<< HEAD
}

func Test_Login(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/users/login", controller.LoginUser())

	// Test User for Login
	email := "test@test.com"
	password := "test1234"

	test_user1 := models.User{
		Email:    &email,
		Password: &password,
	}

	// init_test_user()

	reqBody, _ := json.Marshal(test_user1)

	req, _ := http.NewRequest(http.MethodPost, "/api/users/login", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
	// drop_User(test_user1)
=======
>>>>>>> 78261778f2e0295979902d5df45d255bd5676e58
}



func Test_Login(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/users/login", controller.LoginUser())

	// Test User for Login
	email := "test@test.com"
	password := "test1234"

	test_user1 := models.User{
		Email:      &email,
		Password:   &password,
	}

	// init_test_user()

	reqBody, _ := json.Marshal(test_user1)

	req, _ := http.NewRequest(http.MethodPost, "/api/users/login", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
	// drop_User(test_user1)
}

// func Test_CreateLease(t *testing.T) {
// 	r := gin.Default()
// 	a := assert.New(t)
// 	r.POST("/api/lease/create", controller.CreateLease())

// 	lease := models.Lease{
// 		Title: "test lease",
// 		Description: "test lease description",
// 		Price: 100,
// 		Bedrooms: 2,
// 		Bathrooms: 1,
// 		Term: 12,
// }

// 	reqBody, _ := json.Marshal(lease)

// 	req, _ := http.NewRequest(http.MethodPost, "/api/lease/create", bytes.NewBuffer(reqBody))

// 	w := httptest.NewRecorder()
// 	req.Header.Set("Content-Type", "application/json")
// 	r.ServeHTTP(w, req)
// 	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
// 	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
// }



func Test_InvalidSignUp(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/users/signup", controller.CreateUser())

	// Test User for SignUp
	email := "test@test3.com"
	password := ""
	first_name := "t"
	last_name := "us"

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
	a.Equal(http.StatusNotFound, w.Code, "HTTP request status code error")

	// Test User is dropped after test
	drop_User(test_user)
}

func Test_InvalidEmail(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/users/signup", controller.CreateUser())

	// Test User for SignUp
	email := ""
	password := "12345"
	first_name := "jane"
	last_name := "doe"

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
	a.Equal(http.StatusNotFound, w.Code, "HTTP request status code error")

	// Test User is dropped after test
	drop_User(test_user)
}

func Test_InvalidPassword(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/users/signup", controller.CreateUser())

	// Test User for SignUp
	email := "test4@test.com"
	password := ""
	first_name := "john"
	last_name := "doe"

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
	a.Equal(http.StatusNotFound, w.Code, "HTTP request status code error")

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

