(async () => {
  try {
    // Faz a requisição sem setar Authorization
    // O cookie será enviado automaticamente pelo navegador
    const res = await fetch("/delete", {
      method: "GET",
      credentials: "include", // essencial para enviar cookies
    });

    if (!res.ok) {
      // Se não conseguir acessar, volta para login
      window.location.href = "/login.html";
      return;
    }

    const resultDiv = document.getElementById("result");

    // Botão para voltar ao home
    document.getElementById("homeBtn").addEventListener("click", () => {
      window.location.href = "/home";
    });

    // Deletar usuário
    document
      .getElementById("deleteForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("userId").value;

        try {
          const response = await fetch(`/delete/${id}`, {
            method: "DELETE",
            cache: "no-store",
            credentials: "include",
          });

          const data = await response.json();

          if (response.ok) {
            resultDiv.innerHTML = `<p style="color:#28a745; font-weight:bold;">${data.message}</p>`;
          } else {
            resultDiv.innerHTML = `<p style="color:#ff4b2b; font-weight:bold;">Erro: ${data.error}</p>`;
          }

          resultDiv.style.display = "block";
        } catch (err) {
          console.error(err);
          resultDiv.innerHTML =
            "<p style='color:#ff4b2b; font-weight:bold;'>Erro ao deletar usuário.</p>";
          resultDiv.style.display = "block";
        }
      });
  } catch (err) {
    console.error("Erro ao acessar /delete:", err);
    window.location.href = "/login.html";
  }
})();
