package main

import (
	"github.com/gin-gonic/gin"
	"github.com/wurew34/Gator-SubleasingSESPR22/configs"
	// "github.com/wurew34/Gator-SubleasingSESPR22/routes"
)

func main() {
	configs.ConnectDB()

	r := gin.Default()
	r.Use(gin.Logger())
	// routes.UserRoute(r)

	r.Run("localhost:8080")

}
