package graduateRoutes

import (
	"net/http"
	"reflect"
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
				{"pipeline", bson.A{
					bson.D{{"$sort", bson.D{{"priority", 1}}}},
				}},
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
		var graduate []Graduate

		var requirementIDs []primitive.ObjectID

		for _, requirement := range program.Requirements {
			graduate = append(graduate, Graduate{requirement.ID, requirement.Name, !(requirement.NumCourses > 0), requirement.NumCourses})
			requirementIDs = append(requirementIDs, requirement.ID)
		}

		var open []models.Enrolled

		for _, enrollment := range enrolled {
			var course models.Course

			err = database.Collection("courses").FindOne(c, bson.D{{"courseCode", enrollment.CourseID}}).Decode(&course)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			var result []models.Table

			filter := bson.M{"requirementId": bson.M{"$in": requirementIDs}, "courseId": course.ID}

			cursor, _ = database.Collection("table").Find(c, filter)

			if err = cursor.All(c, &result); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
			}

			tempGraduate := make([]Graduate, len(graduate))
			copy(tempGraduate, graduate)

			for index, req := range graduate {
				if containsValue(result, req.ID) && !req.Completed {
					graduate[index].Missing -= 1

					if graduate[index].Missing == 0 {
						graduate[index].Completed = true
					}

					break
				}
			}

			isEqual := reflect.DeepEqual(graduate, tempGraduate)
			if isEqual {
				open = append(open, enrollment)
			}
		}

		canGraduate := true

		for _, grad := range graduate {
			if !grad.Completed {
				canGraduate = false
			}
		}

		if len(open) >= 4 && canGraduate {
			c.JSON(http.StatusOK, gin.H{
				"canGraduate": canGraduate,
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"canGraduate":  canGraduate,
			"requirements": removeCompleted(append(graduate, Graduate{primitive.NilObjectID, "Open Electives", len(open) >= 4, 4 - len(open)})),
		})
	})
}

func containsValue(arr []models.Table, valueToCheck primitive.ObjectID) bool {
	for _, v := range arr {
		if v.RequirementID == valueToCheck {
			return true
		}
	}
	return false
}

func removeCompleted(grad []Graduate) []Graduate {
	var result []Graduate
	for _, g := range grad {
		if !g.Completed {
			result = append(result, g)
		}
	}

	return result
}
