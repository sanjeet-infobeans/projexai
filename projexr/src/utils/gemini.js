import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDqGpbtovZGjHE57AXekQxQEymmnLrnNCg';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Calls Gemini AI API with a prompt and returns the AI response text.
 * @param {string} prompt - The prompt to send to Gemini.
 * @returns {Promise<string>} - The AI response text or error message.
 */
export async function callGeminiAPI(prompt) {
  try {
    const response = await axios.post(
      GEMINI_ENDPOINT,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated'
    );
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return `Error: ${error.message}`;
  }
}
