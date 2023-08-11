const router = require("express").Router()
const fs = require("fs");

const readTodos = () => {
    let todos = fs.readFileSync("./data/todos.json")
    todos = JSON.parse(todos);
    return todos
}

console.log(readTodos())
router.get("/", (req, res) => {
    const todoList = readTodos()
    res.status(200).json({data: "hello world"})
})

module.exports = router