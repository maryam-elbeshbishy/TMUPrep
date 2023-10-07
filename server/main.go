package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"tmuprep/configs"

	"tmuprep/routes/schedule"
)

var uri string = configs.EnvMongoURI()

var mongoClient, err = configs.ConnectToMongodb()

func init() {
	if err != nil {
		log.Fatal("Could not connect to MongoDB")
	}
}

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})

	router := r.Group("/schedule")
	{
		schedule.Routes(router, mongoClient)
	}

	r.Run()
}
