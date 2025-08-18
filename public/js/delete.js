const resultDiv = document.getElementById("result");

document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "/home";
});

// Deletar usuário
document.getElementById("deleteForm").addEventListener("submit", async (e) => {
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
