package main

import (
    "context"
    "log"

    "github.com/gin-gonic/gin"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

const uri = "connection string"

var mongoClient *mongo.Client

func init() {
    if err := connectToMongodb(); err != nil {
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

    r.Run()
}

func connectToMongodb() error {
    serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	
    opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

    client, err := mongo.Connect(context.TODO(), opts)

    if err != nil {
        panic(err)
    }
    err = client.Ping(context.TODO(), nil)
    mongoClient = client
    return err
}