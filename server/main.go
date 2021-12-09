package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
	"github.com/NikhilSharma03/Kaiwa/db"
	"github.com/NikhilSharma03/Kaiwa/service"
	"google.golang.org/grpc"
)

func main() {
	client, err := db.ConnectDB("mongodb://localhost:27017")
	if err != nil {
		log.Fatal("Something went wrong", err.Error())
	}
	fmt.Println("Connected to Database...")

	lis, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatal("Something went wrong.", err.Error())
	}

	grpcServer := grpc.NewServer()
	chatpb.RegisterChatServiceServer(grpcServer, &service.ChatServer{})
	chatpb.RegisterUserServiceServer(grpcServer, &service.UserServer{})

	go func() {
		fmt.Println("Starting gRPC Server...")
		if err := grpcServer.Serve(lis); err != nil {
			log.Fatal("Something went wrong.", err.Error())
		}
	}()

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)
	<-ch
	fmt.Println("Stopping gRPC Server...")
	grpcServer.Stop()
	fmt.Println("Stopping Listener...")
	lis.Close()
	fmt.Println("Stopping Database...")
	client.Disconnect(context.TODO())
}
