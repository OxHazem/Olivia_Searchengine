import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCedi5qYv6c9bi88398pNn_-_RR-BZuRGs';

// Initialize the API with error handling
let genAI: GoogleGenerativeAI;
try {
  genAI = new GoogleGenerativeAI(API_KEY);
} catch (error) {
  console.error('Failed to initialize Gemini API:', error);
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatContext {
  messages: ChatMessage[];
  searchResults?: any[];
}

export const geminiChat = {
  async generateResponse(
    userMessage: string,
    context: ChatContext
  ): Promise<string> {
    try {
      if (!genAI) {
        throw new Error('Gemini API not initialized');
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Prepare the context for the model
      const contextPrompt = context.searchResults
        ? `Here are the relevant search results:\n${context.searchResults
            .map(
              (result) =>
                `Title: ${result.title}\nContent: ${result.text.substring(0, 200)}...`
            )
            .join('\n\n')}\n\n`
        : '';

      // Prepare the conversation history
      const conversationHistory = context.messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join('\n');

      // Combine everything into a prompt
      const prompt = `${contextPrompt}Previous conversation:\n${conversationHistory}\n\nUser: ${userMessage}\n\nAssistant:`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      if (error instanceof Error) {
        return `I apologize, but I encountered an error: ${error.message}. Please try again.`;
      }
      return 'I apologize, but I encountered an error while processing your request. Please try again.';
    }
  },

  async analyzeSearchResults(results: any[]): Promise<string> {
    try {
      if (!genAI) {
        throw new Error('Gemini API not initialized');
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `Analyze these search results and provide a concise summary:\n${results
        .map(
          (result) =>
            `Title: ${result.title}\nContent: ${result.text.substring(0, 200)}...`
        )
        .join('\n\n')}`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error analyzing search results:', error);
      if (error instanceof Error) {
        return `Unable to analyze search results: ${error.message}`;
      }
      return 'Unable to analyze search results at this time.';
    }
  },

  async generateSearchSuggestions(query: string): Promise<string[]> {
    try {
      if (!genAI) {
        throw new Error('Gemini API not initialized');
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `Generate 5 relevant search suggestions based on this query: "${query}"`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      const response = await result.response;
      return response.text().split('\n').filter(Boolean);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return [];
    }
  }
}; 