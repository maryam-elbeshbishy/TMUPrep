package graduateRoutes

import (
	"net/http"
	"reflect"
	"tmuprep/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

		schedulePipeline := mongo.Pipeline{
			{{"$match", bson.D{
				{"userID", userID},
				{"scheduleID", schedulePID},
			}}},
			{{"$sort", bson.D{
				{"year", 1},
				{"term", 1},
			}}},
			{{"$lookup", bson.D{
				{"from", "antirequisites"},
				{"localField", "courseID"},
				{"foreignField", "courseCode"},
				{"as", "antirequisites"},
			}}},
			{{"$lookup", bson.D{
				{"from", "prerequisites"},
				{"localField", "courseID"},
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
				{"prerequisites", bson.D{
					{"$map", bson.D{
						{"input", "$prerequisites"},
						{"as", "prerequisites"},
						{"in", "$$prerequisites.prerequisite"},
					}},
				}},
			}}},
		}

		cursor, err := database.Collection("enrollments").Aggregate(c, schedulePipeline)

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
			return
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

		// Check for anti and pre requisites
		var antiProblem, preProblem []models.Enrolled

		// Grab pre and anti and make sure user has/hasn't it in previous years
		for _, course := range enrolled {
			if len(course.Antirequisites) == 0 && len(course.Prerequisites) == 0 {
				continue
			}

			pre := course.Prerequisites

			for _, c := range enrolled {
				if c.Year > course.Year || (c.Term > course.Term && c.Year == course.Year) {
					break
				}

				if len(course.Prerequisites) > 0 && checkValueInEnrolled(pre, c.CourseID) {
					pre = removeElement(pre, c.CourseID)
				}

				if len(course.Antirequisites) > 0 && checkValueInEnrolled(course.Antirequisites, c.CourseID) {
					antiProblem = append(antiProblem, course)
				}
			}

			if len(course.Prerequisites) > 0 && reflect.DeepEqual(course.Prerequisites, pre) {
				preProblem = append(preProblem, course)
			}
		}

		if len(preProblem) > 0 && len(antiProblem) > 0 {
			c.JSON(http.StatusOK, gin.H{
				"canGraduate":   false,
				"antirequisite": antiProblem,
				"prerequisite":  preProblem,
			})
			return
		}

		// Check if enrollments fulfill program requirements
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
				return
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

func checkValueInEnrolled(arr []string, valueToCheck string) bool {
	for _, v := range arr {
		if v == valueToCheck {
			return true
		}
	}
	return false
}

func removeElement(arr []string, elementToRemove string) []string {
	var result []string

	for _, value := range arr {
		if value != elementToRemove {
			result = append(result, value)
		}
	}

	return result
}
