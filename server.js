const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI with real API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'WizCoz Backend with REAL OpenAI is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Real Chat AI Endpoint with OpenAI
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: 'Message is required' 
      });
    }

    // Real OpenAI API call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant for WizCoz AI platform. Provide clear, helpful responses." },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;
    
    res.json({ 
      success: true,
      response: aiResponse,
      creditsUsed: 1
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to get AI response: ' + error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`WizCoz Backend with OpenAI running on port ${PORT}`);
});
