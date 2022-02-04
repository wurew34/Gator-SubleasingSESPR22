package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
)

func AuthRoute(router *gin.Engine) {
	router.POST("/api/users/signup", controller.CreateUser())
	router.POST("/api/users/login", controller.LoginUser())
}
