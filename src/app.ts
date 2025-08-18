import express from "express";
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";
import logoutRoutes from "./routes/logout.js";
import searchRoutes from "./routes/search.js";
import deleteRoutes from "./routes/delete.js";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "./middlewares/loginMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

const __filename = fileURLToPath(import.meta.url); //import.meta.url pega a url do caminho do arquivo atual, a função fileURLToPath transforma em caminho normal.
const __dirname = path.dirname(__filename); //pega a pasta do caminho acima
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/private", (req, res) => {
  res.redirect("/token-missing.html");
});
app.get("/home", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../private/home.html"));
});

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/search", searchRoutes);
app.use("/delete", deleteRoutes);


/*app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});*/

export default app;
