const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch@2
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-webhook", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  // Replace with your Discord webhook URL
  const webhookUrl = "https://discord.com/api/webhooks/your-webhook-id/your-webhook-token";
  try {
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!discordRes.ok) {
      const text = await discordRes.text();
      return res.status(500).json({ error: `Discord webhook error: ${text}` });
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5173; // or any port you want
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
