package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"

	"github.com/Debsnil24/React-Go-ToDo.git/router"
)

func main() {
	cmd := exec.Command("npm", "start")
	cmd.Dir = "/Users/debsnilsamudra/Documents/Program/React-Go-ToDo/frontend"
	err := cmd.Start()
	if err != nil {
		log.Fatal(err)
	}
	r := router.Router()
	fmt.Println("Starting the server on port 9000")

	err = http.ListenAndServe(":9000", r)
	if err != nil {
		log.Fatalf("Error: Unable to start Webserver at port 9000 \n %v", err)
	}
}