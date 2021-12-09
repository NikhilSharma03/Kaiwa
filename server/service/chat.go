package service

import (
	"context"
	"strings"
	"time"

	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
	"github.com/NikhilSharma03/Kaiwa/db"
	"github.com/NikhilSharma03/Kaiwa/helpers"
	"go.mongodb.org/mongo-driver/bson"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ChatServer struct {
	chatpb.UnimplementedChatServiceServer
}

func (*ChatServer) SendMessage(ctx context.Context, req *chatpb.ChatRequest) (*chatpb.ChatResponse, error) {
	chatDB := db.GetDB().Collection("chats")
	token := req.GetToken()
	sender := req.GetChatDetails().GetSender()
	receiver := req.GetChatDetails().GetReceiver()
	message := req.GetChatDetails().GetMessage()

	if sender.Email == "" || message == "" || receiver.Email == "" {
		return nil, status.Errorf(codes.Aborted, "Invalid Input")
	}

	data, err := helpers.ExtractTokenMetadata(token)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	if strings.Trim(data.Email, " \n") != sender.GetEmail() {
		return nil, status.Errorf(codes.Unauthenticated, "Unauthenticated")
	}

	chat := chatpb.Chat{Sender: sender, Receiver: receiver, Message: message, Time: time.Now().String()}

	_, erro := chatDB.InsertOne(context.Background(), chat)
	if erro != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	return &chatpb.ChatResponse{
		Status:      "Message Sent",
		ChatDetails: &chat,
	}, nil

}

func (*ChatServer) GetMessage(ctx context.Context, req *chatpb.User) (*chatpb.GetChatResponse, error) {
	chatDB := db.GetDB().Collection("chats")
	cur, err := chatDB.Find(context.Background(), bson.D{{}})
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	var data []*chatpb.Chat

	for cur.Next(context.TODO()) {
		//Create a value into which the single document can be decoded
		var elem chatpb.Chat
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

	return &chatpb.GetChatResponse{
		ChatDetails: data,
	}, nil
}
