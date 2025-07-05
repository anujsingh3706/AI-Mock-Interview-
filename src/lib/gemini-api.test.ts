// Simple test file for Gemini API utilities
// This file can be used to test the API integration

import { validateApiKey, isApiConfigured } from './gemini-api';

// Test API key validation
console.log('Testing API key validation...');
console.log('Empty key:', validateApiKey('')); // Should be false
console.log('Placeholder key:', validateApiKey('your_gemini_api_key_here')); // Should be false
console.log('Valid key format:', validateApiKey('AIzaSyC...')); // Should be true

// Test API configuration
console.log('Testing API configuration...');
console.log('Is API configured:', isApiConfigured());

// Note: This is a simple test file for development purposes
// For production, use a proper testing framework like Jest or Vitest 