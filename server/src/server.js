const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in environment variables.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
