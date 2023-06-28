import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {
    addTaskAC,
    changeTaskTitleAC,
    checkedUncheckedTaskAC,
    removeTaskAC,
    TasksStateType,
} from "./State/task-reducers";
import {
    addTodoListAC,
    changeTodoListTitleAC,
    fetchTodoListsTС,
    filterTaskAC,
    removeTodolistAC,
} from "./State/todoList-reducers";
import {AppRootStateType, useAppDispatch} from "./State/store";
import {useSelector} from "react-redux";

export type wordFilter = "All" | "Active" | "Completed"

export type TodoListType = {
    id: string
    title: string
    filter: string
}

// export type TasksStateType = {
//     [todoListID: string]: Array<TaskType>
// }

const App = () => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchTodoListsTС())
    }, [])


    // const addTask = useCallback((todoId: string, title: string) => {
    //     dispatch(addTaskAC(todoId, title))
    // }, [dispatch])

    const removeTask = useCallback((todoId: string, taskId: string) => {
        dispatch(removeTaskAC(todoId, taskId))
    }, [dispatch])

    const checkedUncheckedTask = useCallback((todoId: string, taskId: string, statusTask: boolean) => {
        dispatch(checkedUncheckedTaskAC(todoId, taskId, statusTask))
    }, [dispatch])

    const changeTaskTitle = useCallback((todoId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newTitle))
    },[dispatch])

    const filterTask = useCallback((todoId: string, filter: wordFilter) => {
        dispatch(filterTaskAC(todoId, filter))
    }, [dispatch])//хук говорит что не создавай новый объект

    const removeTodolist = useCallback((todoId: string) => {
        dispatch(removeTodolistAC(todoId))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        let todoListID = v1()
        dispatch(addTodoListAC(todoListID, title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoId, title))
    }, [dispatch])

    const renderTodoLists = todoLists.map(tl => {
        let filteredTodoLists = tasks[tl.id];

        return (
            <div  key={tl.id} className="todoList">
                <TodoList
                    todoId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={filteredTodoLists}
                    // addTask={addTask}
                    removeTask={removeTask}
                    checkedUncheckedTask={checkedUncheckedTask}

                    filterTask={filterTask}
                    removeTodolist={removeTodolist}
                    onChange={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </div>
        );
    })

    return (
        <div>
            <div className="App">
                <div className="itemInput">
                    <AddItemForm
                        addItem={addTodoList}
                    />
                </div>
                <div className="todoBlock">
                    {renderTodoLists}
                </div>
            </div>
        </div>
    );
}

export default App;
