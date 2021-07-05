import React, { useState, FormEvent, useEffect } from "react";
import { apiUrl } from "config";
import CategoryList from "components/CategoryList/CategoryList";
import { mapCategoriesByName } from "utils";
import { useDataState } from "hooks";
import { ICategory } from "interfaces";

interface IInputTodoProps {}

const InputTodo: React.FC<IInputTodoProps> = () => {
  const { categories } = useDataState();
  const [description, setDescription] = useState("");
  const [controlledCategories, setControlledCategories] = useState<ICategory[]>(
    []
  );

  useEffect(() => {
    setControlledCategories(categories);
  }, [categories]);

  const onSumbmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = {
        description,
        categories: mapCategoriesByName(controlledCategories),
      };
      const response = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      // nice way to reset form etc after successful submit
      window.location.pathname = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div data-testid="input-form">
      <h6 className="mt-5">Add to do:</h6>
      <form onSubmit={onSumbmitForm} className="d-flex flex-column ">
        <input
          type="text"
          className="form-control"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="description-input"
        />
        <CategoryList
          categories={controlledCategories}
          handleCategoryChange={setControlledCategories}
        />

        <button className={`btn btn-primary ${!description && "disabled"}`}>
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
