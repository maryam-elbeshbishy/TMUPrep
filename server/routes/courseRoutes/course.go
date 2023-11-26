package courseRoutes

import (
	"math"
	"net/http"
	"strconv"
	"tmuprep/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client) {
	router.GET("", func(c *gin.Context) {
		l, _ := c.GetQuery("limit")
		p, _ := c.GetQuery("page")
		search, _ := c.GetQuery("search")

		limit, _ := strconv.Atoi(l)
		page, _ := strconv.Atoi(p)
		page = page - 1

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
			numberOfPages = math.Ceil((float64(count) / float64(limit)))

			if float64(page) > float64(numberOfPages) {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Pagination params outside of scope",
				})
				c.Abort()
				return
			}
		}

		var courses []models.Course

		pipeline := mongo.Pipeline{
			{{"$match", bson.D{{"courseCode", primitive.Regex{Pattern: search, Options: "i"}}}}},
			{{"$lookup", bson.D{
				{"from", "antirequisites"},
				{"localField", "courseCode"},
				{"foreignField", "courseCode"},
				{"as", "antirequisites"},
			}}},
			{{"$lookup", bson.D{
				{"from", "prerequisites"},
				{"localField", "courseCode"},
				{"foreignField", "courseCode"},
				{"as", "prerequisites"},
			}}},
			{{"$addFields", bson.D{
				{"antirequisites", bson.D{
					{"$map", bson.D{
						{"input", "$antirequisites"},
						{"as", "antirequisites"},
						{"in", "$$antirequisites.antirequisite"},
					}},
				}},
			}}},
			{{"$addFields", bson.D{
				{"prerequisites", bson.D{
					{"$map", bson.D{
						{"input", "$prerequisites"},
						{"as", "prerequisites"},
						{"in", "$$prerequisites.prerequisite"},
					}},
				}},
			}}},
			{{"$skip", int64(page) * int64(limit)}},
			{{"$limit", int64(limit)}},
		}

		cursor, err := mongoDB.Database("tmuprep").Collection("courses").Aggregate(c, pipeline)

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
