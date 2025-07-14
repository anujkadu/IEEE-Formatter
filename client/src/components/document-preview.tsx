import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface DocumentPreviewProps {
  document: any;
  documentId?: number;
}

export function DocumentPreview({ document, documentId }: DocumentPreviewProps) {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleExport = async (format: 'pdf' | 'docx' | 'latex') => {
    if (!documentId) return;
    
    try {
      const response = await fetch(`/api/documents/${documentId}/export?format=${format}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${document.title || 'document'}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        alert(data.message || "Export functionality coming soon");
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Export failed");
    }
  };

  if (!document) {
    return (
      <Card className="bg-paper shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Document Loaded</h3>
            <p className="text-sm text-gray-400">Upload a PDF to see the IEEE formatted preview</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-paper shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-secondary">
          <i className="fas fa-eye mr-2 text-primary"></i>IEEE Preview
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
            >
              <i className="fas fa-search-minus"></i>
            </Button>
            <span className="text-sm text-gray-600 min-w-12 text-center">{zoomLevel}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
            >
              <i className="fas fa-search-plus"></i>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleExport('pdf')}
              className="bg-accent text-white hover:bg-green-600"
              disabled={!documentId}
              size="sm"
            >
              <i className="fas fa-file-pdf mr-2"></i>PDF
            </Button>
            <Button
              onClick={() => handleExport('docx')}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={!documentId}
              size="sm"
            >
              <i className="fas fa-file-word mr-2"></i>DOCX
            </Button>
            <Button
              onClick={() => handleExport('latex')}
              className="bg-purple-600 text-white hover:bg-purple-700"
              disabled={!documentId}
              size="sm"
            >
              <i className="fas fa-code mr-2"></i>LaTeX
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 min-h-96 overflow-auto">
        <div 
          className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto transition-transform ieee-document"
          style={{ 
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            minHeight: '842px', // A4 height
            width: '595px', // A4 width
            padding: '72px', // 1 inch margins
            fontFamily: 'Times New Roman, serif',
            fontSize: '12px',
            lineHeight: '1.5',
            color: '#000000'
          }}
        >
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold mb-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {document.title}
            </h1>
            {document.authors && document.authors.length > 0 && (
              <div className="mb-3" style={{ fontSize: '12px' }}>
                {document.authors.map((author, index) => (
                  <span key={index}>
                    {author}
                    {index < document.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            )}
            {document.affiliations && document.affiliations.length > 0 && (
              <div className="italic mb-4" style={{ fontSize: '10px', fontStyle: 'italic' }}>
                {document.affiliations.map((affiliation, index) => (
                  <div key={index}>{affiliation}</div>
                ))}
              </div>
            )}
          </div>
          
          {/* Abstract */}
          {document.abstract && (
            <div className="mb-6">
              <h2 className="font-bold mb-2 text-center" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Abstract
              </h2>
              <p className="text-justify mb-4" style={{ fontSize: '10px', textAlign: 'justify', textIndent: '0.5in' }}>
                {document.abstract}
              </p>
              {document.keywords && document.keywords.length > 0 && (
                <p className="italic" style={{ fontSize: '10px', fontStyle: 'italic' }}>
                  <strong>Keywords—</strong>{document.keywords.join(", ")}
                </p>
              )}
            </div>
          )}
          
          {/* Sections */}
          {document.sections && document.sections.map((section: any, index: number) => (
            <div key={index} className="mb-4">
              <h2 className="font-bold mb-2" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {section.title}
              </h2>
              <div className="text-justify" style={{ fontSize: '10px', textAlign: 'justify', textIndent: '0.5in' }}>
                {section.content.split('\n').map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="mb-2" style={{ textIndent: pIndex === 0 ? '0.5in' : '0' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Add figure placeholders within sections */}
              {section.title.includes('RESULT') && document.figures && document.figures.length > 0 && (
                <div className="my-4 text-center">
                  <div className="border border-gray-400 p-4 mx-auto max-w-md bg-white">
                    <div className="bg-gray-100 h-32 flex items-center justify-center mb-2">
                      <i className="fas fa-chart-bar text-2xl text-gray-400"></i>
                    </div>
                    <p className="text-center" style={{ fontSize: '10px' }}>
                      {document.figures[0].caption}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* References */}
          {document.references && document.references.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold mb-2" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                REFERENCES
              </h2>
              <div style={{ fontSize: '9px' }}>
                {document.references.map((ref: string, index: number) => (
                  <p key={index} className="mb-1" style={{ textIndent: '-0.25in', paddingLeft: '0.25in' }}>
                    {ref}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
