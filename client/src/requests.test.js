import * as Requests from "./requests";

test("successfully makes a request to get categories", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ cat_name: "name", cat_id: 1 }]),
    })
  );
  const categories = await Requests.getCategories();
  expect(categories.length).toEqual(1);
});

test("successfully makes a request to get todos", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ todo_id: 1, description: "test" }]),
    })
  );
  const todos = await Requests.getTodos();
  expect(todos.length).toEqual(1);
});

test("successfully makes a request to delete a todo", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve("Todo was deleted"),
    })
  );

  await expect(Requests.deleteTodo(1)).resolves.not.toThrow();
});
