package scheduleRoutes

import (
	"log"
	"net/http"
	"tmuprep/models"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client )  {
	router.GET("", func (c *gin.Context)  {
		c.JSON(200, gin.H{
			"message": "course",
		})
	})

	router.GET("/:getSchedules", func(c *gin.Context){
		userID := "ASD" // TODO
		coll := mongoDB.Database("tmuprep").Collection("schedules")
		cursor, err := coll.Find(c, bson.D{{"belongsTo", userID}})
		var results []bson.M
		if err != nil {
			panic(err)
		}
		for cursor.Next(c) {
            var result bson.M
            err := cursor.Decode(&result)
            if err != nil {
                log.Fatal(err)
            }
            results = append(results, result)
        }
        // Return the results as JSON
        c.JSON(http.StatusOK, results)
	})

	router.GET("/:getSchedule", func(c *gin.Context){
		var schedule models.Schedule
		scheduleID := "ID"
		// TODO GET ID
		userID := "A"
		err := mongoDB.Database("tmuprep").Collection("schedules").FindOne(c, bson.D{{"scheduleID", scheduleID}}).Decode(&schedule)
		if err != nil {c.JSON(http.StatusBadRequest, gin.H{"msg": "No Schedules found!"})}

		// VERIFY BELONGS TO USER
		
		// RETURN ALL DOCUMENTS FROM THAT SCHEDULE
		coll := mongoDB.Database("tmuprep").Collection("enrollments")
		cursor, err := coll.Find(c, bson.D{{"student", userID}})
		var results []bson.M
		if err != nil {
			panic(err)
		}
		for cursor.Next(c) {
            var result bson.M
            err := cursor.Decode(&result)
            if err != nil {
                log.Fatal(err)
            }
            results = append(results, result)
        }
        // Return the results as JSON
        c.JSON(http.StatusOK, results)
	})

	router.GET("/:scheduleID", func(c *gin.Context) {
		courseID := c.Param("scheduleID")
		// IGOR TODO


		var course models.Course
		err := mongoDB.Database("tmuprep").Collection("schedules").FindOne(c, bson.D{{"courseCode", courseID}}).Decode(&course)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				c.JSON(400, gin.H{
					"error": "Courses not found",
				})
				return
			}
			panic(err)
		}

		c.JSON(http.StatusOK, gin.H{
			"oid":        course.ID,
			"courseName": course.CourseCode,
		})
	})
}