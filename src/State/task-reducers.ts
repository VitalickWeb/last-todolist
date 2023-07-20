import {addTodoListAC, removeTodolistAC, setTodoListsAT} from "./todoList-reducers";
import {Dispatch} from "redux";
import {taskAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../API/todolists-api";
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

export type AppActionsType =
    | removeTodolistAT
    | addTodoListAT
    | setTodoListsAT

    | changeTaskStatusAT
    | setTasksAT
    | createTaskAT
    | deleteTaskAT
    | updateTaskAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AppActionsType): TasksStateType => {
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
            console.log(action)
            return {
                ...state,
                [action.todoId]: [...state[action.todoId]].map(t => t.id === action.taskId
                    ? {...t, status: action.statusTask} : t)
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

//actions
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
export const changeTaskStatusAC = (todoId: string, taskId: string, statusTask: TaskStatuses) => {
    return {
        type: "CHANGE-TASK-STATUS",
        todoId,
        taskId,
        statusTask,
    } as const
}

//thunks
export const setTasksTС = (todoListId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        taskAPI.getTask(todoListId)
            .then((response) => {
                dispatch(setTasksAC(response, todoListId))
            })
    }
}
export const createTaskTС = (title: string, todoListId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        taskAPI.createTask(todoListId, title)
            .then((response) => {
                dispatch(createTaskAC(response.data.data.item, todoListId))
            })
    }
}
export const deleteTaskTС = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        taskAPI.deleteTask(todoListId, taskId)
            .then((response) => {
                dispatch(deleteTaskAC(todoListId, taskId))
            })
    }
}
export const updateTaskTС = (todoListId: string, taskId: string, newTitle: string) => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListId].find((t) => t.id === taskId)

        if (task) {
            taskAPI.updateTask(todoListId, taskId, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then((response) => {
                const action = updateTaskAC(todoListId, taskId, newTitle)
                dispatch(action)
            })
        }
    }
}
export const updateTaskStatusTC = (todoId: string, taskId: string, statusTask: TaskStatuses) => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
        // debugger
// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
// чтобы у неё отобрать остальные св-ва

        const task = getState().tasks[todoId].find((t) => t.id === taskId)

        if (!task) {
            console.log('task not found in the state');
            return;
        }
        //все свойства которые мы не хотим менять оставляем как есть, а то что нужно status: statusTask меняем
        const model: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: statusTask
        }

        taskAPI.updateCheckTask(todoId, taskId, model).then(() => {
            const action = changeTaskStatusAC(todoId, taskId, statusTask)
            dispatch(action)
        })
    }
}
// Обратите внимание, что в санку кроме dispatch вторым параметром приходит ещё и функция getState,
//с помощью которой санка может достучаться ко всему стейту целиком: getState: () => AppRootStateType

