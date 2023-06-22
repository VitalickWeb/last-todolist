import {tasksReducer} from "./task-reducers"
import {todoListReducer} from "./todoList-reducers"
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))


//Первым параметром указывается аргумент state, вторым экстра аргумент, этот параметр может быть любым типом
//поэтому укажем any, третьим параметром указываем AnyAction
type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>()

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
