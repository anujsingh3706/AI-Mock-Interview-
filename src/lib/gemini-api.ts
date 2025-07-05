// Gemini API utility functions for Interview Copilot

export interface ChatMessage {
  role: 'user' | 'gemini';
  content: string;
}

export interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  promptFeedback?: {
    blockReason?: string;
  };
}

// FIX: Use the correct Gemini API endpoint and model for v1beta
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/{model=models/*}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

// Enhanced system prompt for interview-focused responses
const getSystemPrompt = () => {
  return `You are Interview Copilot, an AI assistant specialized in helping users prepare for job interviews. You should:

1. **Be conversational and encouraging** - Use a warm, supportive tone like a helpful mentor
2. **Provide practical advice** - Give specific, actionable tips for interview preparation
3. **Share relevant examples** - When appropriate, provide concrete examples or scenarios
4. **Ask follow-up questions** - Engage users to better understand their needs
5. **Stay focused on interviews** - Keep responses relevant to job interviews, career development, and professional growth
6. **Be concise but thorough** - Provide helpful information without being overly verbose
7. **Use natural language** - Write as if you're having a friendly conversation, not a formal document

You can help with:
- Interview question preparation and practice
- Common interview questions and best answers
- Behavioral interview techniques (STAR method)
- Technical interview tips
- Interview anxiety and confidence building
- Resume and portfolio advice
- Salary negotiation strategies
- Follow-up and thank you notes
- Industry-specific interview advice

Always respond in a helpful, encouraging manner that builds the user's confidence for their interview.`;
};

// Send a message to Gemini API with conversation context
export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    // Build conversation context for more human-like responses
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Gemini API expects an array of contents (chat history)
    // We'll prepend the system prompt as the first message
    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [{ text: getSystemPrompt() }]
        },
        ...history.slice(-4), // Keep last 4 messages for context
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 800,
      }
    };

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      throw new Error("Content blocked by safety filters. Please rephrase your question.");
    } else {
      throw new Error("No response generated. Please try again.");
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// Validate API key format (basic check)
export function validateApiKey(apiKey: string): boolean {
  return Boolean(apiKey && apiKey.length > 0 && apiKey !== 'your_gemini_api_key_here');
}

// Get API key from environment
export function getApiKey(): string | undefined {
  return import.meta.env.VITE_GEMINI_API_KEY;
}

// Check if API is properly configured
export function isApiConfigured(): boolean {
  const apiKey = getApiKey();
  return apiKey ? validateApiKey(apiKey) : false;
} 