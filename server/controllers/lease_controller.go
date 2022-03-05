package controller

import (
	"context"
	"fmt"

	// "io"
	"log"
	"math"
	"strconv"

	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/wurew34/Gator-SubleasingSESPR22/configs"
	"github.com/wurew34/Gator-SubleasingSESPR22/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	//import gridfs
	// "go.mongodb.org/mongo-driver/mongo/gridfs"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var leaseCollection *mongo.Collection = configs.GetCollection(configs.DB, "leases")

func CreateLease() gin.HandlerFunc {
	return func(c *gin.Context) {

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
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		if _, err := leaseCollection.DeleteOne(ctx, bson.M{"lease_id": leaseId}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "lease deleted"})
	}
}

func GetAllLeases() gin.HandlerFunc {
	return func(c *gin.Context) {
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
		c.JSON(http.StatusOK, leases)
	}
}

func GetLeaseById() gin.HandlerFunc {
	return func(c *gin.Context) {

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var lease models.Lease

		param := c.Param("leaseId")
		leaseId, err := primitive.ObjectIDFromHex(param)

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

func GetLeases() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var leases []models.Lease

		filter := bson.M{}

		findOptions := options.Find()

		if s := c.Query("s"); s != "" {
			fmt.Print(s)
			filter = bson.M{
				"$or": []bson.M{
					{
						"title": bson.M{
							"$regex": primitive.Regex{Pattern: s, Options: "i"},
						},
					},
					{
						"description": bson.M{
							"$regex": primitive.Regex{Pattern: s, Options: "i"},
						},
					},
				},
			}

		}
		//search by bathroom and bedroom
		if bath := c.Query("bath"); bath != "" {
			bathInt, err := strconv.Atoi(bath)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			filter = bson.M{
				"$and": []bson.M{
					filter,
					{
						"bathrooms": bson.M{
							//greater than or equal to
							"$gte": bathInt,
						},
					},
				},
			}
		}

		if bed := c.Query("bed"); bed != "" {
			//convert to int
			bedInt, err := strconv.Atoi(bed)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			filter = bson.M{
				"$and": []bson.M{
					filter,
					{
						"bedrooms": bson.M{
							// type of bed is int
							"$gte": bedInt,
						},
					},
				},
			}
		}

		fmt.Printf("filter: %v\n", filter)
		fmt.Println("Searching for leases...")

		if sort := c.Query("sort"); sort != "" {
			if sort == "title" {
				findOptions.SetSort(bson.D{{"title", 1}})
			} else if sort == "price_asc" {
				findOptions.SetSort(bson.D{{"price", 1}})
			} else if sort == "created_at" {
				findOptions.SetSort(bson.D{{"created_at", 1}})
			} else if sort == "price_desc" {
				findOptions.SetSort(bson.D{{"price", -1}})
			} else if sort == "term_asc" {
				findOptions.SetSort(bson.D{{"term", 1}})
			} else if sort == "term_desc" {
				findOptions.SetSort(bson.D{{"term", -1}})
			} else {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid sort"})
				return
			}
			
		}

		page, err := strconv.Atoi(c.Query("page"))
		if err != nil {
			page = 1
		}

		limit, err := strconv.Atoi(c.Query("limit"))
		if err != nil {
			limit = 10
		}

		total, err := leaseCollection.CountDocuments(ctx, filter)
		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		findOptions.SetSkip(int64((page - 1) * limit))

		findOptions.SetLimit(int64(limit))

		cursor, err := leaseCollection.Find(ctx, filter, findOptions)
		defer cursor.Close(ctx)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		for cursor.Next(ctx) {
			var lease models.Lease
			if err := cursor.Decode(&lease); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			leases = append(leases, lease)
		}

		c.JSON(http.StatusOK, gin.H{
			"total":     total,
			"last_page": int(math.Ceil(float64(total) / float64(limit))),
			"page":      page,
			"limit":     limit,
			"leases":    leases,
		})

	}

}
