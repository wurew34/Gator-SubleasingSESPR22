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
	helper "github.com/wurew34/Gator-SubleasingSESPR22/helpers"
	"github.com/wurew34/Gator-SubleasingSESPR22/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var leaseCollection *mongo.Collection = configs.GetCollection(configs.DB, "leases")

func CreateLease() gin.HandlerFunc {
	return func(c *gin.Context) {

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var lease models.Lease
		fmt.Print("Hi this is create lease")
		fmt.Print(c.Request.Body)
		if err := c.BindJSON(&lease); err != nil {
			log.Fatal("Error binding the json: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		validationErr := validate.Struct(lease)
		if validationErr != nil {
			log.Panic("Validation Error: ", validationErr)
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
			return
		}
		lease.ID = primitive.NewObjectID()
		userId, exists := c.Get("uid")
		if !exists {
			if lease.User_id != "" {
				userId = lease.User_id

			} else {
				log.Fatal("user id not found")
				c.JSON(http.StatusBadRequest, gin.H{"error": "user id not found"})
				return

			}
		}
		lat, lng, err := helper.GetLocation(lease.Address)
		if err != nil {
			log.Fatal("Error getting the location: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		lease.Location.Coordinates = []float64{lng, lat}
		lease.Location.Type = "Point"
		lease.Lease_id = lease.ID.Hex()
		lease.User_id = userId.(string)
		lease.Created_at = time.Now()
		lease.Updated_at = time.Now()


		if _, err := leaseCollection.InsertOne(ctx, lease); err != nil {
			log.Fatal("Error inserting the lease: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, lease)
	}
}

func UpdateLease() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Print("Hi this is update lease")
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		givenLeaseId := c.Param("leaseId")

		var lease models.Lease

		if err := c.BindJSON(&lease); err != nil {
			log.Fatal("Error binding the json: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := validate.Struct(lease); err != nil {
			log.Panic("Validation Error: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		lat, lng, err := helper.GetLocation(lease.Address)
		if err != nil {
			log.Fatal("Error getting the location: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		lease.Location.Coordinates = []float64{lng, lat}
		lease.Location.Type = "Point"
		// lease.Lease_id = givenLeaseId
		fmt.Print("lease id: ", givenLeaseId)
		userId, exists := c.Get("uid")
		if !exists {
			if userId != "" {
				userId = lease.User_id

			} else {

				log.Fatal("user id not found")
				c.JSON(http.StatusBadRequest, gin.H{"error": "user id not found"})
				return

			}
		}
		if lease.User_id != userId.(string) {
			log.Fatal("user id not matched")
			c.JSON(http.StatusBadRequest, gin.H{"error": "user id not match"})
			return
		}
		if lease.Lease_id != givenLeaseId {
			log.Fatal("lease id not matched")
			c.JSON(http.StatusBadRequest, gin.H{"error": "lease id not match"})
			return
		}

		lease.User_id = userId.(string)
		lease.Updated_at = time.Now()
		fmt.Print("user id: ", userId)

		if _, err := leaseCollection.UpdateOne(ctx, bson.M{"lease_id": lease.Lease_id}, bson.M{"$set": lease}); err != nil {
			log.Fatal("Error updating the lease: ", err)
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
			log.Fatal("Error deleting the lease: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "lease deleted"})
	}
}
func SearchLease() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var leases []bson.M

		//get all the titles of the leases
		var lease_title []string

		cursor, err := leaseCollection.Find(ctx, bson.M{})
		if err != nil {
			log.Fatal("Error getting the leases: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if err := cursor.All(ctx, &leases); err != nil {
			log.Fatal(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		for _, l := range leases {
			lease_title = append(lease_title, l["title"].(string))
		}
		c.JSON(http.StatusOK, lease_title)
	}
}

func GetAllLeases() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var leases []bson.M

		cursor, err := leaseCollection.Find(ctx, bson.M{})
		if err != nil {
			log.Fatal("Error getting the leases: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if err := cursor.All(ctx, &leases); err != nil {
			log.Fatal(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
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
			log.Fatal("Error getting the lease id: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := leaseCollection.FindOne(ctx, bson.M{"_id": leaseId}).Decode(&lease); err != nil {
			log.Fatal("Error getting the lease: ", err)
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
				log.Fatal("Error getting the bath: ", err)
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
				log.Fatal("Error getting the bed: ", err)
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

		// fmt.Printf("filter: %v\n", filter)
		// fmt.Println("Searching for leases...")

		//filter lease by location
		if lat := c.Query("lat"); lat != "" {
			latFloat, err := strconv.ParseFloat(lat, 64)
			if err != nil {
				log.Fatal("Error getting the lat: ", err)
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			if lng := c.Query("lng"); lng != "" {
				lngFloat, err := strconv.ParseFloat(lng, 64)
				if err != nil {
					log.Fatal("Error getting the lng: ", err)
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}

				filter = bson.M{
					"$and": []bson.M{
						filter,
						{
							"location": bson.M{
								"$near": bson.M{
									"$geometry": bson.M{
										"type":        "Point",
										"coordinates": []float64{lngFloat, latFloat},
									},
									"$maxDistance": 5000,
								},
							},
						},
					},
				}
			}
		}

		if sort := c.Query("sort"); sort != "" {

			// {"Price: highg" : "price_desc"}
			if sort == "title" {
				findOptions.SetSort(bson.D{{Key: "title", Value: 1}})
			} else if sort == "price_asc" {
				findOptions.SetSort(bson.D{{Key: "price", Value: 1}})
			} else if sort == "created_at" {
				findOptions.SetSort(bson.D{{Key: "created_at", Value: 1}})
			} else if sort == "price_desc" {
				findOptions.SetSort(bson.D{{Key: "price", Value: -1}})
			} else if sort == "term_asc" {
				findOptions.SetSort(bson.D{{Key: "term", Value: 1}})
			} else if sort == "term_desc" {
				findOptions.SetSort(bson.D{{Key: "term", Value: -1}})
			} else {
				log.Fatal("Error getting the sort: ", sort)
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
			log.Fatal("Error getting the total: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		findOptions.SetSkip(int64((page - 1) * limit))

		findOptions.SetLimit(int64(limit))

		cursor, err := leaseCollection.Find(ctx, filter, findOptions)
		defer cursor.Close(ctx)

		if err != nil {
			log.Fatal("Error getting the leases: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		for cursor.Next(ctx) {
			var lease models.Lease
			if err := cursor.Decode(&lease); err != nil {
				log.Fatal("Error decoding the lease: ", err)
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

<<<<<<< HEAD
func UploadLeaseImage() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		file, err := c.FormFile("image")
		if err != nil {
			log.Fatal("Error getting the file: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// defer file.Close()
		fileBytes, err := file.Open()
		if err != nil {
			log.Fatal("Error reading the file: ", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		leaseId := c.Param("leaseId")
		fmt.Print("lease id: ", leaseId)

		if _, err := leaseCollection.UpdateOne(ctx, bson.M{"lease_id": leaseId}, bson.M{"$set": bson.M{"image": fileBytes}}); err != nil {

			log.Fatal("Error updating the lease: ", err)
=======
func GetUserLeases() gin.HandlerFunc {
	return func(c *gin.Context) {
		var leases []models.Lease
		var filter bson.M

		userID := c.Param("user_id")
		
		if userID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
			return
		}
		//print user id
		filter = bson.M{
			"user_id": userID,
		}

		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

		cursor, err := leaseCollection.Find(ctx, filter)
		defer cursor.Close(ctx)

		if err != nil {
			log.Fatal("Error getting the leases: ", err)
>>>>>>> 4315bea8d16dfec64e11c865d688a67ffaf6f648
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

<<<<<<< HEAD
		c.JSON(http.StatusOK, gin.H{"message": "lease image uploaded"})

	}

=======
		for cursor.Next(ctx) {
			var lease models.Lease
			if err := cursor.Decode(&lease); err != nil {
				log.Fatal("Error decoding the lease: ", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			leases = append(leases, lease)
		}

		c.JSON(http.StatusOK, leases)

	}
>>>>>>> 4315bea8d16dfec64e11c865d688a67ffaf6f648
}
