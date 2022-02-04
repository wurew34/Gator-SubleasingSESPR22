package main

import (
	"github.com/gin-gonic/gin"
	"github.com/wurew34/Gator-SubleasingSESPR22/routes"

	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.New()
	r.Use(gin.Logger())
	corsConfig := cors.Config{
		AllowAllOrigins:  false,
		AllowCredentials: true,
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization", "accept", "token"},
	}

	//used cors.Default() before
	r.Use(cors.New(corsConfig))
	routes.AuthRoute(r)
	routes.UserRoute(r)
	r.Run("localhost:8080")
}

//go build -o new -v -> go run main.go
