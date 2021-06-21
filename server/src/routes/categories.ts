import express from "express";
import pool from "../db";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM category");

    res.json(allCategories.rows);
  } catch (error) {
    console.error(error);
    res.status(503).json({ error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM category WHERE cat_id = $1", [id]);
    res.json("Category was deleted");
  } catch (error) {
    console.error(error);
    res.status(503).json({ error });
  }
});

export default route;
