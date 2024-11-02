import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(process.cwd())));
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/wordchain", async (req, res) => {
    const { word } = req.body;
    const lastTwoChars = word.slice(-2);
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [
                    { text: `Let's play a word chain game. Respond with a valid 
                      English word starting with the last two letters: 
                      "${lastTwoChars}". 
                      If you can't think of one, say "I lost." Your word should 
                      be in lowercase and at least 3 letters long.` }
                ],
            },
        ],
    });
    try {
        const result = await chat.sendMessage("");
        const aiWord = result.response.text();
        const isValidResponse = aiWord.length >= 3 
              && aiWord.startsWith(lastTwoChars) && aiWord != lastTwoChars;
        if (!isValidResponse) {
            res.json({ aiWord: "I lost." });
        } else {
            res.json({ aiWord });
        }
    } catch (error) {
        console.error("Error generating response from AI:", error);
        res.status(500).json({ error: "Failed to generate response from AI." });
    }
});

app.get("/", (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'wordChain.html'));
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});