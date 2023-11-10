package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"

	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetEnvVar(variable string) string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv(variable)
}

func ConnectToMongodb() (*mongo.Client, error) {
	uri := GetEnvVar("MONGOURI")

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)

	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	return mongo.Connect(context.TODO(), opts)
}
