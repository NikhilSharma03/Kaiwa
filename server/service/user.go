package service

import (
	"github.com/NikhilSharma03/Kaiwa/chatpb/chatpb"
)

type UserServer struct {
	chatpb.UnimplementedUserServiceServer
}
