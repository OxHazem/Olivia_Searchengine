import Papa from 'papaparse';
import { Document } from '../types';

interface CSVRow {
  Doc_NO: string;
  Title: string;
  Text: string;
  Bib: string;
}

export const loadCranfieldData = async (): Promise<Document[]> => {
  try {
    const response = await fetch('/cran_preprocessed.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse<CSVRow>(csvText, {
        header: true,
        complete: (results) => {
          const documents = results.data.map((row) => ({
            docId: parseInt(row.Doc_NO),
            title: row.Title || '',
            text: row.Text || '',
            bib: row.Bib || ''
          }));
          resolve(documents);
        },
        error: (error: Error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading Cranfield data:', error);
    return [];
  }
}; 