package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Debsnil24/React-Go-ToDo.git/router"
)

func main() {
	port := os.Getenv("PORT")
	r := router.Router()
	fmt.Println("Starting the server on port 9000")

	err := http.ListenAndServe(":"+port, r)
	if err != nil {
		log.Fatalf("Error: Unable to start Webserver at port 9000 \n %v", err)
	}
}