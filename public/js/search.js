document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "/home";
});

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("userId").value;
  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch(`/search/${id}`);
    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = `<p style="color:#ff4b2b; font-weight:bold;">Erro: ${data.error}</p>`;
      resultDiv.style.display = "block";
      return;
    }

    resultDiv.innerHTML = `
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
    `;
    resultDiv.style.display = "block";
  } catch (err) {
    resultDiv.innerHTML =
      "<p style='color:#ff4b2b; font-weight:bold;'>Erro ao buscar usuário.</p>";
    resultDiv.style.display = "block";
  }
});
