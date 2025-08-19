(async () => {
  try {
    // Faz a requisição sem setar Authorization
    // O cookie será enviado automaticamente pelo navegador
    const res = await fetch("/search", {
      method: "GET",
      credentials: "include", // essencial para enviar cookies
    });

    if (!res.ok) {
      // Se não conseguir acessar, volta para login
      window.location.href = "/login.html";
      return;
    }
    document
      .getElementById("updateForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("userId").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
          const response = await fetch(`/update/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          const messageDiv = document.getElementById("message");

          if (!response.ok) {
            const errorData = await response.json();
            messageDiv.innerText = `Erro: ${errorData.error}`;
            messageDiv.style.color = "red";
            return;
          }

          const data = await response.json();
          messageDiv.innerText = `Usuário atualizado: ${data.name} (${data.email})`;
          messageDiv.style.color = "green";
        } catch (err) {
          console.error(err);
          document.getElementById("message").innerText =
            "Erro ao atualizar usuário.";
        }
      });
  } catch (err) {
    console.error("Erro ao acessar /search", err);
    window.location.href = "/login.html";
  }
})();
