document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("subscribeForm");
  const subscribeEmail = document.getElementById("subscribeEmail");
  const subscribeMessage = document.getElementById("subscribeMessage");

  if (!subscribeForm) return;

  subscribeForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = subscribeEmail.value.trim();

    if (!email) {
      subscribeMessage.textContent = "Vui lòng nhập email.";
      subscribeMessage.className = "text-red-600 text-sm text-center mt-3";
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (res.ok) {
        subscribeMessage.textContent = result.message;
        subscribeMessage.className = "text-green-600 text-sm text-center mt-3";
        subscribeForm.reset();
      } else {
        subscribeMessage.textContent = result.message || "Lỗi khi đăng ký.";
        subscribeMessage.className = "text-red-600 text-sm text-center mt-3";
      }
    } catch (err) {
      subscribeMessage.textContent = "Không thể kết nối đến máy chủ.";
      subscribeMessage.className = "text-red-600 text-sm text-center mt-3";
    }
  });
});
