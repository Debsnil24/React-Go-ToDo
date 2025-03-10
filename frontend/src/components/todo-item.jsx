import React, { useState } from 'react'
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkTask, undoTask, getTodos } from '../routes';

function TodoItem({ todoItem, handleDelete, handleEdit }) {
    const queryClient = useQueryClient();
    const [toggleState, setToggleState] = useState(todoItem.checked || false);

    const toggleMutation = useMutation({
        mutationFn: async () => {
            if (!toggleState) {
                await undoTask(todoItem.id);
            } else {
                await checkTask(todoItem.id);
            }
            getTodos();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            queryClient.refetchQueries({ queryKey: ['todos'] });
        }
    });

    const handleToggleCheck = () => {
        setToggleState((prev) => !prev);
        toggleMutation.mutate();
    };

    return (
        <div className="todo-item">
            <Checkbox
                checked={toggleState}
                value={todoItem.todoString}
                label={
                    <span className={`todo-text ${toggleState ? "completed" : ""}`}>
                        {todoItem.todoString}
                    </span>
                }
                onChange={handleToggleCheck}
            />
            <div className="todo-actions">
                <Button size="xs" variant="soft" onClick={() => handleEdit(todoItem.id)}>Edit</Button>
                <Button size="xs" variant="soft" color="danger" onClick={() => handleDelete(todoItem.id)}>X</Button>
            </div>
        </div>
    );
}

export default TodoItem;