package middleware

import (
	"net/http"
	"tmuprep/configs"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ResultData struct{
	ID primitive.ObjectID `bson:"_id"`
}

func UserAuthetication(mongoDB *mongo.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		jwtObject := c.Request.Header.Get("Authorization")

		user, token, e := configs.Decode(jwtObject)

		if !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Not a valid user",
			})
			c.Abort()
			return
		}

		if e != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": e.Error(),
			})
			c.Abort()
			return
		}

		var result ResultData

		objectID, _ := primitive.ObjectIDFromHex(user.ID)

		err := mongoDB.Database("tmuprep").Collection("user").FindOne(c, bson.M{"_id": objectID}).Decode(&result)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			c.Abort()
			return
		}

		c.Set("userID", result.ID)

		c.Next()
	}
}
