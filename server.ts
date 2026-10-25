import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route for AI Quiz Generation
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { topic, count = 5, language = 'bn', difficulty = 'medium' } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ 
        error: 'Gemini API key is not configured on the server.',
        fallback: true
      });
    }

    const ai = new GoogleGenAI();
    
    const prompt = `You are an expert General Knowledge (সাধারণ জ্ঞান) quiz master for Bangladeshi students, BCS aspirants, and trivia enthusiasts.
Generate ${count} multiple choice questions on the topic: "${topic || 'General Knowledge'}" in ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}.
Difficulty level: ${difficulty}.

Requirements:
1. Questions must be factual, accurate, verified, and relevant to general knowledge or competitive exams.
2. Provide exactly 4 options per question.
3. Mark the correct option index (0, 1, 2, or 3).
4. Provide a rich, 1-2 sentence educational explanation (${language === 'bn' ? 'বাংলায় ব্যাখ্যা' : 'in English'}) detailing why the answer is correct and an extra interesting fact.

Format strictly as JSON array with this exact structure:
[
  {
    "id": "gen_1",
    "question": "প্রশ্ন এখানে...",
    "options": ["অপশন ক", "অপশন খ", "অপশন গ", "অপশন ঘ"],
    "correctIndex": 0,
    "explanation": "ব্যাখ্যা এখানে...",
    "category": "কাস্টম জিকে",
    "difficulty": "${difficulty}"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text || '[]';
    let questions;
    try {
      questions = JSON.parse(responseText);
    } catch {
      const match = responseText.match(/\[[\s\S]*\]/);
      if (match) {
        questions = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    return res.json({ success: true, questions });
  } catch (error: any) {
    console.error('Quiz generation error:', error);
    return res.status(500).json({ 
      error: error.message || 'Error generating quiz',
      fallback: true
    });
  }
});

// Setup Vite in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`GK Master Server listening on port ${PORT}`);
  });
}

startServer();
