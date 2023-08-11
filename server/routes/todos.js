const router = require("express").Router()
const fs = require("fs");

const readTodos = () => {
    let todos = fs.readFileSync("./data/todos.json")
    todos = JSON.parse(todos);
    return todos
}

const pushNewTodo = (newObj) => {
    let todoList = readTodos();
    todoList.push(newObj)
    fs.writeFileSync("./data/todos.json", JSON.stringify(newObj))
}


const postTodos = (req, res) => {
    const {data} = req.body
}

router.get("/", (req, res) => {
    const todoList = readTodos()
    res.status(200).json(todoList)
})
.post("/", (req, res) => {

})

module.exports = router