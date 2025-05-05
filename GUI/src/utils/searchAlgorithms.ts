import { Document, SearchResult } from '../types';
import { expandQuery } from './queryExpansion';

// Inverted Index Search
export const performInvertedIndexSearch = (query: string, documents: Document[]): SearchResult[] => {
  // Create inverted index
  const invertedIndex: { [key: string]: number[] } = {};
  
  documents.forEach((doc, index) => {
    const words = doc.text.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (!invertedIndex[word]) {
        invertedIndex[word] = [];
      }
      invertedIndex[word].push(index);
    });
  });

  // Expand query
  const expandedQueries = expandQuery(query);
  const results: SearchResult[] = [];
  const docScores: { [key: number]: number } = {};

  // Search with each expanded query
  expandedQueries.forEach(expandedQuery => {
    const queryWords = expandedQuery.toLowerCase().split(/\s+/);
    
    queryWords.forEach(word => {
      if (invertedIndex[word]) {
        invertedIndex[word].forEach(docIndex => {
          if (!docScores[docIndex]) {
            docScores[docIndex] = 0;
          }
          docScores[docIndex]++;
        });
      }
    });
  });

  // Convert scores to results
  Object.entries(docScores).forEach(([docIndex, score]) => {
    const doc = documents[parseInt(docIndex)];
    results.push({
      docId: doc.docId,
      title: doc.title,
      text: doc.text,
      bib: doc.bib,
      score: score / expandedQueries.length
    });
  });

  return results.sort((a, b) => b.score - a.score);
};

// Boolean Matrix Search
export const performBooleanMatrixSearch = (query: string, documents: Document[]): SearchResult[] => {
  try {
    // Create term-document matrix with a maximum number of terms to prevent memory issues
    const MAX_TERMS = 1000;
    const terms = new Set<string>();
    
    // First pass: collect unique terms
    documents.forEach(doc => {
      doc.text.toLowerCase().split(/\s+/).forEach(term => {
        if (term.length > 2) { // Only consider terms longer than 2 characters
          terms.add(term);
        }
      });
    });

    // Convert to array and limit the number of terms
    const termArray = Array.from(terms).slice(0, MAX_TERMS);
    
    // Create the matrix
    const matrix: boolean[][] = documents.map(doc => {
      const docText = doc.text.toLowerCase();
      return termArray.map(term => docText.includes(term));
    });

    // Expand query
    const expandedQueries = expandQuery(query);
    const results: SearchResult[] = [];

    documents.forEach((doc, docIndex) => {
      let totalScore = 0;
      
      expandedQueries.forEach(expandedQuery => {
        const queryTerms = expandedQuery.toLowerCase().split(/\s+/).filter(term => term.length > 2);
        let matchCount = 0;
        
        queryTerms.forEach(term => {
          const termIndex = termArray.indexOf(term);
          if (termIndex !== -1 && matrix[docIndex][termIndex]) {
            matchCount++;
          }
        });

        // Calculate score for this expanded query
        const score = queryTerms.length > 0 ? matchCount / queryTerms.length : 0;
        totalScore += score;
      });

      // Average score across all expanded queries
      const finalScore = expandedQueries.length > 0 ? totalScore / expandedQueries.length : 0;

      if (finalScore > 0) {
        results.push({
          docId: doc.docId,
          title: doc.title,
          text: doc.text,
          bib: doc.bib,
          score: finalScore
        });
      }
    });

    return results.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Boolean matrix search error:', error);
    return [];
  }
};

// BM25 Search
export const performBM25Search = (query: string, documents: Document[]): SearchResult[] => {
  const k1 = 1.5;
  const b = 0.75;
  const avgDocLength = documents.reduce((sum, doc) => sum + doc.text.split(/\s+/).length, 0) / documents.length;

  // Calculate IDF for each term
  const termDF: { [key: string]: number } = {};
  documents.forEach(doc => {
    const terms = new Set(doc.text.toLowerCase().split(/\s+/));
    terms.forEach(term => {
      termDF[term] = (termDF[term] || 0) + 1;
    });
  });

  const N = documents.length;
  const termIDF: { [key: string]: number } = {};
  Object.entries(termDF).forEach(([term, df]) => {
    termIDF[term] = Math.log((N - df + 0.5) / (df + 0.5) + 1);
  });

  // Expand query
  const expandedQueries = expandQuery(query);
  const results: SearchResult[] = [];

  documents.forEach(doc => {
    const docTerms = doc.text.toLowerCase().split(/\s+/);
    const docLength = docTerms.length;
    let totalScore = 0;

    expandedQueries.forEach(expandedQuery => {
      const queryTerms = expandedQuery.toLowerCase().split(/\s+/);
      
      queryTerms.forEach(term => {
        const termFreq = docTerms.filter(t => t === term).length;
        const numerator = termFreq * (k1 + 1);
        const denominator = termFreq + k1 * (1 - b + b * (docLength / avgDocLength));
        totalScore += (termIDF[term] || 0) * (numerator / denominator);
      });
    });

    // Average score across all expanded queries
    const finalScore = expandedQueries.length > 0 ? totalScore / expandedQueries.length : 0;

    if (finalScore > 0) {
      results.push({
        docId: doc.docId,
        title: doc.title,
        text: doc.text,
        bib: doc.bib,
        score: finalScore
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}; 