export interface Document {
  docId: number;
  title: string;
  text: string;
  bib: string;
}

export interface SearchResult {
  docId: number;
  title: string;
  text: string;
  bib: string;
  score: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
} 