package main

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"time"
)

func main() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	uri := getEnv("DB_URI")
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	fmt.Println("Connected to MongoDB!")
  
	database := client.Database("quickstart")
	userCollection := database.Collection("users")

	userResult, err := userCollection.InsertOne(ctx, bson.M{"name": "John", "age": 30})
	if err != nil {
		panic(err)
	}
	userID := userResult.InsertedID.(primitive.ObjectID)
	fmt.Println("Inserted user with ID: ", userID.Hex())

}

func getEnv(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		panic(err)
	}
	return os.Getenv(key)
}
