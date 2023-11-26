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
	ID             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CourseID       string             `json:"courseID" bson:"courseID"`
	ScheduleID     primitive.ObjectID `json:"scheduleID" bson:"scheduleID"`
	UserID         primitive.ObjectID `json:"userID" bson:"userID"`
	Year           int
	Term           int
	Prerequisites  []string `json:"prerequisites" bson:"prerequisites"`
	Antirequisites []string `json:"antirequisites" bson:"antirequisites"`
}

type User struct {
	ID       primitive.ObjectID `bson:"_id"`
	GoogleID string             `bson:"googleID"`
}

type Requirement struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Programs   primitive.ObjectID `json:"programs,omitempty" bson:"programs,omitempty"`
	Name       string             `json:"name" bson:"name"`
	NumCourses int                `json:"num_courses" bson:"num_courses"`
	Optional   bool               `json:"optional" bson:"optional"`
	Priority   int                `json:"priority" bson:"priority"`
}

type Program struct {
	ID           primitive.ObjectID `json:"_id" json:"_id" bson:"_id"`
	Name         string             `json:"name" bson:"name"`
	Requirements []Requirement      `json:"requirements" bson:"requirements"`
}

type Schedule struct {
	ID           primitive.ObjectID `json:"_id" bson:"_id"`
	UserID       primitive.ObjectID `json:"userID" bson:"userID"`
	Name         string             `json:"name" bson:"name"`
	Requirements []Requirement      `json:"requirements" bson:"requirements"`
}

type Table struct {
	ID            primitive.ObjectID `json:"_id" bson:"_id"`
	CourseID      primitive.ObjectID `json:"courseId" bson:"courseId"`
	RequirementID primitive.ObjectID `json:"requirementId" bson:"requirementId"`
}
