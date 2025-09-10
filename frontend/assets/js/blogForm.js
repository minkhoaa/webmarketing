document.addEventListener('DOMContentLoaded', function() {
  const blogForm = document.getElementById('blogForm');

  blogForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const content = document.getElementById('content').value;

    const blogData = {
      title,
      content
    };

    if (image) {
      blogData.image = image;
    }

    try {
      const response = await fetch('http://localhost:5000/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      alert('Bài viết đã được tạo thành công!');
      window.location.href = "blog.html";
      blogForm.reset();

    } catch (error) {
      console.error('Error:', error);

      if (error && error.message && error.message.includes('ValidationError')) {
        alert('Lỗi dữ liệu không hợp lệ: \n' + error.errors.map(err => err.message).join('\n'));
      } else {
        alert('Có lỗi xảy ra khi tạo bài viết: ' + error.message);
      }
    }
  });
});
