package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Course struct {
    ID primitive.ObjectID `bson:"_id"`
    CourseCode string `bson:"courseCode,omitempty" json:"courseCode,omitempty"`
}

type Enrolled struct {
    ID primitive.ObjectID `json:"_id" bson:"_id"`
    CourseId primitive.ObjectID `json:"courseId" bson:"courseId"`
    ScheduleId primitive.ObjectID `json:"scheduleId" bson:"scheduleId"`
    RequirementId primitive.ObjectID `json:"requirementId" bson:"requirementId"`
    year int
}