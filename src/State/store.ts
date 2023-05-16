import {tasksReducer} from "./task-reducers"
import {todoListReducer} from "./todoList-reducers"
import {combineReducers, legacy_createStore} from "redux";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store



//после работы функции legacy_createStore(rootReducer) родится следующий store
// {
//     state: {
//         tasks: {}
//         todoLists: []
//     }
//     getState()
//     dispatch()
//     subscribe()
// }
