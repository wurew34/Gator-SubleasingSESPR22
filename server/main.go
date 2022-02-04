package main

import (
	"github.com/gin-gonic/gin"
	"github.com/wurew34/Gator-SubleasingSESPR22/routes"
)

func main() {
	r := gin.New()
	r.Use(gin.Logger())
	routes.AuthRoute(r)
	routes.UserRoute(r)
	r.Run("localhost:8080")
}

//go build -o new -v -> go run main.go
