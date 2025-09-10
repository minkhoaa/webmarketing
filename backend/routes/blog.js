const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.post("/", async (req, res) => {
  const { title, content} = req.body;

  try {
    const newBlog = new Blog({
      ...req.body,
      author: '67fc396c8563ad6076c060f8'
    });
    await newBlog.save();
    res.json({
      success: true,
      data: newBlog
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: messages
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Lỗi khi tạo bài viết",
      error: err.message 
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: blogs
    });
  } catch (err) {
    res.status(500).json({ seuccess: false, message: "Lỗi máy chủ", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Không tìm thấy" });
    }
    res.json({
      seccess: true,
      data: blog
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi máy chủ", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Không tìm thấy" });
    }
    
    res.json(updatedBlog);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: messages
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Lỗi khi cập nhật bài viết",
      error: err.message 
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Không tìm thấy" });
    }
    
    res.json({
      success: true,
      message: "Đã xoá thành công"
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Lỗi khi xóa bài viết",
      error: err.message 
    });
  }
});

module.exports = router;