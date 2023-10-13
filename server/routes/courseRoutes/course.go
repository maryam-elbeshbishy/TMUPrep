package courseRoutes

import (
	models "tmuprep/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client )  {
	router.GET("", func (c *gin.Context)  {
		// courseID := c.Param("courseID")
		// cursor, err := mongoDB.Database("tmuprep").Collection("course").Find(c, bson.D{{"courseCode", courseID}})
		// if err != nil {
		// 	panic(err)
		// }
		// var results []models.Course
		// if err = cursor.All(c, &results); err != nil {
		// 	panic(err)
		// }
		// for _, result := range results {
		// 	res, _ := json.Marshal(result)
			
		// 	fmt.Println(string(res))
		// }

		// c.JSON(200, gin.H{
		// 	oid: result.
		// 	"message": "course",
		// })
		c.JSON(200, gin.H{
			"message": "all courses",
		})
	})
	router.GET("/:courseID", func (c *gin.Context)  {
		courseID := c.Param("courseID")

		var course models.Course
		err := mongoDB.Database("tmuprep").Collection("course").FindOne(c, bson.D{{"courseCode", courseID}}).Decode(&course)
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
			"oid": course.ID,
			"courssName": course.CourseCode,
		})
	})
}