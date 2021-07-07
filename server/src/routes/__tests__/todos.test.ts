import ExpressApp from "./../../app";
import request from "supertest";
import { ITodo } from "interfaces";

const root = "/todos";
const data = { description: "test-description", categories: ["test"] };

afterEach(async () => {
  const response = await request(ExpressApp).get(`${root}/`);
  const testTodos = response.body.filter((todo: ITodo) => {
    todo.description === data.description;
  });
  await Promise.all(
    testTodos.map(async (todo: ITodo) => {
      await request(ExpressApp).delete(`${root}/${todo.todo_id}`);
    })
  );
});

describe(`GET ${root}/`, () => {
  test("should respond with 200 status code", async () => {
    const response = await request(ExpressApp).get(`${root}/`);
    expect(response.statusCode).toBe(200);
  });
});

describe(`POST ${root}/`, () => {
  test("should respond with 200 status code", async () => {
    const response = await request(ExpressApp).post(`${root}/`).send(data);
    expect(response.statusCode).toBe(200);
  });

  test("should specify json in content type header", async () => {
    const response = await request(ExpressApp).post(`${root}/`).send(data);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("response returns created todo's id", async () => {
    const response = await request(ExpressApp).post(`${root}/`).send(data);
    expect(response.body.todo_id).toBeDefined();
  });

  test("returns an error for incorrect input", async () => {
    const response = await request(ExpressApp).post(`${root}/`).send("");
    expect(response.statusCode).toBe(400);
  });
});

describe(`GET ${root}/:id`, () => {
  test("should respond with 200 status code and todo data", async () => {
    const todoResponse = await request(ExpressApp).post(`${root}/`).send(data);
    const { todo_id } = todoResponse.body;
    const response = await request(ExpressApp)
      .get(`${root}/${todo_id}`)
      .send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.todo_id).toBe(todo_id);
  });

  test("should respond with 404 when no todo is found", async () => {
    const response = await request(ExpressApp).get(`${root}/abcd`);
    expect(response.statusCode).toBe(404);
  });
});

describe(`PUT ${root}/:id`, () => {
  test("should respond with 200 status code", async () => {
    const descUpdated = "description updated";
    const todoResponse = await request(ExpressApp).post(`${root}/`).send(data);
    const { todo_id } = todoResponse.body;
    const response = await request(ExpressApp)
      .put(`${root}/${todo_id}`)
      .send({ description: descUpdated });

    expect(response.statusCode).toBe(200);
  });
  test("should respond with status code 404 for bad or missing id", async () => {
    const testUrls = ["", "abc"];
    testUrls.forEach(async (url) => {
      const response = await request(ExpressApp)
        .put(`${root}/${url}`)
        .send({ description: "" });

      expect(response.statusCode).toBe(404);
    });
  });
});

describe(`DELETE ${root}/:id`, () => {
  test("should respond with 200 status code", async () => {
    const todoResponse = await request(ExpressApp).post(`${root}/`).send(data);
    const { todo_id } = todoResponse.body;
    const response = await request(ExpressApp).delete(`${root}/${todo_id}`);
    expect(response.statusCode).toBe(200);
  });

  test("should respond with 404 status code if missing or unexisting id", async () => {
    const ids = ["", "abc"];
    await Promise.all(
      ids.map(async (id) => {
        const response = await request(ExpressApp).delete(`${root}/${id}`);
        expect(response.statusCode).toBe(404);
      })
    );
  });
});
