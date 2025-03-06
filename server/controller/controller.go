package controller

import (
	"os"
)

func init() {
	client := InitDBConn()
	collection := client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("COLLECTION_NAME"))
}

