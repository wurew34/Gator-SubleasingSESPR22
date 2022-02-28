package controller

import (
	"context"
	"fmt"
	"io"
	"log"

	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/wurew34/Gator-SubleasingSESPR22/configs"
	"github.com/wurew34/Gator-SubleasingSESPR22/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	//import gridfs
	"go.mongodb.org/mongo-driver/mongo/gridfs"
)

var leaseCollection *mongo.Collection = configs.GetCollection(configs.DB, "leases")

// func UploadImages () gin.HandlerFunc{
// 	return func(c *gin.Context) {
// 		fileName := c.Param("fileName")
// 		file, _, err := c.Request.FormFile("file")

// 		bucket, err := gridfs.NewBucket(
// 			configs.DB.Database("gatorSubleasing"),
// 		)
// 		if err != nil {
// 			log.Fatal(err)
// 		}

// 		uploadStream, err := bucket.OpenUploadStream(fileName)
// 		if err != nil {
// 			log.Fatal(err)
// 		}

// 		defer uploadStream.Close()
// 		// upload the image file

// 		if _, err := io.Copy(uploadStream, file); err != nil {
// 			log.Fatal(err)
// 		}

// 		c.JSON(http.StatusOK, gin.H{"message": "file uploaded"});

// 	}

// }

// func UploadImages(filename string, data []byte) error {
// 	bucket, err := gridfs.NewBucket(
// 		configs.DB.Database("gatorSubleasing"),
// 	)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	uploadStream, err := bucket.OpenUploadStream(filename)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	defer uploadStream.Close()

// 	// Write some content to the file.
// 	fileSize, err := uploadStream.Write(data)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Printf("Wrote %d bytes to %s\n", fileSize, filename)

// 	return nil

// }

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
		// upload images to gridfs
		// lease.Images = []string{"test.jpg"}
		fileName := c.Param("fileName")
		file, _, err := c.Request.FormFile("file")

		bucket, err := gridfs.NewBucket(
			configs.DB.Database("gatorSubleasing"),
		)
		if err != nil {
			log.Fatal(err)
		}

		uploadStream, err := bucket.OpenUploadStream(fileName)
		if err != nil {
			log.Fatal(err)
		}

		defer uploadStream.Close()
		// upload the image file

		if _, err := io.Copy(uploadStream, file); err != nil {
			log.Fatal(err)
		}

		lease.Images = []string{fileName}
		// lease.Images = append(lease.Images, fileName)
		lease.Images = append(lease.Images, fileName)



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

// func GetLeaseByPage () gin.HandlerFunc{
// 	return func(c *gin.Context) {
// 		//create pagination
// 		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
// 		defer cancel()
// 		var leases []bson.M
// 		var total int64
// 		var page int64
// 		var limit int64

// 		if page, err := strconv.ParseInt(c.Query("page"), 10, 64); err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 			return
// 		} else {
// 			page = page - 1
// 		}

// 		if limit, err := strconv.ParseInt(c.Query("limit"), 10, 64); err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 			return
// 		} else {
// 			limit = limit
// 		}

// 		if err := leaseCollection.Find(ctx, bson.M{}).Count(ctx, &total); err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 			return
// 		}

// 		if err := leaseCollection.Find(ctx, bson.M{}).Skip(int64(page * limit)).Limit(limit).All(ctx, &leases); err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 			return
// 		}

// 		c.JSON(http.StatusOK, gin.H{"total": total, "leases": leases})

// 	}
// }
