const router = require("express").Router();
const fs = require("fs");
const crypto = require("crypto");

const generateID = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

const readTodos = () => {
  let todos = fs.readFileSync("./data/todos.json");
  todos = JSON.parse(todos);
  return todos;
};

const pushNewTodo = (newObj) => {
  let todoList = readTodos();
  console.log;
  todoList.push(newObj);
  fs.writeFileSync("./data/todos.json", JSON.stringify(todoList));
};

const overideTodoList = (newList) => {
  fs.writeFileSync("./data/todos.json", JSON.stringify(newList));
};

const validatePost = (data) => {
  if (data.todo === "" || typeof data.checked !== "boolean") {
    return false;
  } else {
    return true;
  }
};

const doesExist = (id) => {
  const todoList = readTodos();
  const exist = todoList.find((item) => item.id === id);
  if (exist) {
    return true;
  } else {
    return false;
  }
};

const deleteTodo = (id) => {
  const todoList = readTodos();

  const newTodoList = todoList.filter((item) => item.id !== id);

  return newTodoList;
};

const updateTodo = (replacementObj, id) => {
  let todoList = readTodos();
  const newList = todoList.map((item) => {
    console.log(item);
    if (item.id === id) {
      console.log(replacementObj);
      return replacementObj;
    } else {
      return item;
    }
  });

  console.log(todoList);

  overideTodoList(newList);
};

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (doesExist(id) && validatePost(data)) {
    const replacementTodo = {
      ...data,
      id,
    };

    updateTodo(replacementTodo, id);
    res.status(200).json({ data: replacementTodo });
  } else {
    res.status(400).json({ data: { error: "Item does not exist" } });
  }
});

router
  .get("/", (req, res) => {
    const todoList = readTodos();
    res.status(200).json(todoList);
  })
  .post("/", (req, res) => {
    const { data } = req.body;
    const isValidPost = validatePost(data);

    if (isValidPost) {
      const postObj = {
        ...data,
        id: `${generateID(4)}`,
      };

      pushNewTodo(postObj);
      const newTodos = readTodos()
      res.status(201).json({ data: [...newTodos] });
    } else {
      res.status(400).json({ data: { error: "please send valid fields" } });
    }
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    if (doesExist(id)) {
      const newList = deleteTodo(id);
      overideTodoList(newList);
      res.status(200).json({ data: [...newList] });
    } else {
      res.status(400).json({ data: { error: "Item does not exist" } });
    }
  });
//   .put(
//     ("/:id",
//     (req, res) => {
//       const { id } = req.params;
//       const { data } = req.body;

//       if (doesExist(id) && validatePost(data)) {
//         const replacementTodo = {
//           ...data,
//           id,
//         };

//         updateTodo(replacementTodo, id);
//         res.status(200).json({ data: replacementTodo });
//       } else {
//         res.status(400).json({ data: { error: "Item does not exist" } });
//       }
//     })
//   );
module.exports = router;
