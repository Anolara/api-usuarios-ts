// login.js

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    // 1️⃣ Faz o login
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    // 2️⃣ Salva o token
    const token = data.token;
    localStorage.setItem("token", token);

    // 3️⃣ Busca o HTML de /home enviando o token
    const homeRes = await fetch("/home", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const homeHTML = await homeRes.text();

    // 4️⃣ Abre o HTML no browser
    document.open();
    document.write(homeHTML);
    document.close();
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
});
document.getElementById("registerBtn").addEventListener("click", () => {
  window.location.href = "/register.html";
});
