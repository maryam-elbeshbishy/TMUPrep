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

	router.POST("/", func(c *gin.Context) { // DONE
		userID, _ := c.Get("userID")
		schedule := models.Schedule{UserID: userID.(primitive.ObjectID)}
		scheduleObj, err := mongoDB.Database("tmuprep").Collection("schedules").InsertOne(c, schedule)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "sry servers down"})
		}
		c.JSON(http.StatusAccepted, gin.H{
			"scheduleID": scheduleObj.InsertedID,
		})
	})

	// Enrollment: {ScheduleID: SID, course: "COURSE"}
	router.POST("/:scheduleID", func(c *gin.Context) { //
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
		var schedulePID primitive.ObjectID
		var err error

		if schedulePID, err = primitive.ObjectIDFromHex(c.Param("scheduleID")); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		var enrollmentList []interface{}
		for _, element := range request.CourseList {
			enrollmentList = append(enrollmentList, models.Enrolled{
				UserID:     userID.(primitive.ObjectID),
				CourseID:   element.CourseID,
				Year:       element.Year,
				Term:       element.Term,
				ScheduleID: schedulePID})
		}
		_, err = mongoDB.Database("tmuprep").Collection("enrollments").InsertMany(c, enrollmentList)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusAccepted, gin.H{
			"msg": "Courses enrolled successfully!",
		})
	})

	// Drop Course: {ScheduleID: SID, course: "COURSE"}
	router.DELETE("/:scheduleID", func(c *gin.Context) { //

		type CourseRequest struct {
			CourseID string `json:"courseID" bson:"courseID"`
		}

		var requestData CourseRequest
		userID, _ := c.Get("userID")
		var schedulePID primitive.ObjectID
		var err error

		if schedulePID, err = primitive.ObjectIDFromHex(c.Param("scheduleID")); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := c.BindJSON(&requestData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		mongoDB.Database("tmuprep").Collection("enrollments").DeleteOne(c, bson.M{"scheduleID": schedulePID, "userID": userID, "courseID": requestData.CourseID})

		c.JSON(http.StatusAccepted, gin.H{
			"msg": "Courses dropped successfully!",
		})
	})

	router.GET("/all", func(c *gin.Context) { // DONE
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
	router.GET("/:scheduleID", func(c *gin.Context) { // DONE
		scheduleID := c.Param("scheduleID")
		var schedulePID primitive.ObjectID
		var err error

		if schedulePID, err = primitive.ObjectIDFromHex(c.Param("scheduleID")); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Bad request :P",
			})
			return
		}

		userID, _ := c.Get("userID") // TODO
		println(scheduleID)
		var schedule models.Schedule
		err = mongoDB.Database("tmuprep").Collection("schedules").FindOne(c, bson.D{{"_id", schedulePID}, {"userID", userID}}).Decode(&schedule)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		}

		// RETURN ALL DOCUMENTS FROM THAT SCHEDULE
		coll := mongoDB.Database("tmuprep").Collection("enrollments")
		cursor, err := coll.Find(c, bson.D{{"scheduleID", schedulePID}})
		var results []bson.M
		if err != nil {
			panic(err)
		}
		if err = cursor.All(c, &results); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			c.Abort()
		}
		c.JSON(http.StatusOK, results)
	})
}
