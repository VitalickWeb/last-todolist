import {addTodoListAC, removeTodolistAC, setTodoListsAT} from "./todoList-reducers";
import {Dispatch} from "redux";
import {taskAPI, TaskType} from "../API/todolists-api";


// type addTaskAT = ReturnType<typeof addTaskAC>
// type removeTaskAT = ReturnType<typeof removeTaskAC>
type checkedUncheckedTaskAT = ReturnType<typeof checkedUncheckedTaskAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodoListAT = ReturnType<typeof addTodoListAC>
type setTasksAT = ReturnType<typeof setTasksAC>
type createTaskAT = ReturnType<typeof createTaskAC>
type deleteTaskAT = ReturnType<typeof deleteTaskAC>

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

type ActionsType =
    // | addTaskAT
    // | removeTaskAT
    | checkedUncheckedTaskAT
    | changeTaskTitleAT
    | removeTodolistAT
    | addTodoListAT
    | setTodoListsAT
    | setTasksAT
    | createTaskAT
    | deleteTaskAT

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
        case "CHECK-UNCHECK-TASK":
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId]].map(t => t.id === action.payload.taskId
                    ? {...t, isDone: action.payload.statusTask} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId]].map(t => t.id === action.payload.taskId
                    ? {...t, title: action.payload.newTitle} : t)
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoId]
            return copyState

        case "ADD-TODOLIST":
            return {...state, [action.payload.todoListID]: []}

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

export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoId,
            title,
        },
    } as const
}

export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoId,
            taskId,
        },
    } as const
}

export const checkedUncheckedTaskAC = (todoId: string, taskId: string, statusTask: boolean) => {
    return {
        type: "CHECK-UNCHECK-TASK",
        payload: {
            todoId,
            taskId,
            statusTask,
        },
    } as const
}

export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todoId,
            taskId,
            newTitle,
        },
    } as const
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

export const deleteTaskAC = (task: TaskType, todoListId: string ) => {
    return {
        type: "DELETE-TASK",
        task,
        todoListId,
    } as const
}

//Thunks
export const setTasksTС = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTask(todoListId)
            .then((response) => {
                dispatch(setTasksAC(response.data.items, todoListId))
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

export const deleteTaskTС = (title: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todoListId, title)
            .then((response) => {
                dispatch(createTaskAC(response.data.data.item, todoListId))
            })
    }
}