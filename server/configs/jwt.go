package configs

import (
	"github.com/golang-jwt/jwt"
)

type EncodeData struct {
	ID string
}

type JWTClaims struct {
	ID string
	jwt.Claims
}

type UserJWTData struct {
	jwt.StandardClaims
	ID string `json:"ID"`
}

var secretKey string = GetEnvVar("SECRET_JWT")

func Encode(data EncodeData) string {

	claims := JWTClaims{
		data.ID,
		jwt.StandardClaims{
			ExpiresAt: 15000,
			Issuer:    "TMUPREP",
		}}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	jwtToken, _ := token.SignedString([]byte(secretKey))

	return jwtToken
}

func Decode(jwtObject string) (UserJWTData, *jwt.Token, error) {

	var userData UserJWTData

	token, e := jwt.ParseWithClaims(jwtObject, &userData, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	return userData, token, e
}
