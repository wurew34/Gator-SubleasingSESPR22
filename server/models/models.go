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

//create a struct for Lease
type Lease struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User_id     string             `json:"user_id,omitempty"`
	Lease_id string                `json:"lease_id,omitempty"`
	Bedrooms    int                `json:"bedrooms,omitempty" validate:"required"`
	Bathrooms   int                `json:"bathrooms,omitempty" validate:"required"`
	// Location    Location           `json:"location,omitempty" validate:"required"`
	Description string             `json:"description,omitempty" validate:"required"`
	Price       float64            `json:"price,omitempty" validate:"required"`
	// Images      []string           `json:"images,omitempty" validate:"required"`
	Term        int                `json:"term,omitempty" validate:"required"`
	// Start_date  time.Time          `json:"start_date,omitempty" validate:"required"`
	// End_date    time.Time          `json:"end_date,omitempty" validate:"required"`
	Created_at  time.Time          `json:"created_at,omitempty"`
	Updated_at  time.Time          `json:"updated_at,omitempty"`
}
