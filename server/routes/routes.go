package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/wurew34/Gator-SubleasingSESPR22/controllers"
)

func UserRoute(router *gin.Engine) {
	router.POST("/signup", controller.CreateUser)
	router.GET("/user/:id", controller.GetUser)

}
