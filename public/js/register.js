const registerForm = document.getElementById("registerForm");

// Cria a div de mensagem e adiciona ao final do form
const messageDiv = document.createElement("div");
messageDiv.classList.add("message"); // classe base do CSS
registerForm.appendChild(messageDiv);

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = registerForm.name.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      messageDiv.className = "message success"; // aplica estilo de sucesso
      messageDiv.innerText = `User registered successfully!`;
    } else {
      messageDiv.className = "message error"; // aplica estilo de erro
      messageDiv.innerText = data.error;
    }

    messageDiv.style.display = "block";

    // Remove a mensagem após 10 segundos
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 10000);
  } catch (err) {
    console.error(err);
    messageDiv.className = "message error";
    messageDiv.innerText = "Something went wrong";
    messageDiv.style.display = "block";

    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 3000);
  }

  registerForm.reset();
});
