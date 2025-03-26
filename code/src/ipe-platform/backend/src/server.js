const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const geminiRoutes = require('./routes/geminiRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/gemini', geminiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});