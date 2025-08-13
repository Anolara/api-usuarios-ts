import app from "./app.js";  // IMPORTANTE: aqui tem que ter a extensão .js

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
