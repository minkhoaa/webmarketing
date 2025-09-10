document.addEventListener("DOMContentLoaded", () => {
  const subscribeList = document.getElementById("subscribeList");
  const newsletterList = document.getElementById("newsletterList");

  loadList("subscribe", subscribeList, deleteSubscribe);
  loadList("newsletter", newsletterList, deleteNewsletter);
});

function loadList(endpoint, targetElement, deleteFn) {
  fetch(`/api/${endpoint}`)
    .then((res) => res.json())
    .then((data) => {
      targetElement.innerHTML = data
        .map(
          (item) => `
          <tr>
            <td class="py-2 px-4">${item.email}</td>
            <td class="py-2 px-4">${formatDate(
            item.createdAt || item.subscribedAt
          )}</td>
            <td class="py-2 px-4 text-center">
              <button onclick="${deleteFn.name}('${item._id
            }')" class="text-red-600 hover:underline text-sm">🗑 Xoá</button>
            </td>
          </tr>
        `
        )
        .join("");
    })
    .catch(() => {
      targetElement.innerHTML = `<tr><td colspan="3" class="py-2 px-4 text-red-600">Lỗi tải dữ liệu từ /api/${endpoint}</td></tr>`;
    });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("vi-VN");
}

async function deleteSubscribe(id) {
  if (!confirm("Bạn có chắc muốn xoá người đăng ký tư vấn này?")) return;
  try {
    const res = await fetch(`/api/subscribe/${id}`, {
      method: "DELETE",
    });
    if (res.ok) location.reload();
    else alert("Xoá thất bại");
  } catch {
    alert("Lỗi kết nối khi xoá");
  }
}

async function deleteNewsletter(id) {
  if (!confirm("Bạn có chắc muốn xoá email nhận tin này?")) return;
  try {
    const res = await fetch(`/api/newsletter/${id}`, {
      method: "DELETE",
    });
    if (res.ok) location.reload();
    else alert("Xoá thất bại");
  } catch {
    alert("Lỗi kết nối khi xoá");
  }
}
