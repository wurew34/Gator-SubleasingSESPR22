package main

import (
	"github.com/wurew34/Gator-SubleasingSESPR22/configs"
  "github.com/gin-gonic/gin"
  "github.com/wurew34/Gator-SubleasingSESPR22/routes"
)

func main() {

  r := gin.Default()

  routes.UserRoute(r)
  configs.ConnectDB()

  r.Run("localhost:8080")

}
