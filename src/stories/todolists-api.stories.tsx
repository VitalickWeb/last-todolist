import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
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

        todolistAPI.getTodolist('/todo-lists')
            .then((response) => {
                setState(response.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('/todo-lists', 'LEARN CREATE TODOLIST')
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
        todolistAPI.deleteTodolist('/todo-lists', todoId)
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

        todolistAPI.updateTodolist(`/todo-lists/${todoId}`, 'learn REST API')
            .then((response) => {
                setState(response.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}