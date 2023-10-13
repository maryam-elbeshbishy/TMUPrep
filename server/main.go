package main

import (
	"log"
	"tmuprep/configs"

	"tmuprep/routes/courseRoutes"
	"tmuprep/routes/scheduleRoutes"

	"github.com/gin-gonic/gin"
)

var uri string = configs.EnvMongoURI()

var mongoClient, err = configs.ConnectToMongodb()

func init() {
	if err != nil {
		log.Fatal("Could not connect to MongoDB")
	}
}

func main() {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})

	scheduleRoute := router.Group("/schedule")
	{
		scheduleRoutes.Routes(scheduleRoute, mongoClient)
	}

	courseRoute := router.Group("/course")
	{
		courseRoutes.Routes(courseRoute, mongoClient)
	}


	router.Run()
}
