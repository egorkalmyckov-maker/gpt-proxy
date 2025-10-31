import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// 🔹 Главная страница
app.get("/", (req, res) => {
  res.send("🚀 GPT Proxy Server is running!");
});

// 🔹 Тестовый маршрут
app.get("/test", (req, res) => {
  res.json({ status: "ok" });
});

// 🔹 Проксирование запросов к OpenAI API
app.post("/proxy", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Render подставляет свой порт через переменную окружения
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
