import {todolistAPI, TodoType} from "../API/todolists-api"
import {Dispatch} from "redux";
import {TodoListType} from "../App";


type filterTaskAT = ReturnType<typeof filterTaskAC>
type removeTodolistAT = ReturnType<typeof removeTodolistAC>
type addTodoListAT = ReturnType<typeof addTodoListAC>
export type changeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type setTodoListsAT = ReturnType<typeof setTodoListsAC>


export type AppActionsType =
    | filterTaskAT
    | removeTodolistAT
    | addTodoListAT
    | changeTodoListTitleAT
    | setTodoListsAT

const initialState: TodoListType[] = []

export type wordFilter = "All" | "Active" | "Completed"
export type TodoDomainType = TodoListType & {
    filter: wordFilter
}

export const todoListReducer = (state: TodoListType[] = initialState, action: AppActionsType): TodoListType[] => {

    switch (action.type) {
        case "FILTER-TASK":
            return state.map(tl => action.payload.todoId === tl.id ? {...tl, filter: action.payload.filter} : tl)

        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoId)

        case "ADD-TODOLIST":
            let newTodoList: TodoDomainType = {...action.payload.todoList, filter: "All"}
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
export const setTodoListsAC = (todoLists: TodoType[]) => {
    return {
        type: 'SET-TODO-LISTS',
        payload: {
            todoLists
        }
    } as const
}
export const addTodoListAC = (todoList: TodoType) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todoList,
        }
    } as const
}
export const changeTodoListTitleAC = (todoId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todoId,
            title
        }
    } as const
}
export const removeTodolistAC = (todoId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todoId,
    } as const
}


//Thunks
export const fetchTodoListsTС = () => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}
export const createTodoListTС = (title: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.createTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
            })
    }
}
export const updateTodoListTС = (todoId: string, title: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {

        todolistAPI.updateTodoList(todoId, title)
            .then((res) => {
                dispatch(changeTodoListTitleAC(todoId, title))
            })
    }
}
export const removeTodoListsTС = (todoListId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.deleteTodoList(todoListId)
            .then((res) => {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}
//по удалению тудулиста. thunk пытается вызвать midlware, но это функция которая нам вернула другую функцию
//а вторую функцию уже ни кто не запустил, а на второй функции как раз и пошел вызов на удаление тудулиста
//поэтому если мы получаем тудулисты и не нужно передавать ни какие параметры, делаем вызов TC который будет намм
// возвращать thunk - эта санка будет попадать в диспатч и диспатчится будет уже санка и midlware будет вызывать
//уже thunk. Даже если мы не передаем ни какие параметры, всеравно необходимо обернуть thunk в TC








