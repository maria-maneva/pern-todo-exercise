import ExpressApp from "./app";
import request from "supertest";

describe("GET /", () => {
  test("should return 200", async () => {
    const response = await request(ExpressApp).get("/");
    expect(response.statusCode).toBe(200);
  });
});
