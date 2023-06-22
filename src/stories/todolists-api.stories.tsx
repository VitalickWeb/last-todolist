import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../API/todolists-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        //базовый адрес в любой API находится вверху документации, указываем базовый
        // адрес https://social-network.samuraijs.com/api/1.1 и к базовому
        // адресу endpoint /todo-lists
        // смотрим консоль разработчика всегда когда работаем с бэкэндом во вкладке NETWORK
        // Метод get первым параметром принимает URL адрес, а вторым объект
        //Если мы разлогиниваемся то кука убивается, когда залогиниваемся то кука создается заново бэкэндом

        todolistAPI.getTodoLists('/todo-lists')
            .then((response) => {
                setState(response.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodoList('/todo-lists', 'LEARN CREATE TODOLIST')
            .then((response) => {
            setState(response.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todoId = '7b2fc042-d433-45bd-b0b2-e8b81bec3360'

    useEffect(() => {
        todolistAPI.deleteTodoList('/todo-lists', todoId)
            .then((response) => {
                setState(response.data)//первые данные идут от axios, а дальше от backend
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todoId = 'a1ced1b5-933c-4009-bd63-b4ba90b8f4c2'

    useEffect(() => {

        todolistAPI.updateTodoList(`/todo-lists/${todoId}`, 'learn REST API')
            .then((response) => {
                setState(response.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

//########################################################################### API tasks

export const GetTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'a1ced1b5-933c-4009-bd63-b4ba90b8f4c2'

    useEffect(() => {

        taskAPI.getTask(`todo-lists/${todolistId}/tasks`)
            .then((response) => {
                setState(response.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    // const todolistId = 'a1ced1b5-933c-4009-bd63-b4ba90b8f4c2'

    // useEffect(() => {
    //
    //     taskAPI.createTask(`todo-lists/${todolistId}/tasks`, 'REST API FOR OF TASKS')
    //         .then((response) => {
    //             setState(response.data)
    //         })
    //
    // }, [])

    const createTasks = () => {
        taskAPI.createTask(`todo-lists/${todolistId}/tasks`, 'CREATE !!! -> TASK ')
            .then((response) => {
                setState(response.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" value={todolistId} placeholder={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <button onClick={createTasks}>create tasks</button>
            </div>
        </div>
    );
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    // const todolistId = 'a1ced1b5-933c-4009-bd63-b4ba90b8f4c2'
    // const taskId = '6b35a0fc-62fe-40d3-8e8d-ac753062f4b6'

    // useEffect(() => {
    //
    //     taskAPI.updateTask(`todo-lists/${todolistId}/tasks/${taskId}`, 'NEW---TASK---TITLE')
    //         .then((response) => {
    //             setState(response.data)
    //         })
    //
    // }, [])

    const updateTasks = () => {
        taskAPI.updateTask(`todo-lists/${todolistId}/tasks/${taskId}`, 'NEW---TASK---TITLE!!!')
            .then((response) => {
                setState(response.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" value={todolistId} placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input type="text" value={taskId} placeholder={'taskId'} onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <button onClick={updateTasks}>update tasks</button>
            </div>
        </div>
    );
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    // const todolistId = 'a1ced1b5-933c-4009-bd63-b4ba90b8f4c2'
    // const taskId = 'aea1f815-994f-487b-aec6-3a4410518201'

    // useEffect(() => {
    //
    //     taskAPI.deleteTask(`todo-lists/${todolistId}/tasks/${taskId}`)
    //         .then((response) => {
    //             setState(response.data)
    //         })
    //
    // }, [])

    const deleteTasks = () => {
        taskAPI.deleteTask(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then((response) => {
                setState(response.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" value={todolistId} placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input type="text" value={taskId} placeholder={'taskId'} onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <button onClick={deleteTasks}>delete tasks</button>
            </div>
        </div>
    );
}