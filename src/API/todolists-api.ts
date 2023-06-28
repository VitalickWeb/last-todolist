import axios, {Axios, AxiosResponse} from "axios";

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
type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: string
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
    getTodoLists(todoLists: string) {
        return instance.get<TodoListType[]>(todoLists)
    },

    createTodoList(todoList: string, title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(todoList, { title: title })
    },

    deleteTodoList(todoList: string, todoListsID: string) {
        return instance.delete<ResponseType>(`${todoList}/${todoListsID}`)
    },

    updateTodoList(todoId: string, title: string) {
        return instance.put<ResponseType>(todoId, { title: title })
    },

}

//########################################################################### API tasks

const instanceTask = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd26e77b0-fffd-47c6-b626-b4aa9e3fa7eb'
    }
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export type ResponseGetTaskType<T> = {
    error: null
    items: T
    totalCount: number
}

export type ResponsePostTaskType<T> = {
    error: null
    item: T
    totalCount: number
}

export type TaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: TaskStatuses
    title: string
    todoListId: string
}

type UpdateTaskType = {
    title: string
    deadline: null
    description: null
    priority: number
    startDate: null
    status: number
}

type DeleteTaskType = {
    resultCode: number
    messages: string[]
    data: {}
}

export const taskAPI = {
    getTask(todoId: string) {
        return instanceTask.get<ResponseGetTaskType<TaskType[]>>(`todo-lists/${todoId}/tasks`)
    },

    createTask(todoListIdTask: string, taskTitle: string) {
        return instanceTask.post<AxiosResponse<ResponsePostTaskType<TaskType>>>

        (`todo-lists/${todoListIdTask}/tasks`, {title: taskTitle})
    },

    updateTask(todoListIdTask: string, taskTitle: string) {
        return instanceTask.put<UpdateTaskType>(todoListIdTask, {title: taskTitle})
    },

    deleteTask(todoListIdTask: string) {
        return instanceTask.delete<DeleteTaskType>(todoListIdTask)
    },
}