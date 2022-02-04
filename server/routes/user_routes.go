package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/wurew34/Gator-SubleasingSESPR22/controllers"
	"github.com/wurew34/Gator-SubleasingSESPR22/middleware"
)

func UserRoute(router *gin.Engine) {
	router.GET("/api/user", controller.GetUser())
	router.Use(middleware.Authentication()).GET("/api/user/:userId", controller.GetUserById())
}
