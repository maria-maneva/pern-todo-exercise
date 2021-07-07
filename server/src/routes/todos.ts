import express from "express";
import pool from "../db";
import { ITodo } from "../interfaces";
import {
  invokePurgeCategoriesChildProcess,
  invokeProcessCategoriesChildProcess,
} from "../child_processes";
import {
  invokePurgeCategoriesWorker,
  invokeProcessCategoriesWorker,
} from "../worker_threads";

const route = express.Router();

//get all todos
route.get("/", async (req, res) => {
  try {
    const allTodosResult = await pool.query(
      "SELECT * FROM todo ORDER BY created_at DESC"
    );

    const allTodos = await Promise.all(
      allTodosResult.rows.map(async (todo: ITodo) => {
        const { category_ids, todo_id, description } = todo;

        if (category_ids) {
          try {
            const categoriesResult = await pool.query(
              "SELECT * FROM category WHERE cat_id=ANY($1::int[])",
              [todo.category_ids]
            );
            return { todo_id, description, categories: categoriesResult.rows };
          } catch (error) {
            console.error(error);
          }
        }
        return { todo_id, description, categories: [] };
      })
    );

    res.json(allTodos);
  } catch (error) {
    console.error(error);
    res.status(503).json({ error });
  }
});

//create a todo
route.post("/", async (req, res) => {
  const { description, categories } = req.body;
  if (description) {
    try {
      // test expensive calculations with either child_process or worker_thread
      // invokePurgeCategoriesChildProcess();

      // const combinedCategories = await invokeProcessCategoriesChildProcess(
      //   categories
      // );
      const combinedCategories = categories
        ? await invokeProcessCategoriesWorker(categories)
        : [];

      const newTodo = await pool.query(
        "INSERT INTO todo (description, category_ids) VALUES($1, $2) RETURNING todo_id, description, category_ids",
        [description, combinedCategories?.map((c) => c.cat_id)]
      );

      invokePurgeCategoriesWorker();

      // test expensive calculations with either child_process or worker_thread
      // invokePurgeCategoriesChildProcess();
      res.json(newTodo.rows[0]);
    } catch (error) {
      console.error(111, error);
      res.status(503).json({ error });
    }
  } else {
    res.status(400).json({ error: "Missing description" });
  }
});

//get a todo
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id=$1`, [id]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Todo not found." });
  }
});

//update a todo
route.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { description, categories } = req.body;

  if (id) {
    try {
      const combinedCategories = categories
        ? await invokeProcessCategoriesChildProcess(categories)
        : [];

      await pool.query(
        "UPDATE todo SET description = $1, category_ids = $2 WHERE todo_id = $3",
        [description, combinedCategories.map((c) => c.cat_id), id]
      );

      // invokePurgeCategoriesChildProcess();
      invokePurgeCategoriesWorker();

      res.json({ status: "Todo was updated" });
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_MISSING_ARGS" || error.code === "22P02") {
        res.status(404).json({ error });
      } else {
        res.status(503).json({ error });
      }
    }
  } else {
    res.status(404).json({ error: "Todo not found." });
  }
});

//delete a todo
route.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ error: "Todo not found." });
  }
  try {
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ status: "Todo was deleted" });
  } catch (error) {
    if ((error.code = "22P02")) {
      res.status(404).send({ error: "Todo not found." });
    } else {
      console.log(error);
      res.status(503).json({ error });
    }
  }
});

export default route;
