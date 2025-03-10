import Sheet from '@mui/joy/Sheet';
import TodoItem from './todo-item';
import Input from '@mui/joy/Input';
import { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import RenameModal from './rename-modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteAllTasks, deleteTask, getTodos } from '../routes.jsx'

function TodoSheet() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: getTodos, refetchOnMount: true, refetchOnWindowFocus: false })

  const [renameState, setRenameState] = useState({
    dialogOpen: false,
    todoItem: {
      id: '',
      todoString: '',
      checked: ''
    }
  })

  const [todoList1, setTodoList] = useState([]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setTodoList(data);
    }
  }, [data]);

  const [inputValue, setInputValue] = useState('');
  const createMutation = useMutation({
    mutationFn: async (newItem) => {
      console.log('new', newItem)
      addTodo(newItem)
      getTodos()
    },
    onSuccess: () => {
      setInputValue("");
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.refetchQueries({ queryKey: ['todos'] });
    }
  })


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      deleteTask(id)
      getTodos()
    },
    onSuccess: (_, id) => {
      setTodoList((prev) => {
        return prev.filter((newItem) => newItem.id !== id);
      })
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.refetchQueries({ queryKey: ['todos'] })
    }
  })

  const deleteAll = useMutation({
    mutationFn: async () => {
      deleteAllTasks()
      getTodos()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.refetchQueries({ queryKey: ['todos'] });
    }
  })

  const handleCreateTodo = () => {
    if (inputValue === '' || inputValue === undefined || inputValue == null) {
      console.error('blank field');
      return;
    }
    const newItem = {
      todoString: inputValue
    }
    console.log(newItem)
    createMutation.mutate(newItem);
    return;
  }
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  }
  const handleEdit = (id) => {
    setRenameState({
      dialogOpen: true,
      todoItem: data.find((item) => item.id === id)
    })
  }
  const handleClearAll = () => {
    deleteAll.mutate();
  }
  if (isLoading) {
    return <div>loading...</div>
  }
  if (isError) {
    return <div>error!</div>
  }

  return (
    <Sheet sx={{
      w: '100%',
      h: '100%',
      flex: 'flex',
      flexDirection: 'column',
    }}>
      {renameState.dialogOpen &&
        <RenameModal modalState={renameState} setTodoList={setTodoList} setModalState={setRenameState} />
      }
      <div id="header">
        <h1 style={{textAlign: "center"}}>ToDo List</h1>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '5fr 1fr',
        w: '50%',
        // border: '1px solid red'

      }}>
        <Input placeholder="Type in here…" value={inputValue} onChange={(e) => {
          setInputValue(e.target.value);
        }} 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCreateTodo();
          }
        }}
        />
        <Button
          variant='neutral'
          sx={{
            mr: 2,
            border: '1px solid gray'
          }}
          onClick={handleCreateTodo}
        
          >Create</Button>
      </div>
      <div id='content' style={{
        width: '80%',
        minHeight: '80%',
        border: '2px solid gray',
        borderRadius: '5mm',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}>
        {!todoList1 || todoList1.length === 0 ? (
          <p style={{ color: 'gray', textAlign: 'center', alignSelf: 'center' }}>No todos available</p>
        ) : (data.map((item) => {
          return (
            <TodoItem key={item.id} todoItem={item} handleDelete={handleDelete} handleEdit={handleEdit} />)
        })
        )}
        {todoList1.length > 0 && (
        <Button size='xs' variant='plain'
        sx={{maxWidth: 'fit-content', paddingX: '0.5rem', color: 'gray', alignSelf: 'center'}}
        onClick={handleClearAll}>
        Clear All</Button>
        )}
      </div>
    </Sheet>
  )
}

export default TodoSheet