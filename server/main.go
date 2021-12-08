package main

import (
	"log"
	"net"

	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
	"github.com/NikhilSharma03/Kaiwa/service"
	"google.golang.org/grpc"
)

func main() {
	net, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatal("Something went wrong.", err.Error())
	}

	grpcServer := grpc.NewServer()
	chatpb.RegisterChatServiceServer(grpcServer, &service.ChatServer{})
	chatpb.RegisterUserServiceServer(grpcServer, &service.UserServer{})

	if err := grpcServer.Serve(net); err != nil {
		log.Fatal("Something went wrong.", err.Error())
	}
}
