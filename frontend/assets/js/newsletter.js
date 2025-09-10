document.addEventListener("DOMContentLoaded", () => {
  const observeFooter = new MutationObserver(() => {
    const form = document.getElementById("newsletterForm");
    if (form) {
      setupNewsletter();
      observer.disconnect();
    }
  });

  const observer = observeFooter;
  observer.observe(document.body, { childList: true, subtree: true });
});

function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      message.textContent = data.message;
      message.className = res.ok
        ? "text-green-600 text-sm mt-1"
        : "text-red-600 text-sm mt-1";
      if (res.ok) emailInput.value = "";
    } catch {
      message.textContent = "Lỗi khi kết nối đến máy chủ!";
      message.className = "text-red-600 text-sm mt-1";
    }
  });
}
