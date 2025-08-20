import express from "express"
import fetch from "node-fetch" // or built-in fetch in Node 18+
import cors from "cors"
import dotenv from "dotenv"

dotenv.config() // load TRUEGUARD_API_KEY from .env

const app = express()

// Enable CORS so your frontend can talk to this backend
app.use(cors())
app.use(express.json())

// Verification route
app.post("/verification", async (req, res) => {
  try {
    const { email, type } = req.body

    // Forward request to TrueGuard
    const response = await fetch("https://api.trueguard.io/verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.VITE_EMAIL_VERIFY_API_KEY,
      },
      body: JSON.stringify({ email, type }),
    })

    const data = await response.json()

    // Return TrueGuard response directly to frontend
    res.status(response.status).json(data)
  } catch (err) {
    console.error("❌ Error in /verification:", err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Start server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
