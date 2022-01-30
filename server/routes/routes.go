package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
	// "github.com/wurew34/Gator-SubleasingSESPR22/middleware"
)

func UserRoute(router *gin.Engine) {
	// router.Use(middleware.Authentication())
	router.POST("/users/signup", controller.CreateUser())
	// router.GET("/users/:id", controller.GetUser)

}
