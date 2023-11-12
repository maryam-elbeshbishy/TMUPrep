package courseRoutes

import (
	"math"
	"net/http"
	"strconv"
	"tmuprep/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client) {
	router.GET("", func(c *gin.Context) {
		l, _ := c.GetQuery("limit")
		p, _ := c.GetQuery("page")

		limit, _ := strconv.Atoi(l)
		page, _ := strconv.Atoi(p)

		count, err := mongoDB.Database("tmuprep").Collection("courses").EstimatedDocumentCount(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			c.Abort()
			return
		}
		var numberOfPages float64
		if limit > 0 {
			numberOfPages = math.Ceil(float64(count) / float64(limit))

			if float64(page) > float64(numberOfPages) {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Pagination params outside of scope",
				})
				c.Abort()
				return
			}
		}

		paginationOptions := options.Find().SetLimit(int64(limit)).SetSkip(int64(page)*int64(limit))

		var courses []models.Course

		cursor, err := mongoDB.Database("tmuprep").Collection("courses").Find(c, bson.D{{}}, paginationOptions)

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
			"courses":       courses,
			"numberOfPages": numberOfPages,
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
