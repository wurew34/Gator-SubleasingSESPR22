package main

import (
	"os"
	"log"
	
	"github.com/gin-gonic/gin"
	"github.com/wurew34/Gator-SubleasingSESPR22/routes"
	"github.com/gin-contrib/cors"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	r := gin.New()
	r.Use(gin.Logger())
	corsConfig := cors.Config{
		AllowAllOrigins:  false,
		AllowCredentials: true,
		AllowOrigins:     []string{"http://localhost:3000", "https://helpful-rugelach-6829f3.netlify.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization", "accept", "token"},
	}

	//used cors.Default() before
	r.Use(cors.New(corsConfig))
	routes.AuthRoute(r)
	routes.LeaseRoute(r)
	routes.TestRoute(r)
	routes.UserRoute(r)
	r.Run(":" + port)
}

//go build -o new -v -> go run main.go
