import React, {ChangeEvent, useState} from 'react';
import st from "./TodoList.module.css";

export type AddTodoListType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(({
                                addItem,
                            }: AddTodoListType) => {

    const [taskTitle, setTaskTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        if (taskTitle.length === 0 && error) {
            setError(false)
        }
    }

    const clickAddTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addItem(taskTitle)
            setTaskTitle("")
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <input className={error ? st.inputError : ""}
                   value={taskTitle}
                   onChange={changeTaskTitle}
                   placeholder="Enter the title"
            />
            <button onClick={clickAddTaskHandler}>+</button>
            {error && <div className={st.textError}>Input Error!</div>}
        </div>
    );
});

