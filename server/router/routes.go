package router

import (
	"github.com/Debsnil24/React-Go-ToDo.git/middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/task",middleware.GetAllTask).Methods("GET")
	router.HandleFunc("/api/task/create",middleware.CreateTask).Methods("POST")
	router.HandleFunc("/api/task/complete",middleware.CompleteTask).Methods("PUT")
	router.HandleFunc("/api/task/edit",middleware.EditTask).Methods("PUT")
	router.HandleFunc("/api/task/delete",middleware.DeleteTask).Methods("DELETE")
	return router
}