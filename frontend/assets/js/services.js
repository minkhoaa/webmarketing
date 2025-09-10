document.addEventListener("DOMContentLoaded", function () {
  const serviceList = document.getElementById("serviceList"); // Đúng id là serviceList

  if (!serviceList) return;

  fetch("/api/services")
    .then((res) => res.json())
    .then((data) => {
      console.log("Dữ liệu dịch vụ từ API:", data);
      serviceList.innerHTML = data
        .map(
          (service) => `
            <div class="bg-white shadow rounded-lg transition-all hover:-translate-y-2 cursor-pointer duration-300 ease-in-out overflow-hidden">
              <a href="./service.html">
                <img src="./image/${service.image}" alt="${service.title}" class="w-full h-[275px] object-cover" />
                <div class="flex flex-col items-start p-5 gap-2">
                  <h3 class="font-semibold text-xl">${service.title}</h3>
                  <p class="text-lg text-gray-600">${service.description}</p>
                </div>
              </a>
            </div>
          `
        )
        .join("");
    })
    .catch((err) => {
      serviceList.innerHTML = `<p class="text-red-600">Không thể tải danh sách dịch vụ.</p>`;
      console.error("Lỗi khi tải dịch vụ:", err);
    });
});
