import axios from 'axios';

export const getTodos = async () => {
  try {
    const response = await axios.get('http://localhost:9000/api/task');
    const mapped_data = Array.isArray(response.data)
      ? response.data.map((item) => ({
          id: item._id,
          todoString: item.task,
          checked: item.status,
        }))
      : [];
    return mapped_data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (newItem) => {
    console.log(newItem)
    try {
      const task = {
        task: newItem.todoString
    }
        const response = await axios.post("/api/task/create", task, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return await response.data;
      } catch (error) {
        console.error("Error creating task:", error);
      }
}

export const checkTask = async (id) => {
    // put
    try {
      const response = await axios.put("/api/Comptask/" + id)
      return await response.data
    } catch (error) {
      console.error("Unable to Update status: ", error)
    }

}

export const undoTask = async (id) => {
    // put
    try {
      const response = await axios.put("/api/Undotask/" + id)
      return await response.data
    } catch (error) {
      console.error("Unable to Update Status: ", error)
    }
    
}

export const editTask = async (id, updatedTask) => {
    // put
    try {
      const task = {
        task : updatedTask
      }
      const response = await axios.put("/api/Edittask/" + id , task, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.data
    } catch (error) {
      console.error("Error editing task: ", error)
    }
}

export const deleteTask = async (id) => {
    try {
      const response = await axios.delete("/api/Deltask/" + id);
      return await response.data
    } catch (error) {
      console.error("Error deleting task:", error);
    }
}

export const deleteAllTasks = async () => {
    // delete
    try {
      const response = await axios.delete("/api/task/delete")
      return await response.data
    } catch (error) {
      console.error("Error Deleting all task", error)
    }
}