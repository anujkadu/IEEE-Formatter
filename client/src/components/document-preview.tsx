

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import jsPDF from "jspdf";
import { Document as DocxDocument, Packer, Paragraph, TextRun } from "docx";

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
    if (!document) return;
    const content = document.sections?.[0]?.content || "";
    const title = document.title || 'document';

    try {
      if (format === 'pdf') {
        const pdf = new jsPDF();
        pdf.setFont("Times", "Roman");
        pdf.setFontSize(10);
        // Using splitTextToSize to handle wrapping
        const lines = pdf.splitTextToSize(content, 180); // 180mm width on A4
        pdf.text(lines, 15, 15);
        pdf.save(`${title}.pdf`);
      } else if (format === 'docx') {
        const paragraphs = content.split('\n').map(line => new Paragraph({
          children: [new TextRun(line)],
          style: "default"
        }));
        const docx = new DocxDocument({
            sections: [{ children: paragraphs }],
            styles: {
                paragraphStyles: [{
                    id: "default",
                    name: "Default",
                    basedOn: "Normal",
                    next: "Normal",
                    run: { font: "Times New Roman", size: 20 }, // 10pt = 20 half-points
                }]
            }
        });
        const blob = await Packer.toBlob(docx);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else if (format === 'latex') {
        // For LaTeX, the content should already be in the correct format
        const blob = new Blob([content], { type: 'text/x-latex' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.tex`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Export failed. The AI-generated content might not be compatible with the chosen format.");
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

  const formattedContent = document.sections?.[0]?.content || "";

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
              disabled={!document}
              size="sm"
            >
              <i className="fas fa-file-pdf mr-2"></i>PDF
            </Button>
            <Button
              onClick={() => handleExport('docx')}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={!document}
              size="sm"
            >
              <i className="fas fa-file-word mr-2"></i>DOCX
            </Button>
            <Button
              onClick={() => handleExport('latex')}
              className="bg-purple-600 text-white hover:bg-purple-700"
              disabled={!document}
              size="sm"
            >
              <i className="fas fa-code mr-2"></i>LaTeX
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 min-h-96 overflow-auto">
        <div
          className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto transition-transform ieee-document p-12"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            minHeight: '842px',
            fontFamily: 'Times New Roman, serif',
            fontSize: '10pt',
            color: '#000000',
            whiteSpace: 'pre-wrap', // Crucial for preserving AI's formatting
            textAlign: 'left',
          }}
        >
          {formattedContent}
        </div>
      </div>
    </Card>
  );
}


// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import { Document as DocxDocument, Packer, Paragraph, TextRun } from "docx";

// // Helper to detect if the content is likely LaTeX
// const isLatexContent = (content: string) => {
//   return content.trim().startsWith('\\documentclass');
// };

// // Helper to create the URL for the LaTeX rendering service
// const getLatexImageUrl = (latexContent: string) => {
//   const encodedLatex = encodeURIComponent(latexContent);
//   // Using an external service for rendering. This provides a high-fidelity preview without a backend.
//   return `https://quicklatex.com/latex3.f/qlrender.cgi?formula=${encodedLatex}&fsize=11pt&fcolor=000000&mode=0&out=1&remhost=quicklatex.com&preamble=\\usepackage{amsmath}\\usepackage{amsfonts}\\usepackage{amssymb}`;
// };

// interface DocumentPreviewProps {
//   document: any;
//   documentId?: number;
// }

// export function DocumentPreview({ document }: DocumentPreviewProps) {
//   const [zoomLevel, setZoomLevel] = useState(100);
//   const [latexPreviewUrl, setLatexPreviewUrl] = useState<string | null>(null);
//   const [isLoadingPreview, setIsLoadingPreview] = useState(false);

//   const formattedContent = document?.sections?.[0]?.content || "";
//   const isLatex = isLatexContent(formattedContent);

//   useEffect(() => {
//     if (isLatex) {
//       setIsLoadingPreview(true);
//       // Generate the URL for the LaTeX image preview
//       const imageUrl = getLatexImageUrl(formattedContent);
//       setLatexPreviewUrl(imageUrl);
//       // A small delay to allow the image to load
//       setTimeout(() => setIsLoadingPreview(false), 1500);
//     } else {
//       setLatexPreviewUrl(null);
//     }
//   }, [formattedContent, isLatex]);


//   const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200));
//   const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));

//   const handleExport = async (format: 'pdf' | 'docx' | 'latex') => {
//     if (!document) return;
//     const content = formattedContent;
//     const title = document.title || 'document';

//     try {
//       if (format === 'latex') {
//         // For LaTeX, export the raw, perfect code from the AI
//         const blob = new Blob([content], { type: 'text/x-latex' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${title}.tex`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       } else if (format === 'pdf') {
//          // PDF export from plain text
//         const pdf = new jsPDF();
//         pdf.setFont("Times", "Roman");
//         pdf.setFontSize(10);
//         const lines = pdf.splitTextToSize(content, 180);
//         pdf.text(lines, 15, 15);
//         pdf.save(`${title}.pdf`);
//       } else if (format === 'docx') {
//         // DOCX export from plain text
//         const paragraphs = content.split('\n').map(line => new Paragraph({ children: [new TextRun(line)] }));
//         const docx = new DocxDocument({ sections: [{ children: paragraphs }] });
//         const blob = await Packer.toBlob(docx);
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${title}.docx`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error("Export error:", error);
//       alert("Export failed. For best results with LaTeX, use the 'LaTeX' export option and a dedicated compiler like Overleaf.");
//     }
//   };

//   const renderPreview = () => {
//     if (isLoadingPreview) {
//       return <div className="text-center p-12">Loading PDF Preview...</div>;
//     }

//     if (isLatex && latexPreviewUrl) {
//       return <img src={latexPreviewUrl} alt="LaTeX Preview" style={{ width: '100%', border: '1px solid #ccc' }} />;
//     }

//     // Fallback for non-LaTeX or if the image fails
//     return (
//       <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'Times New Roman, serif', fontSize: '10pt' }}>
//         {formattedContent}
//       </div>
//     );
//   };

//   if (!document) {
//     return (
//         <Card className="bg-paper shadow-sm border border-gray-200">
//             <CardContent className="p-6 text-center py-12">
//                 <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
//                 <h3 className="text-lg font-medium text-gray-500 mb-2">No Document Loaded</h3>
//                 <p className="text-sm text-gray-400">Upload a PDF to see the IEEE formatted preview</p>
//             </CardContent>
//         </Card>
//     );
//   }

//   return (
//     <Card className="bg-paper shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between p-6 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-secondary">
//           <i className="fas fa-eye mr-2 text-primary"></i>IEEE Preview
//         </h2>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
//               <i className="fas fa-search-minus"></i>
//             </Button>
//             <span className="text-sm text-gray-600 min-w-12 text-center">{zoomLevel}%</span>
//             <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
//               <i className="fas fa-search-plus"></i>
//             </Button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button onClick={() => handleExport('pdf')} size="sm" disabled={!document || isLatex}>PDF</Button>
//             <Button onClick={() => handleExport('docx')} size="sm" disabled={!document || isLatex}>DOCX</Button>
//             <Button onClick={() => handleExport('latex')} size="sm" disabled={!document || !isLatex}>LaTeX</Button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 bg-gray-50 min-h-96 overflow-auto">
//         <div
//           className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto transition-transform p-4"
//           style={{
//             transform: `scale(${zoomLevel / 100})`,
//             transformOrigin: 'top center',
//           }}
//         >
//           {renderPreview()}
//         </div>
//       </div>
//     </Card>
//   );
// }