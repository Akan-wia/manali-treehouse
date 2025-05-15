const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.json());

// This should match how you're calling the API in curl
app.use('/api/contact', contactRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
