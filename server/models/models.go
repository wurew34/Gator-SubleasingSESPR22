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
