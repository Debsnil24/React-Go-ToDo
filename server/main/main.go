package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Debsnil24/React-Go-ToDo.git/router"
)

func main() {
	r := router.Router()
	fmt.Println("Starting the server on port 9000")

	err := http.ListenAndServe(":9000", r)
	if err != nil {
		log.Fatalf("Error: Unable to start Webserver at port 9000 \n %v", err)
	}
}