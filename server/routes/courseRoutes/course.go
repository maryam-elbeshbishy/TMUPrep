package courseRoutes

import (
	"net/http"
	"tmuprep/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client) {
	router.GET("/", func(c *gin.Context) {
		var courses []models.Course

		cursor, err := mongoDB.Database("tmuprep").Collection("courses").Find(c, bson.D{{}})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			c.Abort()
			return
		}

		if err = cursor.All(c, &courses); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"courses": courses,
		})
	})
	router.GET("/:courseID", func(c *gin.Context) {
		courseID := c.Param("courseID")

		var course models.Course
		err := mongoDB.Database("tmuprep").Collection("courses").FindOne(c, bson.D{{"courseCode", courseID}}).Decode(&course)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				c.JSON(400, gin.H{
					"error": "Courses not found",
				})
				return
			}
			panic(err)
		}

		c.JSON(200, gin.H{
			"oid":        course.ID,
			"courseName": course.CourseCode,
		})
	})
}
