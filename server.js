const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'WizCoz Backend is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Chat AI Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;
    
    // TODO: Add real OpenAI integration
    const response = `Real AI Response to: "${message}" - Backend connected!`;
    
    res.json({ 
      success: true,
      response: response,
      creditsUsed: 1
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 WizCoz Backend running on port ${PORT}`);
});
