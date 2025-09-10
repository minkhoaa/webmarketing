const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Thiếu thông tin liên hệ" });
  }

  try {
    // Cấu hình transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Nội dung email
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_USER,
      subject: "Liên hệ từ website WebMarketing",
      html: `
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nội dung:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Đã gửi liên hệ thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi gửi email" });
  }
  console.log("✅ Đã gửi đến:", info.accepted);
});

module.exports = router;
