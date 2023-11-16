package scheduleRoutes

import (
	"net/http"
	"tmuprep/models"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client) {
	router.GET("", func(c *gin.Context) {
		c.JSON(http.StatusAccepted, gin.H{
			"message": "course",
		})
	})

	router.POST("/:schedule", func(c *gin.Context) {
		userID, _ := c.Get("userID")
		schedule := models.Schedule{UserID: userID.(string)}
		scheduleObj, err := mongoDB.Database("tmuprep").Collection("schedules").InsertOne(c, schedule)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "sry servers down"})
		}
		c.JSON(http.StatusAccepted, gin.H{
			"scheduleID": scheduleObj.InsertedID,
		})
	})

	// Enrollment: {ScheduleID: SID, course: "COURSE"}
	router.PUT("/schedule/:scheduleID", func(c *gin.Context) {
		type CourseRequest struct {
			CourseID string `json:"courseID" bson:"courseID"`
			Year     int    `json:"year" bson:"year"`
			Term     int    `json:"term" bson:"term"`
		}
		type EnrollRequest struct {
			CourseList []CourseRequest `json:"courseList" bson:"courseList"`
		}

		var request EnrollRequest
		userID, _ := c.Get("userID")
		var userPID, schedulePID primitive.ObjectID
		var err error
		if userPID, err = primitive.ObjectIDFromHex(userID.(string)); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Bad request :P",
			})
			return
		}
		if schedulePID, err = primitive.ObjectIDFromHex(c.Param("scheduleID")); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Bad request :P",
			})
			return
		}
		if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Bad request :P",
			})
			return
		}

		var enrollmentList []interface{}
		for _, element := range request.CourseList {
			enrollmentList = append(enrollmentList, models.Enrolled{UserID: userPID, CourseID: element.CourseID, Year: element.Year, Term: element.Term, ScheduleID: schedulePID})
		}
		mongoDB.Database("tmuprep").Collection("enrollments").InsertMany(c, enrollmentList)
	})

	router.GET("/:getSchedules", func(c *gin.Context) {
		userID, _ := c.Get("userID")
		coll := mongoDB.Database("tmuprep").Collection("schedules")
		cursor, err := coll.Find(c, bson.D{{"userID", userID}})
		var results []bson.M
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No schedules found"})
		}
		if err = cursor.All(c, &results); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}
		// Return the results as JSON
		c.JSON(http.StatusOK, results)
	})

	// SCHEDULE ID, GET BACK COURSES[]
	router.GET("/schedule/:scheduleID", func(c *gin.Context) {
		scheduleID := c.Param("scheduleID")
		userID, _ := c.Get("userID") // TODO
		var schedule models.Schedule
		err := mongoDB.Database("tmuprep").Collection("schedules").FindOne(c, bson.D{{"scheduleID", scheduleID}, {"userID", userID}}).Decode(&schedule)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"msg": "No Schedules found!"})
		}

		// RETURN ALL DOCUMENTS FROM THAT SCHEDULE
		coll := mongoDB.Database("tmuprep").Collection("enrollments")
		cursor, err := coll.Find(c, bson.D{{"scheduleID", scheduleID}})
		var results []bson.M
		if err != nil {
			panic(err)
		}
		if err = cursor.All(c, &results); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}
		c.JSON(http.StatusOK, results)
	})
}
