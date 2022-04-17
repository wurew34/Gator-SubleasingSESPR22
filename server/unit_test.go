package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"


	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/wurew34/Gator-SubleasingSESPR22/configs"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
	"github.com/wurew34/Gator-SubleasingSESPR22/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var testUserCollection *mongo.Collection = configs.GetCollection(configs.DB, "users")
var testLeaseCollection *mongo.Collection = configs.GetCollection(configs.DB, "leases")

var UserId string
var LeaseId string

func TestMain(m *testing.T) {
	m.Log("Unit Tests Started")
	m.Run("Test Signup", Test_SignUp)
	m.Run("Test Login", Test_Login)
	m.Run("Test Invalid SignUp", Test_InvalidSignUp)
	m.Run("Test Invalid Login", Test_InvalidLogin)
	drop_Lease()
	m.Run("Test Create Lease", Test_CreateLease)
	m.Run("Test Get By Id", Test_GetLeaseById)
	m.Run("Test Get Leases", Test_GetLease)
	m.Run("Test Get Leases By Search Term", Test_GetLeaseBySearchTerm)
	m.Run("Test Get Leases By Sort", Test_GetLeaseBySort)
	m.Run("Test Get Leases by Bed and Bath rooms", Test_GetLeaseByRooms)
	m.Run("Test Get Leases by Pagination", Test_GetLeaseByPagination)
	m.Run("Test Get All Lease", Test_GetAllLeases)
	m.Run("Test Search Lease", Test_SearchLeases)
	m.Run("Test Update Lease", Test_UpdateLease)
	m.Run("Test Delete Lease", Test_DeleteLease)
	m.Log("Unit Tests Completed")

}

func Test_SignUp(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/test/users/signup", controller.CreateUser())
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
	reqBody, _ := json.Marshal(test_user1)
	// req, _ := http.NewRequest(http.MethodPost, "/api/test/users/login", bytes.NewBuffer(reqBody))

	req := httptest.NewRequest(http.MethodPost, "/api/test/users/signup", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	body := w.Body.String()
	UserId = body[len("{'InsertedID':'") : len(body)-len("'}")]

	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_Login(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/test/users/login", controller.LoginUser())

	email := "test@test.com"
	password := "test1234"

	test_user1 := models.User{
		Email:    &email,
		Password: &password,
	}
	reqBody, _ := json.Marshal(test_user1)
	// req, _ := http.NewRequest(http.MethodPost, "/api/test/users/login", bytes.NewBuffer(reqBody))
	req := httptest.NewRequest(http.MethodPost, "/api/test/users/login", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
	drop_User(test_user1)

}

func Test_InvalidLogin(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/test/users/login", controller.LoginUser())

	email := "test@test.com"
	password := "test1234"

	test_user1 := models.User{
		Email:    &email,
		Password: &password,
	}
	reqBody, _ := json.Marshal(test_user1)

	// req, _ := http.NewRequest(http.MethodPost, "/api/test/users/login", bytes.NewBuffer(reqBody))
	req := httptest.NewRequest(http.MethodPost, "/api/test/users/login", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusInternalServerError, w.Code, "HTTP request status code error")
	drop_User(test_user1)
}

func Test_InvalidSignUp(t *testing.T) {

	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/test/users/signup", controller.CreateUser())
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

	// req, _ := http.NewRequest(http.MethodPost, "/users/test/signup", bytes.NewBuffer(reqBody))
	req := httptest.NewRequest(http.MethodPost, "/users/test/signup", bytes.NewBuffer(reqBody))

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
	r.POST("/api/test/users/signup", controller.CreateUser())

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

	// req, _ := http.NewRequest(http.MethodPost, "/api/test/users/signup", bytes.NewBuffer(reqBody))
	req := httptest.NewRequest(http.MethodPost, "/api/test/users/signup", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusNotFound, w.Code, "HTTP request status code error")

	// Test User is dropped after test
	drop_User(test_user)
}

//test create lease
func Test_CreateLease(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.POST("/api/test/lease/create", controller.CreateLease())

	lease := models.Lease{
		Title:       "test lease",
		Description: "test lease description",
		Address:     "2800 SW Williston Rd, Gainesville, FL 32603",
		Price:       100,
		User_id:     "23",
		Bedrooms:    2,
		Bathrooms:   1,
		Term:        12,
	}

	reqBody, _ := json.Marshal(lease)

	// req, _ := http.NewRequest(http.MethodPost, "/api/test/lease/create", bytes.NewBuffer(reqBody))
	req := httptest.NewRequest(http.MethodPost, "/api/test/lease/create", bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	res := w.Body.String()

	LeaseId = res[len("{'_id':'") : len("{'_id':'")+24]

	a.Equal(http.MethodPost, req.Method, "HTTP request method error")
	a.Equal(http.StatusCreated, w.Code, "HTTP request status code error")
	// drop_Lease(lease)
}

func Test_UpdateLease(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.PUT("/api/test/lease/:leaseId", controller.UpdateLease())

	lease := models.Lease{
		Title:       "test lease",
		Description: "test lease description",
		Address:     "2800 SW Williston Rd, Gainesville, FL 32603",
		Price:       160,
		User_id:     "23",
		Lease_id:    LeaseId,
		Bedrooms:    2,
		Bathrooms:   1,
		Term:        15,
	}

	reqBody, _ := json.Marshal(lease)

	// req, _ := http.NewRequest(http.MethodPost, "/api/test/lease/create", bytes.NewBuffer(reqBody))
	req := httptest.NewRequest(http.MethodPut, "/api/test/lease/"+LeaseId, bytes.NewBuffer(reqBody))

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	a.Equal(http.MethodPut, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_GetAllLeases(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/all_leases", controller.GetAllLeases())

	req := httptest.NewRequest(http.MethodGet, "/api/test/all_leases", nil)

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_SearchLeases(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/search_lease", controller.SearchLease())

	req := httptest.NewRequest(http.MethodGet, "/api/test/search_lease", nil)

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_GetLeaseById(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/lease/:leaseId", controller.GetLeaseById())

	lid := LeaseId
	if lid == "" {
		lid = "621fdc14ad61251c561117bf"
	}

	fmt.Println("LeaseID", lid)
	req, _ := http.NewRequest(http.MethodGet, "/api/test/lease/"+lid, nil)

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

//test get lease
func Test_GetLease(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/lease", controller.GetLeases())
	// req, _ := http.NewRequest(http.MethodGet, "/api/test/lease", nil)
	req := httptest.NewRequest(http.MethodGet, "/api/test/lease", nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_GetLeaseBySearchTerm(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/lease", controller.GetLeases())
	// req, _ := http.NewRequest(http.MethodGet, "/api/test/lease", nil)
	req := httptest.NewRequest(http.MethodGet, "/api/test/lease?s=enclave", nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}
func Test_GetLeaseBySort(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/lease", controller.GetLeases())
	// req, _ := http.NewRequest(http.MethodGet, "/api/test/lease", nil)
	req := httptest.NewRequest(http.MethodGet, "/api/test/lease?s=title", nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_GetLeaseByRooms(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/lease", controller.GetLeases())
	// req, _ := http.NewRequest(http.MethodGet, "/api/test/lease", nil)
	req := httptest.NewRequest(http.MethodGet, "/api/test/lease?bath=1&bed=1", nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_GetLeaseByPagination(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.GET("/api/test/lease", controller.GetLeases())
	// req, _ := http.NewRequest(http.MethodGet, "/api/test/lease", nil)
	req := httptest.NewRequest(http.MethodGet, "/api/test/lease?page=2&limit=4", nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	a.Equal(http.MethodGet, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func Test_DeleteLease(t *testing.T) {
	r := gin.Default()
	a := assert.New(t)
	r.DELETE("/api/test/lease/:leaseId", controller.DeleteLease())

	lid := LeaseId
	if lid == "" {
		lid = "621fdc14ad61251c561117bf"
	}

	fmt.Println("LeaseID", lid)
	req, _ := http.NewRequest(http.MethodDelete, "/api/test/lease/"+lid, nil)

	w := httptest.NewRecorder()
	req.Header.Set("Content-Type", "application/json")

	r.ServeHTTP(w, req)

	a.Equal(http.MethodDelete, req.Method, "HTTP request method error")
	a.Equal(http.StatusOK, w.Code, "HTTP request status code error")
}

func drop_User(testUser models.User) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	_, err := testUserCollection.DeleteOne(ctx, bson.M{"email": testUser.Email})
	if err != nil {
		log.Fatal(err)
	}
}

func drop_Lease() {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	_, err := testLeaseCollection.DeleteMany(ctx, bson.M{"title": "test lease"})
	if err != nil {
		log.Fatal(err)
	}
}
