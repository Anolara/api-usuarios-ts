(async () => {
  try {
    // Faz a requisição sem setar Authorization
    // O cookie será enviado automaticamente pelo navegador
    const res = await fetch("/home", {
      method: "GET",
      credentials: "include", // essencial para enviar cookies
    });

    if (res.ok) {

      document.getElementById("logoutBtn").addEventListener("click", async () => {
        await fetch("/logout", {
          method: "POST",
          credentials: "include",
        });
        window.location.href = "/login.html";
      });

      document.getElementById("logoutBtn").addEventListener("click", async () => {
        await fetch("/logout", {
          method: "POST",
          credentials: "include",
        });
        window.location.href = "/login.html";
      });
    } else {
      // Token inválido ou ausente, redireciona para login
      window.location.href = "/login.html";
    }
  } catch (err) {
    console.error("Erro ao acessar /home:", err);
    window.location.href = "/login.html";
  }
})();
