package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
)

func LeaseRoute(router *gin.Engine) {
	router.GET("/api/search_lease", controller.SearchLease())
	router.GET("/api/lease/:leaseId", controller.GetLeaseById())
	router.GET("/api/lease", controller.GetLeases())
	router.GET("/api/all_leases", controller.GetAllLeases())
<<<<<<< HEAD
	router.POST("/api/lease/uploadImg/:leaseId", controller.UploadLeaseImage())
=======
	router.GET("/api/user_leases/:user_id", controller.GetUserLeases())
>>>>>>> 4315bea8d16dfec64e11c865d688a67ffaf6f648
}
