package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Course struct {
	ID             primitive.ObjectID `bson:"_id" json:"id"`
	CourseCode     string             `bson:"courseCode,omitempty" json:"courseCode,omitempty"`
	Faculty        string             `bson:"faculty,omitempty" json:"faculty,omitempty"`
	Title          string             `bson:"title,omitempty" json:"title,omitempty"`
	URL            string             `bson:"url,omitempty" json:"url,omitempty"`
	Description    string             `bson:"description,omitempty" json:"description,omitempty"`
	Antirequisites []string           `bson:"antirequisites,omitempty" json:"antirequisites"`
	Prerequisites  []string           `bson:"prerequisites,omitempty" json:"prerequisites"`
}

// Create one enroll object everytime a user enrolls into a class.
type Enrolled struct {
	ID            primitive.ObjectID `json:"_id" bson:"_id"`
	CourseID      primitive.ObjectID `json:"courseId" bson:"courseId"`
	ScheduleID    primitive.ObjectID `json:"scheduleId" bson:"scheduleId"`
	RequirementId primitive.ObjectID `json:"requirementId" bson:"requirementId"`
	UserID        primitive.ObjectID `json:"userId" bson:"userId"`
	year          int
	term          string
}

type User struct {
	ID       primitive.ObjectID `bson:"_id"`
	GoogleID string             `bson:"googleID"`
}

type Requirement struct {
	ID   primitive.ObjectID `bson:"_id"`
	Name string             `json:"name" bson:"name"`
}

type Program struct {
	ID   primitive.ObjectID `bson:"_id"`
	Name string             `json:"name" bson:"name"`
}
