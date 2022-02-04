package main

import (
	"github.com/gin-gonic/gin"
	"github.com/wurew34/Gator-SubleasingSESPR22/routes"

	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(cors.Default())
	routes.AuthRoute(r)
	routes.UserRoute(r)
	r.Run("localhost:8080")
}

//go build -o new -v -> go run main.go
