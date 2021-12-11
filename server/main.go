package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"github.com/NikhilSharma03/Kaiwa/db"
	"github.com/NikhilSharma03/Kaiwa/kaiwapb"
	"github.com/NikhilSharma03/Kaiwa/service"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	client, err := db.ConnectDB(os.Getenv("MONGO_DB_URL"))
	if err != nil {
		log.Fatal("Something went wrong", err.Error())
	}
	fmt.Println("Connected to Database...")

	lis, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatal("Something went wrong.", err.Error())
	}

	grpcServer := grpc.NewServer()
	kaiwapb.RegisterChatServiceServer(grpcServer, &service.ChatServer{})
	kaiwapb.RegisterUserServiceServer(grpcServer, &service.UserServer{})

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
