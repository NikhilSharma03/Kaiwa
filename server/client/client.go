package main

import (
	"context"
	"fmt"

	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial(":9090", grpc.WithInsecure())

	userclient := chatpb.NewUserServiceClient(conn)

	res, err := userclient.UserLogin(context.Background(), &chatpb.UserRequest{UserDetails: &chatpb.User{Email: "test@test.com", Password: "test@test.com"}})

	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(res)
}
