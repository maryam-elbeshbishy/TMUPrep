package main

import (
	"log"
	"tmuprep/configs"
	"tmuprep/middleware"

	"tmuprep/routes/courseRoutes"
	"tmuprep/routes/graduateRoutes"
	"tmuprep/routes/scheduleRoutes"
	"tmuprep/routes/userRoutes"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
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

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"Content-Type", "Access-Control-Allow-Headers", "Authorization"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
	}))

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

	graduateRoute := router.Group("/graduate")
	graduateRoute.Use(middleware.UserAuthetication(mongoClient))
	{
		graduateRoutes.Routes(graduateRoute, mongoClient)
	}

	router.Run()
}
