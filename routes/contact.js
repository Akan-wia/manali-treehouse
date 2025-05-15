const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      text: `Message from ${name} (${email}):\n\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
