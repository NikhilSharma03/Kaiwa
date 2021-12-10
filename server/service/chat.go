package service

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/NikhilSharma03/Kaiwa/db"
	"github.com/NikhilSharma03/Kaiwa/helpers"
	"github.com/NikhilSharma03/Kaiwa/kaiwapb"
	"go.mongodb.org/mongo-driver/bson"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ChatServer struct {
	kaiwapb.UnimplementedChatServiceServer
}

func (*ChatServer) SendMessage(ctx context.Context, req *kaiwapb.ChatRequest) (*kaiwapb.ChatResponse, error) {
	chatDB := db.GetDB().Collection("chats")
	userDB := db.GetDB().Collection("users")
	token := req.GetToken()
	sender := req.GetSender()
	receiver := req.GetReceiver()
	message := req.GetMessage()
	time := time.Now().String()

	if sender == "" || message == "" || receiver == "" {
		return nil, status.Errorf(codes.Aborted, "Invalid Input")
	}

	data, err := helpers.ExtractTokenMetadata(token)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	fmt.Println(strings.Trim(data.Email, " \n"), sender)

	if strings.Trim(data.Email, " \n") != sender {
		return nil, status.Errorf(codes.Unauthenticated, "Unauthenticated")
	}

	isReceiverExists, err := userDB.CountDocuments(context.Background(), bson.D{{"email", receiver}})
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}
	if isReceiverExists <= 0 {
		return nil, status.Errorf(codes.NotFound, "No user found with receiver email")
	}

	chat := kaiwapb.Chat{Sender: sender, Receiver: receiver, Message: message, Time: time}

	_, erro := chatDB.InsertOne(context.Background(), chat)
	if erro != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	return &kaiwapb.ChatResponse{
		Sender:   sender,
		Receiver: receiver,
		Message:  message,
		Time:     time,
	}, nil

}

func (*ChatServer) GetMessage(ctx context.Context, req *kaiwapb.GetMessageRequest) (*kaiwapb.GetChatResponse, error) {
	chatDB := db.GetDB().Collection("chats")
	var data []*kaiwapb.Chat

	cur, err := chatDB.Find(context.Background(), bson.D{{"receiver", req.GetEmail()}})
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	for cur.Next(context.TODO()) {
		//Create a value into which the single document can be decoded
		var elem kaiwapb.Chat
		err := cur.Decode(&elem)
		if err != nil {
			return nil, status.Errorf(codes.Internal, err.Error())
		}

		data = append(data, &elem)

	}

	if err := cur.Err(); err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	//Close the cursor once finished
	cur.Close(context.TODO())

	scur, err := chatDB.Find(context.Background(), bson.D{{"sender", req.GetEmail()}})
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	for scur.Next(context.TODO()) {
		//Create a value into which the single document can be decoded
		var elem kaiwapb.Chat
		err := scur.Decode(&elem)
		if err != nil {
			return nil, status.Errorf(codes.Internal, err.Error())
		}

		data = append(data, &elem)

	}

	if err := scur.Err(); err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	//Close the cursor once finished
	scur.Close(context.TODO())

	return &kaiwapb.GetChatResponse{
		ChatDetails: data,
	}, nil
}
