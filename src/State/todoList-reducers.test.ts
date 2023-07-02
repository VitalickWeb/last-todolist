import {setTodoListsAC, todoListReducer} from './todoList-reducers'
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
    const endState = todoListReducer(startStateTodo, {type: "REMOVE-TODOLIST", todoId: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
})

test('correct todo-lists should be set', () => {
    const action = setTodoListsAC(startStateTodo);

    const endState = todoListReducer([], action)

    expect(endState.length).toBe(2)
})