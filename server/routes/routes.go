package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
	// "github.com/wurew34/Gator-SubleasingSESPR22/middleware"
)

func UserRoute(router *gin.Engine) {
	// router.Use(middleware.Authentication())
	router.POST("/user/signup", controller.CreateUser())
	// router.POST("/users/login", controller.LoginUser())
	router.GET("/user/:userId", controller.GetUser())

}
