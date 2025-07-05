# Gemini API Setup Guide

This guide explains how to set up and use the Gemini API integration in the Interview Copilot chatbot.

## Overview

The Interview Copilot chatbot uses Google's Gemini API to provide human-like, interview-focused responses. The integration includes:

- **Conversation Context**: Maintains chat history for more natural conversations
- **Interview-Focused Prompts**: Specialized system prompts for career and interview advice
- **Error Handling**: Graceful handling of API errors and rate limits
- **Safety Filters**: Built-in content filtering for appropriate responses

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. Create a `.env` file in the project root directory
2. Add your API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 3. Test the Integration

1. Start the development server: `pnpm dev`
2. Navigate to the home page
3. Look for the "Ask Interview Copilot" chatbot section
4. If configured correctly, you should see the chat interface
5. If not configured, you'll see a warning message

## Features

### Human-Like Responses

The chatbot is designed to provide natural, conversational responses that:
- Use a warm, encouraging tone
- Provide specific, actionable advice
- Include relevant examples when appropriate
- Ask follow-up questions to better understand user needs

### Interview-Focused Assistance

The AI is specialized in helping with:
- Interview question preparation and practice
- Common interview questions and best answers
- Behavioral interview techniques (STAR method)
- Technical interview tips
- Interview anxiety and confidence building
- Resume and portfolio advice
- Salary negotiation strategies
- Follow-up and thank you notes
- Industry-specific interview advice

### Conversation Context

The chatbot maintains conversation history to provide more coherent and contextual responses. It remembers:
- Previous questions and answers
- User preferences and context
- Ongoing discussion topics

## API Configuration

### Generation Settings

The API is configured with the following parameters for optimal interview assistance:

- **Temperature**: 0.7 (slightly creative but focused)
- **Top-K**: 40 (diverse but relevant responses)
- **Top-P**: 0.8 (balanced creativity and coherence)
- **Max Output Tokens**: 800 (reasonable response length)

### Safety Settings

Built-in safety filters prevent inappropriate content:
- Harassment filtering
- Hate speech filtering
- Sexually explicit content filtering
- Dangerous content filtering

## Troubleshooting

### Common Issues

1. **"API Not Configured" Error**
   - Ensure your `.env` file exists in the project root
   - Verify the API key is correctly formatted
   - Check that the environment variable name is `VITE_GEMINI_API_KEY`

2. **"Failed to get response" Error**
   - Check your internet connection
   - Verify your API key is valid and has sufficient quota
   - Ensure the API key has access to the Gemini Pro model

3. **"Content blocked" Error**
   - Rephrase your question to avoid triggering safety filters
   - Keep questions focused on professional and career topics

### API Quota and Limits

- Free tier: 15 requests per minute
- Paid tier: Higher limits available
- Monitor usage in [Google AI Studio](https://makersuite.google.com/app/apikey)

## Development

### File Structure

```
src/
├── lib/
│   ├── gemini-api.ts          # Main API utility functions
│   └── gemini-api.test.ts     # Simple test file
└── routes/
    └── home.tsx               # Chatbot UI implementation
```

### Key Functions

- `sendMessageToGemini()`: Send messages to Gemini API
- `validateApiKey()`: Validate API key format
- `isApiConfigured()`: Check if API is properly set up
- `getApiKey()`: Get API key from environment

### Customization

You can customize the chatbot by modifying:
- System prompt in `gemini-api.ts`
- Generation parameters
- Safety settings
- UI components in `home.tsx`

## Security Notes

- API keys are stored in environment variables (not in code)
- `.env` files are excluded from version control
- API responses are filtered for safety
- No sensitive user data is sent to the API

## Support

For issues with:
- **API Setup**: Check this guide and the main README
- **Gemini API**: Visit [Google AI Studio Documentation](https://ai.google.dev/docs)
- **Application Issues**: Check the project's main README and issue tracker 