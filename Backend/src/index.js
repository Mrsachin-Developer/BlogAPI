import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT} 🚀`);
});
