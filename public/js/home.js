(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  const res = await fetch("/home", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    const text = await res.text();
    document.getElementById("welcome").innerText = text;
  } else {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
})();
