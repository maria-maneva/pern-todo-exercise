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
  try {
    const { description, categories } = req.body;

    // test expensive calculations with either child_process or worker_thread
    // invokePurgeCategoriesChildProcess();

    // const combinedCategories = await invokeProcessCategoriesChildProcess(
    //   categories
    // );
    const combinedCategories = await invokeProcessCategoriesWorker(categories);

    const newTodo = await pool.query(
      "INSERT INTO todo (description, category_ids) VALUES($1, $2)",
      [description, combinedCategories.map((c) => c.cat_id)]
    );

    // test expensive calculations with either child_process or worker_thread
    // invokePurgeCategoriesChildProcess();
    invokePurgeCategoriesWorker();

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(503).json({ error });
  }
});

//get a todo
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id=$1`, [id]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(503).json({ error });
  }
});

//update a todo
route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, categories } = req.body;

    const combinedCategories = await invokeProcessCategoriesChildProcess(
      categories
    );

    await pool.query(
      "UPDATE todo SET description = $1, category_ids = $2 WHERE todo_id = $3",
      [description, combinedCategories.map((c) => c.cat_id), id]
    );

    // invokePurgeCategoriesChildProcess();
    invokePurgeCategoriesWorker();

    res.json("Todo was updated");
  } catch (error) {
    console.error(error);
    res.status(503).json({ error });
  }
});

//delete a todo
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error);
    res.status(503).json({ error });
  }
});

export default route;
