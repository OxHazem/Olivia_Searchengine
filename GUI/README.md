# Cranfield Search Engine

A modern, beautiful search engine implementation for the Cranfield dataset using React .This project implements various search algorithms including Inverted Index, Boolean Matrix, and BM25.

## Features

- 🎨 Modern and beautiful UI with glass morphism effects
- 🔍 Multiple search algorithms:
  - Inverted Index Search
  - Boolean Matrix Search
  - BM25 Search
- 📊 Advanced filtering and sorting options
- ⌨️ Keyboard shortcuts (Ctrl/Cmd + K to focus search)
- 🌟 Interactive particle background
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cranfield-search-engine
```

2. Install dependencies:
```bash
npm install
```

3. Place your preprocessed Cranfield dataset CSV file in the `public` directory as `cran_preprocessed.csv`

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # React components
│   ├── SearchResults.tsx
│   └── SearchOptions.tsx
├── utils/             # Utility functions
│   ├── dataLoader.ts
│   └── searchAlgorithms.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── styles/            # CSS styles
│   └── globals.css
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Search Algorithms

### Inverted Index Search
- Creates an inverted index mapping terms to document IDs
- Efficient for exact term matching
- Supports partial matches

### Boolean Matrix Search
- Creates a term-document matrix
- Supports boolean operations (AND, OR)
- Good for exact phrase matching

### BM25 Search
- Implements the BM25 ranking function
- Considers term frequency and document length
- Provides better relevance scoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License
