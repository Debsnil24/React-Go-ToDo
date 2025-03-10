# React-Go-ToDo

A Fullstack Project to Implement a To-Do list app using React and Go
The app allows users to create, edit, delete, and mark tasks as completed. It follows a clean architecture with API routes handling all CRUD operations for tasks.

Refer to the [Tech Stack](#Tech-Stack) section for list of technologies used in this project
## Project Structure

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## API Reference

#### Get all Tasks

```http
  GET /api/task
```

Gets all the data stored in the DB in a Map like data structure

#### Create Task

```http
  POST /api/task/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `task`      | `json` | **Required**: The Task to be created |

Creates a new task based on the input sent to the endpoint in json format

```json
{
  "task" : "Sample Task"
}
```

#### Complete Task

```http
  PUT /api/Comptask/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**: ID at which to update |

Updates the Status in the DB from false to true at the given ID to indicate the task has been completed

#### Undo Task

```http
  PUT /api/Undotask/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**: ID at which to update |

Updates the Status in the DB from true to false at the given ID to undo a completed task

#### Delete Task

```http
  DELETE /api/Deltask/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**: ID at which to update |

Deletes the task from the DB at the given ID 

#### Edit Task

```http
  PUT /api/Edittask/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**: ID at which to update |

Updates the task in the DB to the new task value at the given ID without changing the ID or Status

#### Delete All Task

```http
  DELETE /api/task/delete
```
Deletes all the task from the DB

## Run Locally

#### Clone the project

```bash
  git clone https://github.com/Debsnil24/React-Go-ToDo.git
```

#### Go to the project directory

```bash
  cd React-Go-ToDo
```

#### Install dependencies for the React Frontend

```bash
  cd frontend
```

```bash
  npm install
```

#### Install dependencies for the Go Backend

```bash
  cd server
```

```go
  go mod tidy
```

#### Setup the Mongo Database
* Create a New Connection 
* Create a New Database in the Connection
* Create a Collection in the Database 
* Connect to the Connection
* Update the data in the .env file 
Refer to [Environment Variable](#Environment-Variable) section for more details on creating the .env file

#### Start the server
* Make sure to update the path to .env in connect.go
* Also update the path to front in main.go 

*Note: This will start both the frontend and the backend together & there is no need to start the frontend seprately*
```bash
  cd server
```
```go
  go run main.go
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server folder and fill in the necessary details

`DB_URI`

`DB_NAME`

`COLLECTION_NAME`


## Test Docs

[Testing Documentation](https://linktodocumentation)


## Tech-Stack

**Client:** React, Joy UI, Tanstack Query, Axios

**Server:** Go, Gorilla Mux

**Database:** MongoDB


## Acknowledgements
The Project is based on the Golang React ToDo list project by Akhil Sharma 

Follow the link to the original Video
 
 [GOLANG REACT TODO APP](https://youtu.be/8mEC1X5yLjY?si=o3H2JzuI_PmVRlLg)

