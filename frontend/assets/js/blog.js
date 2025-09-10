document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");

  if (!blogList) return;

  fetch("http://localhost:5000/api/blog")
    .then((res) => res.json())
    .then((data) => data.data)
    .then((data) => {
      console.log("Dữ liệu dịch vụ từ API:", data);

      blogList.innerHTML = data
        .map((blog) => {
          const truncatedTitle =
            blog.title.length > 50
              ? blog.title.substring(0, 50) + "..."
              : blog.title;

          const truncatedContent =
            blog.content.length > 40
              ? blog.content.substring(0, 200) + "..."
              : blog.content;

          return `
            <div class="flex flex-col md:flex-row gap-6 border-b pb-6">
              <!-- Hình ảnh -->
              <img
                src="${blog.image}"
                alt="${blog.title}"
                class="w-full md:w-[380px] h-auto object-cover rounded-md shadow"
              />

              <!-- Nội dung -->
              <div class="flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 class="font-semibold text-xl md:text-2xl mb-2 border-b-2 border-gray-300 pb-2">
                ${blog.title}
                  </h3>
                  <p class="text-sm md:text-base text-gray-600 mb-4 max-h-28 overflow-hidden text-ellipsis">
                ${blog.content}  
                  </p>
                </div>
                <a
                  href="#"
                  class="w-[40%] inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-600 hover:text-white transition transform -translate-y-1"
                >
                  Cần tư vấn
                </a>
              </div>
            </div>
          `;
        })
        .join("");
    })
    .catch((err) => {
      blogList.innerHTML = `<p class="text-red-600">Không thể tải danh sách dịch vụ.</p>`;
      console.error("Lỗi khi tải dịch vụ:", err);
    });
});
