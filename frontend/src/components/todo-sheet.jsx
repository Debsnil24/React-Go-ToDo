import Sheet from "@mui/joy/Sheet";
import TodoItem from "./todo-item";
import Input from "@mui/joy/Input";
import { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import RenameModal from "./rename-modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, deleteAllTasks, deleteTask, getTodos } from "../routes.jsx";
import "../styles/TodoSheet.css"; 

function TodoSheet() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const [renameState, setRenameState] = useState({
    dialogOpen: false,
    todoItem: { id: "", todoString: "", checked: "" },
  });

  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setTodoList(data);
    }
  }, [data]);

  const [inputValue, setInputValue] = useState("");
  const createMutation = useMutation({
    mutationFn: async (newItem) => {
      await addTodo(newItem);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSuccess: () => {
      setInputValue("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await deleteTask(id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: async () => {
      await deleteAllTasks();
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCreateTodo = () => {
    if (!inputValue.trim()) return;
    createMutation.mutate({ todoString: inputValue });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (id) => {
    setRenameState({
      dialogOpen: true,
      todoItem: data.find((item) => item.id === id),
    });
  };

  const handleClearAll = () => {
    deleteAllMutation.mutate();
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error fetching data!</div>;

  return (
    <div className="app-container">
    <Sheet className="todo-container">
      {renameState.dialogOpen && (
        <RenameModal
          modalState={renameState}
          setTodoList={setTodoList}
          setModalState={setRenameState}
        />
      )}

      <h1 className="todo-header">ToDo List</h1>

      <div className="todo-input-container">
        <Input
          placeholder="Type in here…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreateTodo()}
          className="todo-input"
        />
        <Button className="todo-add-button" onClick={handleCreateTodo}>
          Create
        </Button>
      </div>

      <div className="todo-list">
        {todoList.length === 0 ? (
          <p className="no-todos">No todos available</p>
        ) : (
          todoList.map((item) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        )}
      </div>

      {todoList.length > 0 && (
        <Button className="todo-clear-all" onClick={handleClearAll}>
          Clear All
        </Button>
      )}
    </Sheet>
    </div>
  );
}

export default TodoSheet;