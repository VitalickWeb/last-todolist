import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {AddItemForm} from "./Components/AddItemForm";
import {
    changeTaskStatusAC,
    createTaskTС,
    deleteTaskTС,
    TasksStateType,
    updateTaskAC,
    updateTaskStatusTC,
} from "./State/task-reducers";
import {
    changeTodoListTitleAC,
    createTodoListTС,
    fetchTodoListsTС,
    filterTaskAC,
    removeTodoListsTС, updateTodoListTС,
    wordFilter,
} from "./State/todoList-reducers";
import {AppRootStateType, useAppDispatch} from "./State/store";
import {useSelector} from "react-redux";

export type TodoListType = {
    id: string
    title: string
    filter: string
    addedDate: string
    order: number
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


    const addTask = useCallback((todoId: string, title: string) => {
        dispatch(createTaskTС(todoId, title))
    }, [dispatch])

    const removeTask = useCallback((todoId: string, taskId: string) => {
        dispatch(deleteTaskTС(todoId, taskId))
    }, [dispatch])

    const checkedUncheckedTask = useCallback((todoId: string, taskId: string, statusTask: boolean) => {
        dispatch(updateTaskStatusTC(todoId, taskId, statusTask))
    }, [dispatch])

    const changeTaskTitle = useCallback((todoId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskAC(todoId, taskId, newTitle))
    },[dispatch])

    const filterTask = useCallback((todoId: string, filter: wordFilter) => {
        dispatch(filterTaskAC(todoId, filter))
    }, [dispatch])//хук говорит что не создавай новый объект

    const removeTodolist = useCallback((todoId: string) => {
        dispatch(removeTodoListsTС(todoId))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTС(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoId: string) => {
        dispatch(updateTodoListTС(todoId))
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
                    addTask={addTask}
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
