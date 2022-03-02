package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
	"github.com/wurew34/Gator-SubleasingSESPR22/middleware"
)

func LeaseRoute(router *gin.Engine) {
	router.Use(middleware.Authentication())
	router.POST("/api/lease/create", controller.CreateLease())
	router.PUT("/api/lease/:leaseId", controller.UpdateLease())
	router.DELETE("/api/lease/:leaseId", controller.DeleteLease())
	router.GET("/api/lease/:leaseId", controller.GetLeaseById())
	router.GET("/api/lease", controller.GetLeases())
	router.GET("/api/all_leases", controller.GetAllLeases())
}
