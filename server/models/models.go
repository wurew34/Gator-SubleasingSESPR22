package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	First_name    *string            `json:"first_name,omitempty" validate:"required,min=2,max=100"`
	Last_name     *string            `json:"last_name,omitempty" validate:"required,min=2,max=100"`
	Email         *string            `json:"email,omitempty" validate:"email,required"`
	Password      *string            `json:"password,omitempty" validate:"required,min=6"`
	Token         *string            `json:"token,omitempty"`
	Refresh_token *string            `json:"refresh_token,omitempty"`
	Created_at    time.Time          `json:"created_at,omitempty"`
	Updated_at    time.Time          `json:"updated_at,omitempty"`
	User_id       string             `json:"user_id,omitempty"`
}

type Location struct {
	Type        string    `json:"type" bson:"type"`
	Coordinates []float64 `json:"coordinates" bson:"coordinates"`
}

//image data structure
// type Image struct {
// 	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	User_id   string             `json:"user_id,omitempty" bson:"user_id,omitempty"`
// 	Image_url string             `json:"image_url,omitempty" bson:"image_url,omitempty"`
// 	Location  Location           `json:"location,omitempty" bson:"location,omitempty"`
// 	Created_at time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
// 	Updated_at time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
// }

type Image struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Author      string             `json:"author,omitempty" bson:"author,omitempty"`
	Caption     string             `json:"caption,omitempty" bson:"caption,omitempty"`
	ContentType string             `json:"contentType,omitempty" bson:"contentType,omitempty"`
	DateTime    string             `json:"dateTime,omitempty" bson:"dateTime,omitempty"`
	FileID      primitive.ObjectID `json:"fileID,omitempty" bson:"fileID,omitempty"`
	FileSize    int64              `json:"fileSize,omitempty" bson:"fileSize,omitempty"`
	Height      int                `json:"height,omitempty" bson:"height,omitempty"`
	Name        string             `json:"name,omitempty" bson:"name,omitempty"`
	Width       int                `json:"width,omitempty" bson:"width,omitempty"`
}

//message data structure
// type Message struct {
// 	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	User_id    string             `json:"user_id,omitempty" bson:"user_id,omitempty"`
// 	Message    string             `json:"message,omitempty" bson:"message,omitempty"`
// 	Created_at time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
// 	Updated_at time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
// }

//create a struct for Lease
type Lease struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User_id     string             `json:"user_id,omitempty"`
	Lease_id    string             `json:"lease_id,omitempty"`
	Title       string             `json:"title,omitempty" validate:"required"`
	Description string             `json:"description,omitempty" validate:"required"`
	Price       float64            `json:"price,omitempty" validate:"required"`
	Term        int                `json:"term,omitempty" validate:"required"`
	Bedrooms    int                `json:"bedrooms,omitempty" validate:"required"`
	Bathrooms   int                `json:"bathrooms,omitempty" validate:"required"`
	Address     string             `json:"address,omitempty" validate:"required"`
	Location    Location           `json:"location,omitempty"`
	Created_at  time.Time          `json:"created_at,omitempty"`
	Updated_at  time.Time          `json:"updated_at,omitempty"`
	Images      Image              `json:"images,omitempty"`
}
