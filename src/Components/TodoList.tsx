import React, {useCallback, useEffect} from 'react';

import st from "./TodoList.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {useAppDispatch} from "../State/store";
import {setTasksTС} from "../State/task-reducers";
import {TaskStatuses, TaskType} from "../API/todolists-api";
import {wordFilter} from "../State/todoList-reducers";

export type TodolistPropsType = {
    todoId: string
    title: string
    filter: string
    tasks: Array<TaskType>
    addTask: (todoId: string, title: string) => void
    removeTask: (todoId: string, taskId: string) => void
    checkedUncheckedTask: (todoId: string, taskId: string, statusTask: TaskStatuses) => void
    filterTask: (todoId: string, filter: wordFilter) => void
    removeTodolist: (todoId: string) => void
    onChange: (todoId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoId: string, newTitle: string) => void
}

export const TodoList = React.memo(({
                             todoId,
                             title,
                             filter,
                             tasks,
                             addTask,
                             removeTask,
                             checkedUncheckedTask,
                             filterTask,
                             removeTodolist,
                             onChange,
                             changeTodoListTitle,
                         }: TodolistPropsType) => {

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(setTasksTС(todoId))
    }, [])

    let filteredTodoLists = tasks;

    if (filter === "Active") {
        filteredTodoLists = tasks.filter(t => t.status === TaskStatuses.InProgress)
    } else if (filter === "Completed") {

        filteredTodoLists = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderTasks = tasks.length !== 0 ? filteredTodoLists.map(t => {

        //key={t.id} нельзя присваивать к фрагменту <></> можно только к элементу <div key={t.id}></div>

        return (
            <div key={t.id}>
                <Task
                    task={t}
                    todoId={todoId}
                    removeTask={removeTask}
                    checkedUncheckedTask={checkedUncheckedTask}
                    onChange={onChange}
                />
            </div>
        );
    }) : <span>Enter the task!</span>

        const clickFilterAll = useCallback(() => {filterTask(todoId, "All")}, [filterTask, todoId])
        const clickFilterActive = useCallback(() => {filterTask(todoId, "Active")}, [filterTask, todoId])
        const clickFilterCompleted = useCallback(() => {filterTask(todoId, "Completed")}, [filterTask, todoId])

        const clickRemoveTodolist = useCallback(() => {
            removeTodolist(todoId)
        }, [removeTodolist, todoId])

        const addTodoListHandler = useCallback((title: string) => {
            addTask(title, todoId)
        }, [todoId, title])

        const changeTitleTodo = useCallback((title: string) => {
            changeTodoListTitle(todoId, title)
        }, [changeTodoListTitle, todoId, title])

        return (
            <div>
                <h3 className={st.titleBox}>
                    <EditableSpan
                        title={title}
                        onChange={changeTitleTodo}
                    />
                    <button onClick={clickRemoveTodolist}>X</button>
                </h3>
                <AddItemForm
                    addItem={addTodoListHandler}
                />

                <ul>
                    {renderTasks}
                </ul>

                <div className={st.filterButtonsBox}>
                    <button className={filter === "All" ? st.active : st.colored}
                            onClick={clickFilterAll}>All
                    </button>
                    <button className={filter === "Active" ? st.active : st.colored}
                            onClick={clickFilterActive}>Active
                    </button>
                    <button className={filter === "Completed" ? st.active : st.colored}
                            onClick={clickFilterCompleted}>Completed
                    </button>
                </div>
            </div>
        );
    });

