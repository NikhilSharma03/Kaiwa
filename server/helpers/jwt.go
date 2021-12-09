package helpers

import (
	"time"

	"github.com/golang-jwt/jwt"
)

func GetJWT(email string, id string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	var mySigningKey = []byte("unicorns")
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
