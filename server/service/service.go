package service

import (
	"context"

	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
)

type Server struct {
	chatpb.UnimplementedChatServer
}

func (*Server) SendMessage(ctx context.Context, req *chatpb.ChatRequest) (*chatpb.ChatRequest, error) {
	return &chatpb.ChatRequest{Message: req.GetMessage()}, nil
}
