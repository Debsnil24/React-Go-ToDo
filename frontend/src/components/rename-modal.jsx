
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask, getTodos } from '../routes';

function RenameModal({modalState,setTodoList, setModalState}) {
    const queryClient = useQueryClient();
    console.log(modalState)
    const [newStringName, setNewStringName] = useState(modalState.todoItem.newStringName);
    useEffect(() => {
      if (modalState.dialogOpen) {
        setNewStringName(modalState.todoItem.todoString || '')
      }
    }, [modalState]);
    const editMutation = useMutation({
      mutationFn: async () => {
        await editTask(modalState.todoItem.id, newStringName)
        return getTodos()
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos']})
        queryClient.refetchQueries({ queryKey: ['todos']})
        setNewStringName("")
        setModalState({ ...modalState, dialogOpen: false})
      }
    })
    const handleRenameTodo = () => {
        if(newStringName === '' || newStringName === undefined || newStringName == null) {
          console.error('blank field');
        return;
        }
        setTodoList((prev) => {
            return prev.map((item) => {
                if(item.id === modalState.todoItem.id)
                    return {
                        ...item,
                        todoString: newStringName,
                }
                return item
            })
      })
      editMutation.mutate();
      }
  return (
    <Modal open={modalState.dialogOpen} onClose={() => setModalState({ ...modalState, dialogOpen: false})}>
  <ModalDialog>
    <ModalClose onClick={() => setModalState({ ...modalState, dialogOpen: false})} />
    <Typography>Rename Todo</Typography>
    <div style={{
        display: 'grid',
        gridTemplateColumns: '5fr 1fr',
        w: '50%',
        // border: '1px solid red'
        
      }}>
      <Input placeholder="Type in here…" value={newStringName} onChange={(e) => {
        setNewStringName(e.target.value);
      }} 
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleRenameTodo()
        }
      }}
      />
      <Button 
        variant='neutral'
        sx={{
          mr:2,
          border: '1px solid gray'
        }}
        onClick={() => {
            handleRenameTodo();
        }}>Rename</Button>
        </div>
  </ModalDialog>
</Modal>
  )
}

export default RenameModal