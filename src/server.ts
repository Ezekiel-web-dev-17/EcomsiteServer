import express from "express";
import { PORT } from "./config/env.config";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./database/db.connect";
import { userRouter } from "./routes/user.route";
import authorize from "./middlewares/user.middleware";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.send("Hello from TypeScript Express Server! API IS RUNNING!!!");
});

app.use("api/v1/user", userRouter);

app.use(authorize);

// error route
app.use("/", (req, res) => {
  res.status(404).json({ success: false, message: "ROUTE NOT FOUND" });
});

app.listen(PORT, () => {
  console.log("Connecting server to database...");
  dbConnect();
  console.log(`Server running on http://localhost:${PORT}`);
});
