import React, { useEffect, useCallback } from "react";
import { getTodos, deleteTodo } from "requests";
import { useDataState, useDataDispatch } from "hooks";
import { setTodos } from "store/data.actions";
import EditTodo from "./EditTodo";

interface IListTodosProps {}

const ListTodos: React.FC<IListTodosProps> = () => {
  const { todos } = useDataState();
  const dataDispatch = useDataDispatch();

  const updateTodos = useCallback(async () => {
    const data = await getTodos();
    dataDispatch(setTodos(data));
  }, [dataDispatch]);

  useEffect(() => {
    updateTodos();
  }, [updateTodos]);

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    updateTodos();
  };

  return (
    <>
      <table className="table text-start align-middle mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Categories</th>
            <th scope="col" className="text-right">
              Edit
            </th>
            <th scope="col" className="text-right">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                {todo.categories?.length
                  ? todo?.categories.map((category) => (
                      <span className="badge rounded-pill bg-info text-dark">
                        {category.cat_name}
                      </span>
                    ))
                  : ""}
              </td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  onClick={() => handleDelete(todo.todo_id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
