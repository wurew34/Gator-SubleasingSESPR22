package main

import (
	"github.com/gin-gonic/gin"
	// "github.com/wurew34/Gator-SubleasingSESPR22/configs"
	"github.com/wurew34/Gator-SubleasingSESPR22/middleware"

	"github.com/wurew34/Gator-SubleasingSESPR22/routes"
)

func main() {
	// configs.ConnectDB()

	r := gin.Default()
	r.Use(gin.Logger())
	routes.UserRoute(r)

	r.Use(middleware.Authentication())
	// API-2
	r.GET("/api-1", func(c *gin.Context) {

		c.JSON(200, gin.H{"success": "Access granted for api-1"})

	})

	// API-1
	r.GET("/api-2", func(c *gin.Context) {
		c.JSON(200, gin.H{"success": "Access granted for api-2"})
	})

	r.Run("localhost:8080")

}


//go build -o new -v -> go run main.go
