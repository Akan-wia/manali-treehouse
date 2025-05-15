const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db.execute(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );

    console.log("Contact saved with ID:", result.insertId);
    res.status(201).json({ message: "Contact submitted successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "An error occurred while submitting the contact form" });
  }
});

module.exports = router;
