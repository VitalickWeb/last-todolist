import {addTodoListAC, removeTodolistAC, setTodoListsAT} from "./todoList-reducers";
import {Dispatch} from "redux";
import {taskAPI, TaskType} from "../API/todolists-api";
import {AppRootStateType} from "./store";


type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type updateTaskAT = ReturnType<typeof updateTaskAC>
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodoListAT = ReturnType<typeof addTodoListAC>
type setTasksAT = ReturnType<typeof setTasksAC>
type createTaskAT = ReturnType<typeof createTaskAC>
type deleteTaskAT = ReturnType<typeof deleteTaskAC>

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

type ActionsType =
    | removeTodolistAT
    | addTodoListAT
    | setTodoListsAT

    | changeTaskStatusAT
    | setTasksAT
    | createTaskAT
    | deleteTaskAT
    | updateTaskAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "CREATE-TASK":
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId], action.task]
            }
        case "DELETE-TASK":
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId]].filter(t => t.id !== action.task)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoId]: [...state[action.todoId]].map(t => t.id === action.taskId
                    ? {...t, isDone: action.statusTask} : t)
            }
        case "UPDATE-TASK-TITLE":
            return {
                ...state,
                [action.todoId]: [...state[action.todoId]].map(t => t.id === action.taskId
                    ? {...t, title: action.newTitle} : t)
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoId]
            return copyState

        case "ADD-TODOLIST":
            return {...state, [action.payload.todoList.id]: []}

        case 'SET-TODO-LISTS':
            let copyState2 = {...state}
            action.payload.todoLists.forEach(tl => {
                copyState2[tl.id] = []
            })
            return copyState2

        case "SET-TASKS":
            let copyState3 = {...state}
            copyState3[action.todoListId] = action.tasks
            return copyState3

        default:
            return state
    }
}



export const setTasksAC = (tasks: TaskType[], todoListId: string ) => {
    return {
        type: "SET-TASKS",
        tasks,
        todoListId,
    } as const
}
export const createTaskAC = (task: TaskType, todoListId: string ) => {
    return {
        type: "CREATE-TASK",
        task,
        todoListId,
    } as const
}
export const deleteTaskAC = (todoListId: string, task: string) => {
    return {
        type: "DELETE-TASK",
        todoListId,
        task,
    } as const
}

export const updateTaskAC = (todoId: string, taskId: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        todoId,
        taskId,
        newTitle,
    } as const
}

export const changeTaskStatusAC = (todoId: string, taskId: string, statusTask: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        todoId,
        taskId,
        statusTask,
    } as const
}
//Thunks
export const setTasksTС = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTask(todoListId)
            .then((response) => {
                dispatch(setTasksAC(response, todoListId))
            })
    }
}

export const createTaskTС = (title: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todoListId, title)
            .then((response) => {
                dispatch(createTaskAC(response.data.data.item, todoListId))
            })
    }
}

export const deleteTaskTС = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoListId, taskId)
            .then((response) => {
                dispatch(deleteTaskAC(todoListId, taskId))
            })
    }
}

// export const updateTaskTС = (todoListId: string, taskId: string, newTitle: string) => {
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const task = getState().tasks[todoListId].find((t) => t.id === taskId)
//
//         if (task) {
//             taskAPI.updateTask(todoListId, taskId, {
//                 title: task.title,
//                 startDate: task.startDate,
//                 priority: task.priority,
//                 description: task.description,
//                 deadline: task.deadline,
//                 status: task.status
//             }).then((response) => {
//                 const action = updateTaskAC(todoListId, taskId, newTitle)
//                 dispatch(action)
//             })
//         }
//     }
// }

// Обратите внимание, что в санку кроме dispatch вторым параметром приходит ещё и функция getState,
// с помощью которой санка может достучаться ко всему стейту целиком: getState: () => AppRootStateType

export const updateTaskStatusTC = (taskId: string, todoListId: string, status: boolean) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        // debugger
// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
// чтобы у неё отобрать остальные св-ва

        const task = getState().tasks[taskId].find((t) => t.id === taskId)

        if (task) {
            taskAPI.updateCheckTask(todoListId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, todoListId, status)
                dispatch(action)
            })
        }
    }
}