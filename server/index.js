import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

const allowedOrigins = [
  "http://localhost:5173", // frontend dev
  "https://no-dog-left-behind.onrender.com", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ allow cookies/credentials
  })
); // Allow frontend requests

app.use(express.json());

app.post('/verify-email', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const response = await fetch(process.env.EMAIL_VERIFY_URL, {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.EMAIL_VERIFY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, type: 'full' }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
