package service

import (
	"context"

	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
	"github.com/NikhilSharma03/Kaiwa/db"
	"github.com/NikhilSharma03/Kaiwa/helpers"
	"github.com/NikhilSharma03/Kaiwa/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserServer struct {
	chatpb.UnimplementedUserServiceServer
}

func (*UserServer) UserSignUp(ctx context.Context, req *chatpb.UserRequest) (*chatpb.UserResponse, error) {
	userDB := db.GetDB().Collection("users")
	name := req.GetUserDetails().GetName()
	email := req.GetUserDetails().GetEmail()
	password := req.GetUserDetails().GetPassword()

	if name == "" || email == "" || password == "" {
		return nil, status.Errorf(codes.Aborted, "Invalid Inputs")
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	user := model.User{
		ID:       primitive.NewObjectID(),
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}

	_, err := userDB.InsertOne(context.Background(), user)

	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	token, err := helpers.GetJWT(user.Email, user.ID.Hex())
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	return &chatpb.UserResponse{
		UserDetails: &chatpb.User{Name: user.Name, Email: user.Email, Id: user.ID.Hex()},
		Status:      "Created User.",
		Token:       token,
	}, nil
}

func (*UserServer) UserLogin(ctx context.Context, req *chatpb.UserRequest) (*chatpb.UserResponse, error) {
	userDB := db.GetDB().Collection("users")
	email := req.GetUserDetails().GetEmail()
	password := req.GetUserDetails().GetPassword()

	if email == "" || password == "" {
		return nil, status.Errorf(codes.Aborted, "Invalid Inputs")
	}

	var user model.User
	if err := userDB.FindOne(context.Background(), bson.D{{"email", email}}).Decode(&user); err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "Invalid Password")
	}

	token, err := helpers.GetJWT(user.Email, user.ID.Hex())
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	return &chatpb.UserResponse{
		UserDetails: &chatpb.User{Name: user.Name, Email: user.Email, Id: user.ID.Hex()},
		Status:      "User Login Successful.",
		Token:       token,
	}, nil
}
