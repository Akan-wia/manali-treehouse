// controllers/contactController.js
const db = require("../config/db");
const nodemailer = require("nodemailer");

exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to DB
    const [result] = await db.execute(
      "INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
