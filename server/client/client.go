package main

import (
	"context"
	"fmt"

	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
	"google.golang.org/grpc"
)

func main() {
	conn, _ := grpc.Dial(":9090", grpc.WithInsecure())

	// userclient := chatpb.NewUserServiceClient(conn)

	// res, err := userclient.UserLogin(context.Background(), &chatpb.UserRequest{UserDetails: &chatpb.User{Email: "test@test.com", Password: "test@test.com"}})
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }
	// fmt.Println(res)

	chat := chatpb.NewChatServiceClient(conn)

	// res, err := chat.SendMessage(context.Background(), &chatpb.ChatRequest{ChatDetails: &chatpb.Chat{Sender: &chatpb.User{Email: "test@test.com"}, Receiver: &chatpb.User{Email: "test2@test.com"}, Message: "TEST TEST 5"}, Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE2MzkwNDgzMTAsImlkIjoiNjFiMWMzMTU3ZTVkYjgwNmI1MThmODQwIn0.9WDPPaLarMWgGX-tbffvrsmDjTNi-gO2-uNvOso_5HE"})
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }
	// fmt.Println(res)

	res, err := chat.GetMessage(context.Background(), &chatpb.User{Email: "test@test.com"})
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(res)

}
