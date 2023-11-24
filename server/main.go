package main

import (
	"log"
	"tmuprep/configs"
	"tmuprep/middleware"

	"tmuprep/routes/courseRoutes"
	"tmuprep/routes/scheduleRoutes"
	"tmuprep/routes/userRoutes"

	"github.com/gin-gonic/gin"
)

var mongoClient, err = configs.ConnectToMongodb()

func init() {
	if err != nil {
		log.Fatal("Could not connect to MongoDB")
	}
}

func main() {
	router := gin.Default()

	router.GET("/", middleware.UserAuthetication(mongoClient), func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})

	userRoute := router.Group("/")
	{
		userRoutes.Routes(userRoute, mongoClient)
	}

	scheduleRoute := router.Group("/schedule")
	scheduleRoute.Use(middleware.UserAuthetication(mongoClient))
	{
		scheduleRoutes.Routes(scheduleRoute, mongoClient)
	}

	courseRoute := router.Group("/course")
	{
		courseRoutes.Routes(courseRoute, mongoClient)
	}

	router.Run()
}
