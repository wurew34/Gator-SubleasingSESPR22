package main

import (
	// "github.com/gin-gonic/gin"
	// "github.com/wurew34/Gator-SubleasingSESPR22/configs"
	"github.com/wurew34/Gator-SubleasingSESPR22/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/wurew34/Gator-SubleasingSESPR22/routes"
	// cors "github.com/rs/cors/wrapper/gin"
)

func main() {
	r := gin.New()
	r.Use(gin.Logger())
	routes.UserRoute(r)

	// use default without auth to make it work
	// also works with auth and default
	r.Use(middleware.Authentication())

	r.Use(cors.Default()) 
	// r.Use(middleware.CORSMiddleware())

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
