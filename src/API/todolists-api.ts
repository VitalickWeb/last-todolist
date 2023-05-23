import axios from 'axios'

// Ещё небольшая оптимизация… Чтобы не передавать settings запрос, а также чтобы не писать длинный url,
// создадим отдельный настроенный instance (объект-экземпляр) axios, и будем делать запросы с помощью него!
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd26e77b0-fffd-47c6-b626-b4aa9e3fa7eb'
    }
})
//Типизацию можем смотреть в API документации или что нам приходит в Preview во вкладке NETWORK
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: []
//     data: {
//         item: TodolistType
//     }
// }
//
// type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: string[],
//     data: {}
// }
//
// type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[],
//     data: {}
// }
//Делаем один тип у которого будут те же поля и нам нужно динамически подкидывать поле data
//Мы можем сказать что data объект может заменяться каким то типом <T>, который будет приходить
//в ResponseType<T> -это дженерик, который будет динамическим.
//Некий T это как тип и вставляют параметр T
//если ни чего не передаем в дженерик, то оставляем дефолтное значение <T = {}>
type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

export const todolistAPI = {
    getTodolist(todoLists: string) {
        return instance.get<TodolistType[]>(todoLists)
    },

    createTodolist(todoList: string, title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(todoList, { title: title })
    },

    deleteTodolist(todoList: string, todoListsID: string) {
        return instance.delete<ResponseType>(`${todoList}/${todoListsID}`)
    },

    updateTodolist(todoId: string, title: string) {
        return instance.put<ResponseType>(todoId, { title: title })
    },

}