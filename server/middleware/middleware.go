package middleware

import (
	"encoding/json"
	"net/http"

	"github.com/Debsnil24/React-Go-ToDo.git/controller"
	"github.com/Debsnil24/React-Go-ToDo.git/models"
	"github.com/gorilla/mux"
)

func GetAllTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := controller.getAllTask()
	json.NewEncoder(w).Encode(payload)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type","application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var task models.ToDoList
	json.NewDecoder(r.Body).Decode(&task)
	controller.createTask(task)
	json.NewEncoder(w).Encode(task)
}

func CompleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type","application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	controller.completeTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func UndoTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type","application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	controller.undoTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func EditTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type","application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	controller.editTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type","application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	controller.deleteTask(params["id"])
}

func DeleteAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type","application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	count := controller.deleteAll()
	json.NewEncoder(w).Encode(count)
}