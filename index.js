require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ This line connects your route
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
