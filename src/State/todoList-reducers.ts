import {TodoListType, wordFilter} from "../App";
import {Dispatch} from "redux";
import {todolistAPI} from "../API/todolists-api";


type filterTaskAT = ReturnType<typeof filterTaskAC>
type removeTodolistAT = ReturnType<typeof removeTodolistAC>
type addTodoListAT = ReturnType<typeof addTodoListAC>
export type changeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type setTodoListsAT = ReturnType<typeof setTodoListsAC>

export type actionsType =
    | filterTaskAT
    | removeTodolistAT
    | addTodoListAT
    | changeTodoListTitleAT
    | setTodoListsAT

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: actionsType): Array<TodoListType> => {

    switch (action.type) {
        case "FILTER-TASK":
            return state.map(tl => action.payload.todoId === tl.id ? {...tl, filter: action.payload.filter} : tl)

        case "REMOVE-TODOLIST":
            console.log(state, action)
            return state.filter(tl => tl.id !== action.payload.todoId)

        case "ADD-TODOLIST":
            let newTodoList: TodoListType = {id: action.payload.todoListID, title: action.payload.title, filter: "all"}
            return [newTodoList, ...state]

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id ? {...tl, title: action.payload.title} : tl)

        case 'SET-TODO-LISTS':
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all'}))

        default:
            return state
    }
}

export const filterTaskAC = (todoId: string, filter: wordFilter) => {
    return {
        type: "FILTER-TASK",
        payload: {
            todoId,
            filter,
        }
    } as const
}

export const removeTodolistAC = (todoId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todoId,
        }
    } as const
}

export const addTodoListAC = (todoListID: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todoListID,
            title,
        }
    } as const
}

export const changeTodoListTitleAC = (todoId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title,
            todoId
        }
    } as const
}

export const setTodoListsAC = (todoLists: Array<TodoListType>) => {
    return {
        type: 'SET-TODO-LISTS',
        payload: {
            todoLists
        }
    } as const
}


//Thunks
export const fetchTodoListsTС = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodoLists('todo-lists')
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}








