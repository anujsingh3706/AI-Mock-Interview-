# AI Mock Interview Platform

An AI-powered platform to help you practice and ace your job interviews. Generate personalized mock interviews, record your answers, and receive instant, detailed feedback to improve your skills and boost your confidence.

## Features
- **AI-Generated Mock Interviews**: Get tailored interview questions based on your preferences.
- **Answer Recording**: Practice by recording your answers (video is never saved).
- **Personalized Feedback**: Receive AI-driven feedback, ratings, and improvement tips for each answer.
- **Progress Tracking**: View your overall ratings and feedback history.
- **Modern UI**: Built with React, TypeScript, and Vite for a fast, responsive experience.
- **Interview Copilot Chatbot**: Get real-time help and advice from an AI assistant powered by Google Gemini.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AI-Mock-Interview-
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your Gemini API key:
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the root directory
   - Add your API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
```bash
pnpm dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Gemini API Configuration
# Get your API key from: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
