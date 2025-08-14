import express from "express";
import userRoutes from "./routes/users.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url); //import.meta.url pega a url do caminho do arquivo atual, a função fileURLToPath transforma em caminho normal.
const __dirname = path.dirname(__filename); //pega a pasta do caminho acima
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: true }));    
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/users", userRoutes);






export default app;