package controller

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/Debsnil24/React-Go-ToDo.git/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)
var collection *mongo.Collection
func init() {
	client := InitDBConn()
	collection = client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("COLLECTION_NAME"))
}

func GetallTask() []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, result)
	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.Background())
	return results
}

func Createtask(task models.ToDoList) {
	insertRes, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a Single Record", insertRes.InsertedID)
}

func Completetask(ID string) {
	id, _ := primitive.ObjectIDFromHex(ID)

	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": true}}

	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Modified Count: ", result.ModifiedCount)
}

func Undotask(ID string) {
	id, _ := primitive.ObjectIDFromHex(ID)

	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": false}}

	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Modified Count: ", result.ModifiedCount)
}

func Edittask(ID string, task models.ToDoList) {
	id, _ := primitive.ObjectIDFromHex(ID)

	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"task": task.Task}}

	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Modified Count: ", result.ModifiedCount)
}

func Deletetask(ID string) {
	id, _ := primitive.ObjectIDFromHex(ID)

	filter := bson.M{"_id": id}

	result, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Deleted one record: ", result.DeletedCount)
}

func Deleteall() int64 {
	deleteRes, err := collection.DeleteMany(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Deleted records", deleteRes.DeletedCount)
	return deleteRes.DeletedCount
}