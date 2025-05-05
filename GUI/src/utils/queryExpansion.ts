// Common synonyms and related terms for technical and scientific terms
const synonymMap: { [key: string]: string[] } = {
  // Technical terms
  'analysis': ['examination', 'study', 'investigation', 'research', 'evaluation'],
  'method': ['technique', 'approach', 'procedure', 'process', 'system'],
  'system': ['framework', 'structure', 'organization', 'arrangement', 'setup'],
  'data': ['information', 'facts', 'figures', 'statistics', 'evidence'],
  'result': ['outcome', 'conclusion', 'finding', 'product', 'effect'],
  'study': ['research', 'investigation', 'analysis', 'examination', 'survey'],
  'test': ['experiment', 'trial', 'examination', 'assessment', 'evaluation'],
  'model': ['framework', 'structure', 'system', 'design', 'pattern'],
  'theory': ['hypothesis', 'concept', 'principle', 'idea', 'postulate'],
  'experiment': ['test', 'trial', 'investigation', 'study', 'research'],
  
  // Scientific terms
  'velocity': ['speed', 'rate', 'pace', 'motion', 'movement'],
  'pressure': ['force', 'stress', 'tension', 'compression', 'load'],
  'temperature': ['heat', 'thermal', 'degree', 'warmth', 'cold'],
  'energy': ['power', 'force', 'strength', 'capacity', 'potential'],
  'mass': ['weight', 'density', 'volume', 'quantity', 'amount'],
  'force': ['power', 'strength', 'energy', 'pressure', 'impact'],
  'motion': ['movement', 'velocity', 'speed', 'displacement', 'travel'],
  'flow': ['stream', 'current', 'movement', 'passage', 'circulation'],
  'field': ['area', 'domain', 'region', 'space', 'zone'],
  'wave': ['oscillation', 'vibration', 'pulse', 'ripple', 'undulation'],
};

// Common prefixes and suffixes for technical terms
const prefixes = ['pre', 'post', 'sub', 'super', 'hyper', 'ultra', 'micro', 'macro', 'multi', 'uni'];
const suffixes = ['tion', 'sion', 'ment', 'ity', 'ness', 'ance', 'ence', 'able', 'ible', 'ive'];

// Common question prefixes
const questionPrefixes = [
  'how to',
  'what is',
  'why',
  'when',
  'where',
  'who',
  'which',
  'can',
  'does',
  'do',
  'is',
  'are',
  'was',
  'were',
  'will',
  'should',
  'could',
  'would',
  'may',
  'might'
];

// Common suffixes for queries
const querySuffixes = [
  'tutorial',
  'guide',
  'examples',
  'definition',
  'meaning',
  'explanation',
  'overview',
  'introduction',
  'basics',
  'advanced',
  'tips',
  'tricks',
  'best practices',
  'comparison',
  'difference',
  'similarities',
  'advantages',
  'disadvantages',
  'benefits',
  'drawbacks'
];

// Function to expand a single term
const expandTerm = (term: string): string[] => {
  const expandedTerms = new Set<string>();
  
  // Add the original term
  expandedTerms.add(term);
  
  // Add synonyms
  if (synonymMap[term]) {
    synonymMap[term].forEach(synonym => expandedTerms.add(synonym));
  }
  
  // Add variations with prefixes
  prefixes.forEach(prefix => {
    if (term.startsWith(prefix)) {
      expandedTerms.add(term.slice(prefix.length));
    } else {
      expandedTerms.add(prefix + term);
    }
  });
  
  // Add variations with suffixes
  suffixes.forEach(suffix => {
    if (term.endsWith(suffix)) {
      expandedTerms.add(term.slice(0, -suffix.length));
    } else {
      expandedTerms.add(term + suffix);
    }
  });
  
  return Array.from(expandedTerms);
};

// Function to expand a query
export const expandQuery = (query: string): string[] => {
  const terms = query.toLowerCase().split(/\s+/);
  const expandedQueries = new Set<string>();
  
  // Add original query
  expandedQueries.add(query);
  
  // Expand each term
  terms.forEach(term => {
    const expandedTerms = expandTerm(term);
    expandedTerms.forEach(expandedTerm => {
      // Create new query with expanded term
      const newQuery = terms.map(t => t === term ? expandedTerm : t).join(' ');
      expandedQueries.add(newQuery);
    });
  });
  
  return Array.from(expandedQueries);
};

// Function to get related terms for a query
export const getRelatedTerms = (query: string): string[] => {
  const terms = query.toLowerCase().split(/\s+/);
  const relatedTerms = new Set<string>();
  
  terms.forEach(term => {
    if (synonymMap[term]) {
      synonymMap[term].forEach(synonym => relatedTerms.add(synonym));
    }
  });
  
  return Array.from(relatedTerms);
};

// Function to generate real-time suggestions
export const generateSuggestions = (query: string): string[] => {
  const suggestions = new Set<string>();
  const terms = query.toLowerCase().split(/\s+/);
  
  // Add question-based suggestions
  questionPrefixes.forEach(prefix => {
    suggestions.add(`${prefix} ${query}`);
  });
  
  // Add suffix-based suggestions
  querySuffixes.forEach(suffix => {
    suggestions.add(`${query} ${suffix}`);
  });
  
  // Add related terms
  terms.forEach(term => {
    if (synonymMap[term]) {
      synonymMap[term].forEach(synonym => {
        suggestions.add(synonym);
        // Add combinations with other terms
        terms.forEach(otherTerm => {
          if (otherTerm !== term) {
            suggestions.add(`${synonym} ${otherTerm}`);
          }
        });
      });
    }
  });
  
  return Array.from(suggestions);
}; 