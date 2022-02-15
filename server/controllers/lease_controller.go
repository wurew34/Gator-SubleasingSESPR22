package controller

import (
	"context"
	"fmt"
	"log"

	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/wurew34/Gator-SubleasingSESPR22/configs"
	"github.com/wurew34/Gator-SubleasingSESPR22/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var leaseCollection *mongo.Collection = configs.GetCollection(configs.DB, "leases")

func CreateLease() gin.HandlerFunc {
	return func(c *gin.Context) {

		//allow all origins
		// c.Header("Content-Type", "application/json")
		// c.Header("Access-Control-Allow-Origin", "*")
		// c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		// c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var lease models.Lease

		if err := c.BindJSON(&lease); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := validate.Struct(lease); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		lease.ID = primitive.NewObjectID()
		userId, exists := c.Get("uid")
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "user id not found"})
			return
		}
		lease.Lease_id = lease.ID.Hex()
		lease.User_id = userId.(string)
		lease.Created_at = time.Now()
		lease.Updated_at = time.Now()

		if _, err := leaseCollection.InsertOne(ctx, lease); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, lease)
	}
}

func UpdateLease() gin.HandlerFunc {
	return func(c *gin.Context) {
		//update lease
		//allow all origins
		// c.Header("Content-Type", "application/json")
		// c.Header("Access-Control-Allow-Origin", "*")
		// c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		// c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		givenLeaseId := c.Param("leaseId")

		var lease models.Lease

		if err := c.BindJSON(&lease); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := validate.Struct(lease); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		userId, exists := c.Get("uid")
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "user id not found"})
			return
		}
		if lease.User_id != userId.(string) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "user id not match"})
			return
		}
		if lease.Lease_id != givenLeaseId {
			c.JSON(http.StatusBadRequest, gin.H{"error": "lease id not match"})
			return
		}

		// lease.ID = lease.Lease_id.(primitive.ObjectID)
		lease.User_id = userId.(string)
		lease.Updated_at = time.Now()

		if _, err := leaseCollection.UpdateOne(ctx, bson.M{"lease_id": lease.Lease_id}, bson.M{"$set": lease}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, lease)

	}
}

func DeleteLease() gin.HandlerFunc {
	return func(c *gin.Context) {
		//delete lease
		leaseId := c.Param("leaseId")
		// convert param to ObjectId
		// leaseId, err := primitive.ObjectIDFromHex(param)
		// leaseId := primitive.ObjectID(param)
		// if err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		// 	return
		// }

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		// var lease models.Lease

		// if err := c.BindJSON(&lease); err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		// 	return
		// }

		// if err := validate.Struct(lease); err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		// 	return
		// }

		// userId, exists := c.Get("uid")
		// if !exists {
		// 	c.JSON(http.StatusBadRequest, gin.H{"error": "user id not found"})
		// 	return
		// }
		// lease.User_id = userId.(string)
		// lease.Updated_at = time.Now()

		if _, err := leaseCollection.DeleteOne(ctx, bson.M{"lease_id": leaseId}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "lease deleted"})
	}
}

func GetLeases() gin.HandlerFunc {
	return func(c *gin.Context) {
		//get all leases
		//allow all origins
		// c.Header("Content-Type", "application/json")
		// c.Header("Access-Control-Allow-Origin", "*")
		// c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		// c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var leases []bson.M

		cursor, err := leaseCollection.Find(ctx, bson.M{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if err := cursor.All(ctx, &leases); err != nil {
			log.Fatal(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		fmt.Println(leases)

		// if err := leaseCollection.Find(ctx, bson.M{}).All(ctx, &leases); err != nil {
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }z

		c.JSON(http.StatusOK, leases)
	}
}

func GetLeaseById() gin.HandlerFunc {
	return func(c *gin.Context) {

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var lease models.Lease

		param := c.Param("leaseId")
		// convert param to ObjectId
		leaseId, err := primitive.ObjectIDFromHex(param)
		// leaseId := primitive.ObjectID(param)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := leaseCollection.FindOne(ctx, bson.M{"_id": leaseId}).Decode(&lease); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, lease)
	}
}
