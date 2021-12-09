package model

import (
	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `bson:"_id"`
	Name     string             `bson:"name"`
	Email    string             `bson:"email"`
	Password string             `bson:"password"`
	Chats    []*chatpb.Chat     `bson:"chats"`
}
