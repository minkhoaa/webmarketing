const express = require("express");
const router = express.Router();

const services = [
  {
    id: 1,
    title: "Booking Fanpage",
    description: "Viết bài seeding fanpage lớn",
    image: "fanpage.jpg",
  },
  {
    id: 2,
    title: "Booking KOL",
    description: "Mời người nổi tiếng quảng bá",
    image: "kol.jpg",
  },
  {
    id: 3,
    title: "Booking PR báo chí",
    description: "Viết bài PR và truyền thông",
    image: "pr.jpg",
  },
];

router.get("/", (req, res) => {
  res.json(services);
});

module.exports = router;
