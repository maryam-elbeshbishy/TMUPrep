package userRoutes

import (
	"net/http"
	"tmuprep/configs"
	"tmuprep/models"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type LoginData struct {
	ID string `json:"googleID"`
}

type EncodeData struct {
	ID string
}

type InsertUser struct {
	GoogleID string `bson:"googleID"`
}

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client) {
	router.POST("/login", func(c *gin.Context) {
		var data LoginData

		if err := c.BindJSON(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "No user ID provided",
			})
			c.Abort()
			return
		}

		var user models.User

		errFind := mongoDB.Database("tmuprep").Collection("user").FindOne(c, bson.D{{"googleID", data.ID}}).Decode(&user)

		if errFind == mongo.ErrNoDocuments {
			userToInsert := InsertUser{data.ID}
			result, errDB := mongoDB.Database("tmuprep").Collection("user").InsertOne(c, userToInsert)

			if errDB != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": errDB})
				c.Abort()
				return
			}

			JWTData := configs.EncodeData{result.InsertedID.(primitive.ObjectID).Hex()}

			jwt := configs.Encode(JWTData)

			c.JSON(http.StatusOK, gin.H{"jwt": jwt})
			c.Abort()
			return
		} else {
			JWTData := configs.EncodeData{user.ID.Hex()}

			jwt := configs.Encode(JWTData)

			c.JSON(http.StatusOK, gin.H{"jwt": jwt})
			c.Abort()
			return
		}
	})
}
