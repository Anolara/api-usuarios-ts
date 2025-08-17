(async () => {
  try {
    // Faz a requisição sem setar Authorization
    // O cookie será enviado automaticamente pelo navegador
    const res = await fetch("/home", {
      method: "GET",
      credentials: "include", // essencial para enviar cookies
    });

    if (res.ok) {
      const text = await res.text();
      document.getElementById("welcome").innerText = text;
    } else {
      // Token inválido ou ausente, redireciona para login
      window.location.href = "/login.html";
    }
  } catch (err) {
    console.error("Erro ao acessar /home:", err);
    window.location.href = "/login.html";
  }
})();
