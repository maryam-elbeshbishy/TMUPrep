package scheduleRoutes

import (
	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/mongo"
)

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client )  {
	router.GET("", func (c *gin.Context)  {
		c.JSON(200, gin.H{
			"message": "course",
		})
	})
}