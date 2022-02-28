package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
	"github.com/wurew34/Gator-SubleasingSESPR22/middleware"

)

func LeaseRoute (router *gin.Engine) {
	router.GET("/api/lease", controller.GetLeases())
	router.POST("/api/lease/create", middleware.Authentication(), controller.CreateLease())
	router.PUT("/api/lease/:leaseId", middleware.Authentication(),controller.UpdateLease())
	router.DELETE("/api/lease/:leaseId", middleware.Authentication(),controller.DeleteLease())
	router.GET("/api/lease/:leaseId", controller.GetLeaseById())
	// router.POST("/api/lease/:leaseId/upload", middleware.Authentication(), controller.UploadImages())
}
