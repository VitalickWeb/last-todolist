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
        return instance.post<ResponseType<{ item: TodoType }>>(`/todo-lists`, {title})
    },

    deleteTodoList(todoListID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListID}`)
    },

    updateTodoList(todoListID: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListID}`, {title})
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

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
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
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null
    deadline: null
}

export type TaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: TaskPriorities
    startDate: null
    status: TaskStatuses
    title: string
    todoListId: string
}

export type UpdateTaskModelType = {
    title: string
    deadline: null
    description: null
    priority: TaskPriorities
    startDate: null
    status: TaskStatuses
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

    updateTask(todoListId: string, taskId: string, taskTitle: UpdateTaskModelType) {
        return instanceTask.put<UpdateTaskModelType>

        (`todo-lists/${todoListId}/tasks/${taskId}`, taskTitle)
    },

    updateCheckTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instanceTask.put<ResponseChangeTaskType, UpdateTaskModelType>

        (`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },

    deleteTask(todoListId: string, taskId: string) {
        return instanceTask.delete<DeleteTaskType>

        (`todo-lists/${todoListId}/tasks/${taskId}`)
    },
}
