import React, { useEffect } from "react";
import InputTodo from "components/InputTodo";
import ListTodos from "components/ListTodos";
import { getCategories } from "requests";
import { useDataDispatch } from "hooks/useDataDispatch";
import { setCategories } from "store/data.actions";
import { ICategory } from "interfaces";
import { useDataState } from "hooks";

function App() {
  const dataDispatch = useDataDispatch();
  const state = useDataState();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      dataDispatch(setCategories(categories as ICategory[]));
    })();
  }, [dataDispatch]);

  return (
    <div className="App container">
      <h1 className="text-center mt-5">PERN (bootstrap) "To Do" List</h1>
      <InputTodo />
      <ListTodos />
    </div>
  );
}

export default App;
