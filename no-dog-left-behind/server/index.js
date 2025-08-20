import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware to parse JSON bodies
app.use(express.json());

// proxy route
app.post("/api/verification", async (req, res) => {
  try {
    const response = await fetch("https://api.trueguard.io/verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.TRUEGUARD_API_KEY,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).json({ error: "Proxy server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
