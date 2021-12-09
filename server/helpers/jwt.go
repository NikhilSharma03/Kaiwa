package helpers

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type TokenData struct {
	Email string
	ID    string
}

func GetJWT(email string, id string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	var mySigningKey = []byte(os.Getenv("JWT_SECRET"))
	claims := token.Claims.(jwt.MapClaims)

	claims["email"] = email
	claims["id"] = id
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix()

	tokenString, err := token.SignedString(mySigningKey)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tok string) (*jwt.Token, error) {
	tokenString := tok
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func ExtractTokenMetadata(r string) (TokenData, error) {
	token, err := VerifyToken(r)
	if err != nil {
		return TokenData{}, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		email := fmt.Sprintln(claims["email"])
		id := fmt.Sprintln(claims["id"])
		return TokenData{Email: email, ID: id}, nil
	}
	return TokenData{}, err
}
