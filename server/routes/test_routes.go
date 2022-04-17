package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
)

func TestRoute(router *gin.Engine) {
	router.POST("/api/test/users/signup", controller.CreateUser())
	router.POST("/api/test/users/login", controller.LoginUser())
	router.GET("/api/test/user", controller.GetUser())
	router.POST("/api/test/lease/create", controller.CreateLease())
	router.PUT("/api/test/lease/:leaseId", controller.UpdateLease())
	router.DELETE("/api/test/lease/:leaseId", controller.DeleteLease())
	router.GET("/api/test/search_lease", controller.SearchLease())
	router.GET("/api/test/lease/:leaseId", controller.GetLeaseById())
	router.GET("/api/test/lease", controller.GetLeases())
	router.GET("/api/test/all_leases", controller.GetAllLeases())
}
