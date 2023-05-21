
import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
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

        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}