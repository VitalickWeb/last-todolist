import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import st from "./TodoList.module.css";
import {TaskType} from "./TodoList";

export type TaskPropsType = {
    task: TaskType
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    checkedUncheckedTask: (todoId: string, taskId: string, statusTask: boolean) => void
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
        let target = e.currentTarget.checked
        checkedUncheckedTask(todoId, task.id, target)
    },[todoId, task.id])

    const changeTaskTitleHandler = useCallback(() => {
        onChange(todoId, task.id, task.title)
    }, [todoId, task.id, task.title])

    const style = `${st.styleList}`

    return (
        <div>
            <li key={task.id} className={style}>
                <input key={task.id}
                    type="checkbox"
                    checked={task.isDone}
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

