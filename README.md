# React-Go-ToDo

A Fullstack Project to Implement a To-Do list app using React and Go
The app allows users to create, edit, delete, and mark tasks as completed. It follows a clean architecture with API routes handling all CRUD operations for tasks.

Refer to the [Tech Stack](#Tech-Stack) section for list of technologies used in this project
## Project Structure

![Server Side](https://uml.planttext.com/plantuml/svg/TP1H2iCm243_SugG0_GClKgeRWIiWh7Tn-ZTrydMCPBu-HvFqBbQLjjM2ZSXG8sfekweAJv3FETB5s5J8VePjuNG7UDYqrrIQpxL9O-_jMikt2vyqr5G00WVMR6JNMuK2o3LJkXy4AbirhlQUHEvcf3t58um8yFvsXS0)

![Client Side](https://uml.planttext.com/plantuml/svg/VP513i8W44Ntd8AmhsUePz2zgJ2D69WXp93KcDvTRDBOAf7bcvS_7-XPXYmb1ZLIS92r6JEX03gZdqhNit8a1vT8hWHWivkaSWtUxXbdkmPiiQMO2065jzF5y06qoO13XAwk6SBXpfDfE4AEEYyG_mfy0v2zCV_KONcyRzEiSguffoN4CZT35ksOKjrYlgX71rE3Poe2_AargrdrzR7h1xm0)

![Frontend Workflow](https://uml.planttext.com/plantuml/svg/VLJ1Rjf04BtlLunoQ44gxJs7AYGk2HLEQ03r4EKmiWVYikowE-kcKPL_x-mQ1uC3790zdlVcpSo-lM2FpbSRhNpXDS4zOUO7rtOmjuc5aRF6aydXftNhfRRFIibdws31v9Hob7aqAu6TfLWO69QbBZBqXJLdy4-1_1uazlaNFy9Wy1KUvZQtioSYBw6_Zt0kvKnEZk7ARafho7ZrkaSRLKmAzhiCVgC-O7khCFQqQGfCaPaOGXWIz7WSAL9mGwdDKJVWkv8CG_q1aWArNHtectdq12aQND56n9tIrgkOOdvVg6i8ms8CCNOIzMsvb981TeCcrmAR5Jb17UQJq1yLkPTF84zfvUDc0is8VFOaD1zWKUPIdUlPxFSsd8vXWY_aeETi9Kc1kNzo-hkyCBuhr9eXq8mgauNQBQsx9Hr5YiHiFKTUz_hIWSbj_LnpTDPrb8RomhUGyQ_LvYLcwt34HMVJMopGfehSrtOYa90Nk6U2ORYPpwToG7vNnDj5H6mxDM9JQrOskOn0yKyS_JrvLz2VPlW1-7gmWc0p6DQZQyJ5M2Hjh7KE4uiYHjuFCZf-6-QITqlFqH3l9BUjaw9RCw384z_15qX8azzwwG3wZdVgq3PRkleOkuIHN2BohPGHY5tYWLJTSUsliHxrzzdThI1PRW4crLrFfzVcQ2_6Ibq8XLno_m40)

![Backend Workflow](https://uml.planttext.com/plantuml/svg/VP9DJy9048Rl_HKJJdhe7_1W00cW0SLImy5uM9QnRYWxTNQgCSR_xkv2mJR47hlFFE-x7tqdYgNUbOaOAH4oL5hI2QKvZGY6Ic_HRc15l7qjwJD9_2enF3da967KecpXftfZ9Yk172nkuKQLfUl1TmB-2oYawJKyJsZcwK2ym1KiFUrWckSBd_bUenEN_BIS1tw5Qm_p1tAZR9cYEgDQa8DshaI_eOFuPqytYv6SAhifaLrWOqyOL1LJnKO9mhYsMWpPJfDXxOn5vs16XT4mKrz-JnUDwlBOwoIFMRbosz3SQ0nn2oRj9NZGT396IjHQETpRZygM8rhdP0iQ3OFniKOstXTcz_XnyLo13ALcUy3RwHcwYgnFZrimjlYdmDyZtDzYCtts5DhNFYRUAUcET2yqFffJuRlbm_rfmZVl-rZ_Pdy1)
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

[Testing Documentation](https://docs.google.com/document/d/e/2PACX-1vSB0FIBIncdmjMjdoAFneWWfq94eJmtkPw1qOAXbyMVy4a7i7K5ZPPlgeYe4u_3WOlF6LczfqX1d9RW/pub)


## Tech-Stack

**Client:** React, Joy UI, Tanstack Query, Axios

**Server:** Go, Gorilla Mux

**Database:** MongoDB


## Acknowledgements
The Project is based on the Golang React ToDo list project by Akhil Sharma 

Follow the link to the original Video
 - [GOLANG REACT TODO APP](https://youtu.be/8mEC1X5yLjY?si=o3H2JzuI_PmVRlLg)

