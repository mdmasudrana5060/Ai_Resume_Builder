import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client (reads process.env.GEMINI_API_KEY)
const geminiAi = new GoogleGenAI({
  apiKey: process.env.GEMINIAI_API_KEY,
});

export default geminiAi;
