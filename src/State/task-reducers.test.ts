import {addTaskAC, tasksReducer} from "./task-reducers"
import {TasksStateType} from "../App";
import {v1} from "uuid";

let testStateTask: TasksStateType

beforeEach( () => {
    testStateTask = {
        "todoListID1": [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        "todoListID2": [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "beer", isDone: true},
            {id: v1(), title: "cupcake", isDone: true},
            {id: v1(), title: "pasta", isDone: false},
        ],
    }
})

test("task should be added", () => {
    const action = addTaskAC("todoListID2", "car")
    const endState = tasksReducer(testStateTask, action)

    expect(endState["todoListID1"].length).toBe(4)
    expect(endState["todoListID2"].length).toBe(5)
    expect(endState["todoListID2"][1].id).toBeDefined()
    expect(endState["todoListID2"][1].title).toBe("car")
    expect(endState["todoListID2"][1].isDone).toBe(false)
})