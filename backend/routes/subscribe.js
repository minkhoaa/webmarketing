const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// POST /api/subscribe
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email không được để trống" });

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email đã được đăng ký" });

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Đăng ký tư vấn thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
});

router.get("/", async (req, res) => {
  const list = await Subscriber.find().sort({ subscribedAt: -1 });
  res.json(list);
});

router.delete("/:id", async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá" });
  }
});

module.exports = router;
