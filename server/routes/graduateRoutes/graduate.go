package graduateRoutes

import (
	"net/http"
	"tmuprep/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Graduate struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id"`
	Name      string             `json:"name" bson:"name"`
	Completed bool               `json:"completed" bson:"completed"`
	Missing   int                `json:"missing" bson:"missing"`
}

func Routes(router *gin.RouterGroup, mongoDB *mongo.Client) {
	router.POST("/:scheduleID", func(c *gin.Context) {
		userID, _ := c.Get("userID")

		if userID == nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Missing user",
			})
			return
		}

		database := mongoDB.Database("tmuprep")

		// Get schedule
		scheduleID := c.Param("scheduleID")

		schedulePID, err := primitive.ObjectIDFromHex(scheduleID)

		sortFields := bson.D{
			{"year", 1},
			{"term", 1},
		}

		options := options.Find().SetSort(sortFields)

		cursor, err := database.Collection("enrollments").Find(c, bson.D{{"userID", userID}, {"scheduleID", schedulePID}}, options)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		var enrolled []models.Enrolled

		if err = cursor.All(c, &enrolled); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}

		// Get requirements
		pipeline := mongo.Pipeline{
			{{"$match", bson.D{{"name", "Computer Science"}}}},
			{{"$lookup", bson.D{
				{"from", "requirement"},
				{"localField", "_id"},
				{"foreignField", "programs"},
				{"as", "requirements"},
			}}},
			{{"$addFields", bson.D{
				{"requirements", bson.D{
					{"$map", bson.D{
						{"input", "$requirements"},
						{"as", "requirements"},
						{"in", "$$requirements"},
					}},
				}},
			}}},
		}

		cursor, err = database.Collection("programs").Aggregate(c, pipeline)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		var program models.Program

		cursor.Next(c)
		if err = cursor.Decode(&program); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Compare both
		canGraduate := false

		// //check pre and anti
		// var schedule [][]string
		// var temp []string

		// for index, enrollment := range enrolled {
		// 	if index != 0 && (enrolled[index-1].Term != enrollment.Term || enrolled[index-1].Year != enrollment.Year) {
		// 		schedule = append(schedule, temp)
		// 		temp = []string{}
		// 	}
		// 	temp = append(temp, enrollment.CourseID)
		// }

		// schedule = append(schedule, temp)

		var graduate []Graduate

		for _, requirement := range program.Requirements {
			graduate = append(graduate, Graduate{requirement.ID, requirement.Name, false, requirement.NumCourses})
		}

		for _, enrollment := range enrolled {
			for index, req := range graduate {
				if !req.Completed {
					var course models.Course

					err = database.Collection("courses").FindOne(c, bson.D{{"courseCode", enrollment.CourseID}}).Decode(&course)

					if err != nil {
						c.JSON(http.StatusInternalServerError, gin.H{
							"error": err.Error(),
						})
						return
					}

					var result interface{}

					_ = database.Collection("table").FindOne(c, bson.D{{"_id", req.ID}, {"courseId", course.ID}}).Decode(&result)

					if result != nil {
						graduate[index].Missing = graduate[index].Missing - 1
						if graduate[index].Missing == 0 {
							graduate[index].Completed = true
						}
						return
					}
				}
			}
		}

		c.JSON(200, gin.H{
			"canGraduate": canGraduate,
			"userID":      userID,
			"scheduleID":  scheduleID,
			"graduate":    graduate,
			"enrolled":    enrolled,
			"program":     program,
		})
	})
}
