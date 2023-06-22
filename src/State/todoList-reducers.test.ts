import {todoListReducer} from './todoList-reducers'
import {v1} from 'uuid'
import {TodoListType} from '../App'

let todolistId1: string
let todolistId2: string
let startStateTodo: TodoListType[]

beforeEach( () => {
    todolistId1 = v1()
    todolistId2 = v1()

    startStateTodo = <TodoListType[]>[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startStateTodo, {type: "REMOVE-TODOLIST", payload: {todoId: todolistId1}})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todo-lists should be set', () => {
    const endState = todoListReducer(startStateTodo, {type: "SET-TODO-LISTS", payload: {todoLists: startStateTodo}})

    expect(endState.length).toBe(2)
    // expect(endState[0].id).toBe(todolistId2)
})