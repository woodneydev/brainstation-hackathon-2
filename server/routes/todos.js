const router = require("express").Router()
const fs = require("fs");
const crypto = require("crypto");

const generateID = (length) => {
    return crypto.randomBytes(length).toString("hex");
}

const readTodos = () => {
    let todos = fs.readFileSync("./data/todos.json")
    todos = JSON.parse(todos);
    return todos
}

const pushNewTodo = (newObj) => {
    let todoList = readTodos();
    console.log
    todoList.push(newObj)
    fs.writeFileSync("./data/todos.json", JSON.stringify(todoList))
}

const overideTodoList = (newList) => {
    fs.writeFileSync("./data/todos.json", JSON.stringify(newList))
}

const validatePost = (data) => {
    if (data.todo === "" || typeof data.checked !== "boolean") {
        return false
    } else {
        return true
    }
}

const doesExist = (id) => {
    const todoList = readTodos();
    const exist = todoList.find(item => item.id === id)
    if (exist) {
        return true
    } else {
        return false
    }
}

const deleteTodo = (id) => {
    const todoList = readTodos();

    const newTodoList = todoList.filter(item => item.id !== id)

    return newTodoList
}

router.get("/", (req, res) => {
    const todoList = readTodos()
    res.status(200).json(todoList)
})
.post("/", (req, res) => {
    const {data} = req.body
    console.log("incoming request post", data)
    const isValidPost = validatePost(data)

    if(isValidPost) {
        const postObj = {
            ...data,
            id: `${generateID(4)}`
        }

        pushNewTodo(postObj)
        res.status(201).json({data: postObj})
    } else {
        res.status(400).json({data: {error: "please send valid fields"}})
    }
})
.delete("/:id", (req, res) => {
    const {id} = req.params
    if (doesExist(id)) {
        const newList = deleteTodo(id)
        overideTodoList(newList)
        res.status(200).json({data: "Resource was deleted"})
    } else {
        res.status(400).json({data: {error: "Item does not exist"}})
    }
})
module.exports = router