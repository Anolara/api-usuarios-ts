import express from "express";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/users", userRoutes);




export default app;