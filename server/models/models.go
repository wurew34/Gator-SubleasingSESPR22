package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	First_name    *string            `json:"first_name,omitempty" validate:"required, min:2, max:100" bson:"first_name,omitempty"`
	Last_name     *string            `json:"last_name,omitempty" validate:"required, min:2, max:100" bson:"last_name,omitempty"`
	Email         *string            `json:"email,omitempty" validate:"email, required" bson:"age,omitempty"`
	Password      *string            `json:"password,omitempty" validate:"required, min:6" bson:"password,omitempty"`
	Token         *string            `json:"token,omitempty" bson:"token,omitempty"`
	Refresh_token *string            `json:"refresh_token,omitempty" bson:"refresh_token,omitempty"`
	Created_at    time.Time          `json:"created_at,omitempty" bson:"create_at,omitempty"`
	Updated_at    time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
	User_id       string            `json:"user_id,omitempty" bson:"user_id,omitempty"`
}
