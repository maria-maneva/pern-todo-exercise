import pool from "./db";
import { ICategory, ITodo } from "./interfaces";

export const purgeUnusedCategories = async () => {
  const categories = await pool.query("SELECT * FROM category");
  const todos = await pool.query("SELECT * FROM todo");

  return Promise.all(
    categories.rows.map(async (category: ICategory) => {
      const isCategoryUsed =
        todos.rows.findIndex(
          (todo: ITodo) =>
            todo.category_ids.findIndex((c_id) => c_id === category.cat_id) > -1
        ) > -1;

      if (!isCategoryUsed) {
        return await pool.query("DELETE FROM category WHERE cat_id = $1", [
          category.cat_id,
        ]);
      }
      return;
    })
  );
};

export const processCategoryInput = async (categoryNamesArray: string[]) => {
  let newCategories: ICategory[] = [];
  const oldCategories: ICategory[] = [];

  const categoriesResult = await pool.query("SELECT * FROM category");

  categoryNamesArray.forEach((cat_name) => {
    const catResultIndex = categoriesResult.rows.findIndex(
      (c: ICategory) => c.cat_name === cat_name
    );

    if (catResultIndex === -1) {
      newCategories.push({
        cat_name,
      });
    } else {
      oldCategories.push(categoriesResult.rows[catResultIndex]);
    }
  });

  if (newCategories.length) {
    // insert new categories into 'category table
    // add cat_id
    newCategories = await Promise.all(
      newCategories.map(async (cat) => {
        const cat_id = await pool.query(
          "INSERT INTO category (cat_name) VALUES($1) RETURNING *",
          [cat.cat_name]
        );
        return {
          ...cat,
          cat_id: cat_id.rows[0].cat_id,
        };
      })
    );
  }

  return newCategories.length
    ? [...oldCategories, ...newCategories]
    : oldCategories;
};
