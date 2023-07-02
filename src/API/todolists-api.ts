import axios, {AxiosResponse} from "axios";

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
export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: []
//     data: {
//         item: TodoListType
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
    getTodoLists() {
        return instance.get<TodoType[]>('/todo-lists')
    },

    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>(`/todo-lists`, {title: title})
    },

    deleteTodoList(todoListID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListID}`)
    },

    updateTodoList(todoId: string, title: { title: string }) {
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
    Draft = 3,
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

export type ResponseChangeTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: null
    deadline: null
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
    getTask(todoListId: string) {
        return instanceTask.get<ResponseGetTaskType<TaskType[]>>

        (`todo-lists/${todoListId}/tasks`)
            .then(res => res.data.items)
    },

    createTask(todoListIdTask: string, taskTitle: string) {
        return instanceTask.post<AxiosResponse<ResponsePostTaskType<TaskType>>>

        (`todo-lists/${todoListIdTask}/tasks`, {title: taskTitle})
    },

    updateTask(todoListId: string, taskId: string, taskTitle: { description: null; title: string; priority: number; deadline: null; startDate: null; status: TaskStatuses }) {
        return instanceTask.put<UpdateTaskType>

        (`todo-lists/${todoListId}/tasks/${taskId}`, {title: taskTitle})
    },

    updateCheckTask(todoListId: string, taskId: string, status: { description: null; title: string; priority: number; deadline: null; startDate: null; status: TaskStatuses }) {
        return instanceTask.put<ResponseChangeTaskType, UpdateTaskType>

        (`todo-lists/${todoListId}/tasks/${taskId}`, {status: status})
    },

    deleteTask(todoListId: string, taskId: string) {
        return instanceTask.delete<DeleteTaskType>

        (`todo-lists/${todoListId}/tasks/${taskId}`)
    },
}