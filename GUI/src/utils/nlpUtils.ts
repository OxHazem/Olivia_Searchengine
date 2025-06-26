import { SearchResult } from '../types';

// Natural Language Processing Utilities
export const nlpUtils = {
  // Tokenize text into words
  tokenize: (text: string): string[] => {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
  },

  // Remove stop words
  removeStopWords: (tokens: string[]): string[] => {
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
      'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
      'that', 'the', 'to', 'was', 'were', 'will', 'with'
    ]);
    return tokens.filter(token => !stopWords.has(token));
  },

  // Calculate term frequency
  calculateTermFrequency: (tokens: string[]): Map<string, number> => {
    const frequency = new Map<string, number>();
    tokens.forEach(token => {
      frequency.set(token, (frequency.get(token) || 0) + 1);
    });
    return frequency;
  },

  // Calculate document similarity using cosine similarity
  calculateSimilarity: (doc1: string, doc2: string): number => {
    const tokens1 = nlpUtils.removeStopWords(nlpUtils.tokenize(doc1));
    const tokens2 = nlpUtils.removeStopWords(nlpUtils.tokenize(doc2));
    
    const freq1 = nlpUtils.calculateTermFrequency(tokens1);
    const freq2 = nlpUtils.calculateTermFrequency(tokens2);
    
    const allTerms = new Set([...freq1.keys(), ...freq2.keys()]);
    
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    allTerms.forEach(term => {
      const f1 = freq1.get(term) || 0;
      const f2 = freq2.get(term) || 0;
      
      dotProduct += f1 * f2;
      magnitude1 += f1 * f1;
      magnitude2 += f2 * f2;
    });
    
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    
    return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
  }
};

// Semantic Search Utilities
export const semanticSearch = {
  // Find related documents based on semantic similarity
  findRelatedDocuments: (
    query: string,
    documents: SearchResult[],
    threshold: number = 0.3
  ): SearchResult[] => {
    return documents
      .map(doc => ({
        ...doc,
        similarity: nlpUtils.calculateSimilarity(query, doc.text)
      }))
      .filter(doc => doc.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity);
  },

  // Generate search suggestions based on semantic similarity
  generateSuggestions: (
    query: string,
    previousQueries: string[],
    maxSuggestions: number = 5
  ): string[] => {
    return previousQueries
      .map(prevQuery => ({
        query: prevQuery,
        similarity: nlpUtils.calculateSimilarity(query, prevQuery)
      }))
      .filter(item => item.similarity >= 0.3)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxSuggestions)
      .map(item => item.query);
  },

  // Extract key phrases from text
  extractKeyPhrases: (text: string): string[] => {
    const tokens = nlpUtils.removeStopWords(nlpUtils.tokenize(text));
    const frequency = nlpUtils.calculateTermFrequency(tokens);
    
    return Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([term]) => term);
  }
};

// Voice Search Utilities
export const voiceSearch = {
  isSupported: (): boolean => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  },

  startListening: (onResult: (text: string) => void): void => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition is not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };
    
    recognition.start();
  }
};

// Image Search Utilities
export const imageSearch = {
  // Extract text from image using OCR (placeholder)
  extractTextFromImage: async (imageFile: File): Promise<string> => {
    // Implement OCR logic here
    console.log('Extracting text from image...');
    return '';
  },

  // Search for similar images (placeholder)
  findSimilarImages: async (imageFile: File): Promise<SearchResult[]> => {
    // Implement image similarity search logic here
    console.log('Finding similar images...');
    return [];
  }
}; 