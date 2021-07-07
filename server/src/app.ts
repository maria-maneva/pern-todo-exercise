import { default as express, Request, Response } from "express";
import todosRoutes from "./routes/todos";
import categoriesRoutes from "./routes/categories";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to PERN tutorial api");
});
app.use("/todos", todosRoutes);
app.use("/categories", categoriesRoutes);

export default app;
