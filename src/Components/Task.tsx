import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import st from "./TodoList.module.css";
import {TaskStatuses, TaskType} from "../API/todolists-api";


export type TaskPropsType = {
    task: TaskType
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    checkedUncheckedTask: (todoId: string, taskId: string, statusTask: TaskStatuses) => void
    onChange: (todoId: string, taskId: string, newTitle: string) => void
}

export const Task = React.memo(({
                         task,
                         todoId,
                         removeTask,
                         checkedUncheckedTask,
                         onChange,
                        }: TaskPropsType) => {
console.log('Task')
    const clickRemoveTaskHandler = useCallback(() => {
        removeTask(todoId, task.id)
    },[todoId, task.id])

    const changeCheckStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let checked = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress
        checkedUncheckedTask(todoId, task.id, checked)
    },[todoId, task.id])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        onChange(todoId, task.id, newTitle)
    }, [todoId, task.id])

    const style = `${st.styleList}`

    return (
        <div>
            <li key={task.id} className={style}>
                <input key={task.id}
                        type="checkbox"
                        checked={task.status === TaskStatuses.Completed}
                        onChange={changeCheckStatus}
                />
                <EditableSpan
                    title={task.title}
                    onChange={changeTaskTitleHandler}
                />
                <button className={style} onClick={clickRemoveTaskHandler}>X</button>
            </li>
        </div>
    );
});

