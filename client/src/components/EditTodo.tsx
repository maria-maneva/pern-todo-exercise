import React, { useState, useEffect } from "react";
import { apiUrl } from "config";
import CategoryList from "./CategoryList/CategoryList";
import { mapCategoriesByName } from "utils";
import { ITodo, ICategory } from "interfaces";
import { useDataState } from "hooks";

interface IEditTodoProps {
  todo: ITodo;
}

const EditTodo = ({ todo }: IEditTodoProps) => {
  const { categories } = useDataState();
  const [description, setDescription] = useState(todo.description ?? "");
  const [controlledCategories, setControlledCategories] = useState<ICategory[]>(
    []
  );

  useEffect(() => {
    if (todo.categories) {
      setControlledCategories(
        categories.map((category) => {
          const selected =
            todo.categories &&
            todo.categories?.findIndex((c) => c.cat_id === category.cat_id) >
              -1;
          return { ...category, selected };
        })
      );
    }
  }, [todo.categories, categories]);

  const updateDescription = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const body = {
        description,
        categories: mapCategoriesByName(controlledCategories),
      };
      await fetch(`${apiUrl}/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      window.location.pathname = "/";
    } catch (error) {
      console.error(error.messsage);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="btn-close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body text-left">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <CategoryList
                categories={controlledCategories}
                handleCategoryChange={setControlledCategories}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline btn-outline-danger"
                data-dismiss="modal"
              >
                Dismiss
              </button>
              <button
                type="button"
                className={`btn btn-primary ${!description && "disabled"}`}
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
