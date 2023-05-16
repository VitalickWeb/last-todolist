import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodolistAC} from "./todoList-reducers";

type addTaskAT = ReturnType<typeof addTaskAC>
type removeTaskAT = ReturnType<typeof removeTaskAC>
type checkedUncheckedTaskAT = ReturnType<typeof checkedUncheckedTaskAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodoListAT = ReturnType<typeof addTodoListAC>

export type ActionsType = addTaskAT
                        | removeTaskAT
                        | checkedUncheckedTaskAT
                        | changeTaskTitleAT
                        | removeTodolistAT
                        | addTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            let task = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId], task]
            }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId]].filter(t => t.id !== action.payload.taskId)
            }
        case "CHECK-UNCHECK-TASK":
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId]].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.statusTask} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoId]: [...state[action.payload.todoId]].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoId]
            return copyState

        case "ADD-TODOLIST":
            return {...state, [action.payload.todoListID]: []}

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