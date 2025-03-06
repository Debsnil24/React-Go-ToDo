package router

import (
	"github.com/Debsnil24/React-Go-ToDo.git/middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/task",middleware.GetAllTask).Methods("GET","OPTIONS")
	router.HandleFunc("/api/task/create",middleware.CreateTask).Methods("POST","OPTIONS")
	router.HandleFunc("/api/task/{id}",middleware.CompleteTask).Methods("PUT","OPTIONS")
	router.HandleFunc("/api/task/{id}",middleware.UndoTask).Methods("PUT","OPTIONS")
	router.HandleFunc("/api/task/{id}",middleware.EditTask).Methods("PUT","OPTIONS")
	router.HandleFunc("/api/task/{id}",middleware.DeleteTask).Methods("DELETE","OPTIONS")
	router.HandleFunc("/api/task/delete",middleware.DeleteAll).Methods("DELETE","OPTIONS")
	return router
}