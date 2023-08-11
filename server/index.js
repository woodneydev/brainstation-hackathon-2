require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const todos = require("./routes/todos.js");
const PORT = process.env.PORT || 8081;


app.use(express.json());

app.use("/todos", todos)

app.listen(PORT, () => {
    console.log("Client is running on port ", PORT)
})
