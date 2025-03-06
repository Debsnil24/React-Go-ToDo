package controller

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDBConn() *mongo.Client {
	err := godotenv.Load("/Users/debsnilsamudra/Documents/Program/React-Go-ToDo/server/.env")
	if err != nil {
		log.Fatalf("Error: Unable to load .env - %v", err)
	}
	ctx := context.Background()
	options := options.Client().ApplyURI(os.Getenv("DB_URI"))
	client, err := mongo.Connect(ctx, options)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
	return client
}