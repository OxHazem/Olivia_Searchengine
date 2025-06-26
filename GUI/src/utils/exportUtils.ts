import { SearchResult } from '../types';

export const exportFormats = {
  PDF: 'pdf',
  JSON: 'json',
  CSV: 'csv',
  API: 'api'
} as const;

export type ExportFormat = typeof exportFormats[keyof typeof exportFormats];

export const exportResults = async (
  results: SearchResult[],
  format: ExportFormat
): Promise<void> => {
  switch (format) {
    case exportFormats.PDF:
      await exportToPDF(results);
      break;
    case exportFormats.JSON:
      await exportToJSON(results);
      break;
    case exportFormats.CSV:
      await exportToCSV(results);
      break;
    case exportFormats.API:
      await exportToAPI(results);
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

const exportToPDF = async (results: SearchResult[]): Promise<void> => {
  // Implementation for PDF export
  console.log('Exporting to PDF...');
  // Add PDF generation logic here
};

const exportToJSON = async (results: SearchResult[]): Promise<void> => {
  const jsonString = JSON.stringify(results, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'search-results.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportToCSV = async (results: SearchResult[]): Promise<void> => {
  const headers = ['Title', 'Document ID', 'Score', 'Text', 'Bib'];
  const csvRows = [
    headers.join(','),
    ...results.map(result => [
      `"${result.title.replace(/"/g, '""')}"`,
      result.docId,
      result.score,
      `"${result.text.replace(/"/g, '""')}"`,
      `"${result.bib.replace(/"/g, '""')}"`
    ].join(','))
  ];
  
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'search-results.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportToAPI = async (results: SearchResult[]): Promise<void> => {
  // Implementation for API integration
  console.log('Exporting to API...');
  // Add API integration logic here
};

// Browser Extension Integration
export const browserExtensionIntegration = {
  isExtensionInstalled: (): boolean => {
    return typeof window.chrome !== 'undefined' && 
           typeof window.chrome.runtime !== 'undefined';
  },
  
  sendToExtension: (data: any): void => {
    if (typeof window.chrome !== 'undefined' && 
        typeof window.chrome.runtime !== 'undefined') {
      window.chrome.runtime.sendMessage(data);
    }
  }
};

// Mobile App Integration
export const mobileAppIntegration = {
  isMobileApp: (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  },
  
  sendToMobileApp: (data: any): void => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
  }
};

// Third-party Tool Integration
export const thirdPartyIntegration = {
  tools: {
    ZOTERO: 'zotero',
    MENDELEY: 'mendeley',
    ENDNOTE: 'endnote'
  },
  
  exportToTool: async (results: SearchResult[], tool: string): Promise<void> => {
    switch (tool) {
      case 'zotero':
        await exportToZotero(results);
        break;
      case 'mendeley':
        await exportToMendeley(results);
        break;
      case 'endnote':
        await exportToEndnote(results);
        break;
      default:
        throw new Error(`Unsupported tool: ${tool}`);
    }
  }
};

const exportToZotero = async (results: SearchResult[]): Promise<void> => {
  // Implementation for Zotero export
  console.log('Exporting to Zotero...');
};

const exportToMendeley = async (results: SearchResult[]): Promise<void> => {
  // Implementation for Mendeley export
  console.log('Exporting to Mendeley...');
};

const exportToEndnote = async (results: SearchResult[]): Promise<void> => {
  // Implementation for Endnote export
  console.log('Exporting to Endnote...');
}; 