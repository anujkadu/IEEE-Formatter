

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import jsPDF from "jspdf";
// import { Document as DocxDocument, Packer, Paragraph, TextRun } from "docx";

// interface DocumentPreviewProps {
//   document: any;
//   documentId?: number;
// }

// export function DocumentPreview({ document, documentId }: DocumentPreviewProps) {
//   const [zoomLevel, setZoomLevel] = useState(100);

//   const handleZoomIn = () => {
//     setZoomLevel(prev => Math.min(prev + 10, 200));
//   };

//   const handleZoomOut = () => {
//     setZoomLevel(prev => Math.max(prev - 10, 50));
//   };

//   const handleExport = async (format: 'pdf' | 'docx' | 'latex') => {
//     if (!document) return;
//     const content = document.sections?.[0]?.content || "";
//     const title = document.title || 'document';

//     try {
//       if (format === 'pdf') {
//         const pdf = new jsPDF();
//         pdf.setFont("Times", "Roman");
//         pdf.setFontSize(10);
//         // Using splitTextToSize to handle wrapping
//         const lines = pdf.splitTextToSize(content, 180); // 180mm width on A4
//         pdf.text(lines, 15, 15);
//         pdf.save(`${title}.pdf`);
//       } else if (format === 'docx') {
//         const paragraphs = content.split('\n').map(line => new Paragraph({
//           children: [new TextRun(line)],
//           style: "default"
//         }));
//         const docx = new DocxDocument({
//             sections: [{ children: paragraphs }],
//             styles: {
//                 paragraphStyles: [{
//                     id: "default",
//                     name: "Default",
//                     basedOn: "Normal",
//                     next: "Normal",
//                     run: { font: "Times New Roman", size: 20 }, // 10pt = 20 half-points
//                 }]
//             }
//         });
//         const blob = await Packer.toBlob(docx);
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${title}.docx`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
//       } else if (format === 'latex') {
//         // For LaTeX, the content should already be in the correct format
//         const blob = new Blob([content], { type: 'text/x-latex' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${title}.tex`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error("Export error:", error);
//       alert("Export failed. The AI-generated content might not be compatible with the chosen format.");
//     }
//   };

//   if (!document) {
//     return (
//       <Card className="bg-paper shadow-sm border border-gray-200">
//         <CardContent className="p-6">
//           <div className="text-center py-12">
//             <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
//             <h3 className="text-lg font-medium text-gray-500 mb-2">No Document Loaded</h3>
//             <p className="text-sm text-gray-400">Upload a PDF to see the IEEE formatted preview</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const formattedContent = document.sections?.[0]?.content || "";

//   return (
//     <Card className="bg-paper shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between p-6 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-secondary">
//           <i className="fas fa-eye mr-2 text-primary"></i>IEEE Preview
//         </h2>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleZoomOut}
//               disabled={zoomLevel <= 50}
//             >
//               <i className="fas fa-search-minus"></i>
//             </Button>
//             <span className="text-sm text-gray-600 min-w-12 text-center">{zoomLevel}%</span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleZoomIn}
//               disabled={zoomLevel >= 200}
//             >
//               <i className="fas fa-search-plus"></i>
//             </Button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button
//               onClick={() => handleExport('pdf')}
//               className="bg-accent text-white hover:bg-green-600"
//               disabled={!document}
//               size="sm"
//             >
//               <i className="fas fa-file-pdf mr-2"></i>PDF
//             </Button>
//             <Button
//               onClick={() => handleExport('docx')}
//               className="bg-blue-600 text-white hover:bg-blue-700"
//               disabled={!document}
//               size="sm"
//             >
//               <i className="fas fa-file-word mr-2"></i>DOCX
//             </Button>
//             <Button
//               onClick={() => handleExport('latex')}
//               className="bg-purple-600 text-white hover:bg-purple-700"
//               disabled={!document}
//               size="sm"
//             >
//               <i className="fas fa-code mr-2"></i>LaTeX
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 bg-gray-50 min-h-96 overflow-auto">
//         <div
//           className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto transition-transform ieee-document p-12"
//           style={{
//             transform: `scale(${zoomLevel / 100})`,
//             transformOrigin: 'top center',
//             minHeight: '842px',
//             fontFamily: 'Times New Roman, serif',
//             fontSize: '10pt',
//             color: '#000000',
//             whiteSpace: 'pre-wrap', // Crucial for preserving AI's formatting
//             textAlign: 'left',
//           }}
//         >
//           {formattedContent}
//         </div>
//       </div>
//     </Card>
//   );
// }


// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { useState, useEffect } from "react";
// // import jsPDF from "jspdf";
// // import { Document as DocxDocument, Packer, Paragraph, TextRun } from "docx";

// // // Helper to detect if the content is likely LaTeX
// // const isLatexContent = (content: string) => {
// //   return content.trim().startsWith('\\documentclass');
// // };

// // // Helper to create the URL for the LaTeX rendering service
// // const getLatexImageUrl = (latexContent: string) => {
// //   const encodedLatex = encodeURIComponent(latexContent);
// //   // Using an external service for rendering. This provides a high-fidelity preview without a backend.
// //   return `https://quicklatex.com/latex3.f/qlrender.cgi?formula=${encodedLatex}&fsize=11pt&fcolor=000000&mode=0&out=1&remhost=quicklatex.com&preamble=\\usepackage{amsmath}\\usepackage{amsfonts}\\usepackage{amssymb}`;
// // };

// // interface DocumentPreviewProps {
// //   document: any;
// //   documentId?: number;
// // }

// // export function DocumentPreview({ document }: DocumentPreviewProps) {
// //   const [zoomLevel, setZoomLevel] = useState(100);
// //   const [latexPreviewUrl, setLatexPreviewUrl] = useState<string | null>(null);
// //   const [isLoadingPreview, setIsLoadingPreview] = useState(false);

// //   const formattedContent = document?.sections?.[0]?.content || "";
// //   const isLatex = isLatexContent(formattedContent);

// //   useEffect(() => {
// //     if (isLatex) {
// //       setIsLoadingPreview(true);
// //       // Generate the URL for the LaTeX image preview
// //       const imageUrl = getLatexImageUrl(formattedContent);
// //       setLatexPreviewUrl(imageUrl);
// //       // A small delay to allow the image to load
// //       setTimeout(() => setIsLoadingPreview(false), 1500);
// //     } else {
// //       setLatexPreviewUrl(null);
// //     }
// //   }, [formattedContent, isLatex]);


// //   const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200));
// //   const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));

// //   const handleExport = async (format: 'pdf' | 'docx' | 'latex') => {
// //     if (!document) return;
// //     const content = formattedContent;
// //     const title = document.title || 'document';

// //     try {
// //       if (format === 'latex') {
// //         // For LaTeX, export the raw, perfect code from the AI
// //         const blob = new Blob([content], { type: 'text/x-latex' });
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = `${title}.tex`;
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //       } else if (format === 'pdf') {
// //          // PDF export from plain text
// //         const pdf = new jsPDF();
// //         pdf.setFont("Times", "Roman");
// //         pdf.setFontSize(10);
// //         const lines = pdf.splitTextToSize(content, 180);
// //         pdf.text(lines, 15, 15);
// //         pdf.save(`${title}.pdf`);
// //       } else if (format === 'docx') {
// //         // DOCX export from plain text
// //         const paragraphs = content.split('\n').map(line => new Paragraph({ children: [new TextRun(line)] }));
// //         const docx = new DocxDocument({ sections: [{ children: paragraphs }] });
// //         const blob = await Packer.toBlob(docx);
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = `${title}.docx`;
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //       }
// //     } catch (error) {
// //       console.error("Export error:", error);
// //       alert("Export failed. For best results with LaTeX, use the 'LaTeX' export option and a dedicated compiler like Overleaf.");
// //     }
// //   };

// //   const renderPreview = () => {
// //     if (isLoadingPreview) {
// //       return <div className="text-center p-12">Loading PDF Preview...</div>;
// //     }

// //     if (isLatex && latexPreviewUrl) {
// //       return <img src={latexPreviewUrl} alt="LaTeX Preview" style={{ width: '100%', border: '1px solid #ccc' }} />;
// //     }

// //     // Fallback for non-LaTeX or if the image fails
// //     return (
// //       <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'Times New Roman, serif', fontSize: '10pt' }}>
// //         {formattedContent}
// //       </div>
// //     );
// //   };

// //   if (!document) {
// //     return (
// //         <Card className="bg-paper shadow-sm border border-gray-200">
// //             <CardContent className="p-6 text-center py-12">
// //                 <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
// //                 <h3 className="text-lg font-medium text-gray-500 mb-2">No Document Loaded</h3>
// //                 <p className="text-sm text-gray-400">Upload a PDF to see the IEEE formatted preview</p>
// //             </CardContent>
// //         </Card>
// //     );
// //   }

// //   return (
// //     <Card className="bg-paper shadow-sm border border-gray-200">
// //       <div className="flex items-center justify-between p-6 border-b border-gray-200">
// //         <h2 className="text-lg font-semibold text-secondary">
// //           <i className="fas fa-eye mr-2 text-primary"></i>IEEE Preview
// //         </h2>
// //         <div className="flex items-center space-x-4">
// //           <div className="flex items-center space-x-2">
// //             <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
// //               <i className="fas fa-search-minus"></i>
// //             </Button>
// //             <span className="text-sm text-gray-600 min-w-12 text-center">{zoomLevel}%</span>
// //             <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
// //               <i className="fas fa-search-plus"></i>
// //             </Button>
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <Button onClick={() => handleExport('pdf')} size="sm" disabled={!document || isLatex}>PDF</Button>
// //             <Button onClick={() => handleExport('docx')} size="sm" disabled={!document || isLatex}>DOCX</Button>
// //             <Button onClick={() => handleExport('latex')} size="sm" disabled={!document || !isLatex}>LaTeX</Button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="p-6 bg-gray-50 min-h-96 overflow-auto">
// //         <div
// //           className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto transition-transform p-4"
// //           style={{
// //             transform: `scale(${zoomLevel / 100})`,
// //             transformOrigin: 'top center',
// //           }}
// //         >
// //           {renderPreview()}
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // }



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import { Document as DocxDocument, Packer, Paragraph, TextRun } from "docx";

interface DocumentPreviewProps {
  document: any;
  documentId?: number;
}

export function DocumentPreview({ document, documentId }: DocumentPreviewProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isExporting, setIsExporting] = useState(false);
  const [showLatex, setShowLatex] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Check if running in browser environment
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
      setIsBrowser(true);
    }
  }, []);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const generateIEEEpdf = async (latexContent: string, title: string, document: any) => {
    setIsLoading(true);

    try {
      // Attempt LaTeX-to-PDF via proxy server
      try {
        const response = await fetch('http://localhost:3000/latex-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: latexContent })
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          setIsLoading(false);
          return url;
        } else {
          throw new Error(`LaTeX service failed: ${response.statusText}`);
        }
      } catch (error) {
        console.error("LaTeX service error:", error);
      }

      // Fallback to jsPDF with enhanced IEEE-like formatting
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      // IEEE style: Times New Roman, 10pt, two-column layout
      pdf.setFont("times", "normal");
      pdf.setFontSize(10);

      // Set IEEE margins (0.75 inches = 54pt)
      const margin = 54;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const columnWidth = (pageWidth - 2 * margin - 18) / 2; // 0.25-inch gap = 18pt
      const column1X = margin;
      const column2X = margin + columnWidth + 18;

      // Header (IEEE conference name)
      pdf.setFontSize(8);
      pdf.setFont("times", "italic");
      pdf.text("2025 IEEE Conference", margin, 20);
      pdf.setFont("times", "normal");

      // Footer (page number)
      pdf.text(`Page ${pdf.getCurrentPageInfo().pageNumber}`, pageWidth - margin - 30, pageHeight - 20);

      // Title
      pdf.setFontSize(16);
      pdf.setFont("times", "bold");
      const titleWidth = pdf.getTextWidth(title);
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(title, titleX, 50);
      pdf.setLineWidth(0.5);
      pdf.line(margin, 60, pageWidth - margin, 60);

      // Author and affiliation
      pdf.setFontSize(10);
      pdf.setFont("times", "normal");
      const author = document.authors?.[0] || "Author Name";
      const affiliation = document.affiliations?.[0] || "Institution";
      const authorWidth = pdf.getTextWidth(author);
      const authorX = (pageWidth - authorWidth) / 2;
      pdf.text(author, authorX, 80);
      const affWidth = pdf.getTextWidth(affiliation);
      const affX = (pageWidth - affWidth) / 2;
      pdf.text(affiliation, affX, 95);

      // Abstract
      pdf.setFontSize(9);
      pdf.setFont("times", "bold");
      pdf.text("Abstract", margin, 120);
      pdf.setFont("times", "italic");
      const abstractText = document.abstract || latexContent.slice(0, 200).replace(/\\\[a-zA-Z]+{[^}]*}/g, '').replace(/\\\[a-zA-Z]+/g, '').replace(/\[conference\]|\[IEEEtran\]|\[IEEEEman\]/g, '') + "...";
      pdf.text(abstractText, margin, 135, { maxWidth: pageWidth - 2 * margin });

      // Main content (two-column layout with section and reference detection)
      pdf.setFont("times", "normal");
      pdf.setFontSize(10);
      const cleanContent = latexContent.replace(/\\\[a-zA-Z]+{[^}]*}/g, '').replace(/\\\[a-zA-Z]+/g, '').replace(/\[conference\]|\[IEEEtran\]|\[IEEEEman\]/g, '');
      const lines = pdf.splitTextToSize(cleanContent, columnWidth);
      let yPos = 160;
      let isReferences = false;

      for (let i = 0; i < lines.length; i++) {
        if (yPos > pageHeight - margin - 20) {
          pdf.addPage();
          yPos = margin;
          pdf.setFontSize(8);
          pdf.setFont("times", "italic");
          pdf.text("2025 IEEE Conference", margin, 20);
          pdf.setFont("times", "normal");
          pdf.text(`Page ${pdf.getCurrentPageInfo().pageNumber}`, pageWidth - margin - 30, pageHeight - 20);
          pdf.setFontSize(10);
        }
        if (lines[i].match(/^(I\.|II\.|III\.|IV\.|V\.)/)) {
          pdf.setFont("times", "bold");
          pdf.setFontSize(11);
          pdf.text(lines[i], column1X, yPos);
          pdf.setFont("times", "normal");
          pdf.setFontSize(10);
          yPos += 14;
        } else if (lines[i].toLowerCase().includes("references")) {
          isReferences = true;
          pdf.setFont("times", "bold");
          pdf.setFontSize(11);
          pdf.text("References", column1X, yPos);
          pdf.setFont("times", "normal");
          pdf.setFontSize(9);
          yPos += 14;
        } else {
          if (isReferences) {
            pdf.setFontSize(9);
            pdf.text(lines[i], column1X + 10, yPos, { maxWidth: pageWidth - 2 * margin - 10 });
            yPos += 12;
          } else {
            if (i % 2 === 0) {
              pdf.text(lines[i], column1X, yPos);
            } else {
              pdf.text(lines[i], column2X, yPos);
              yPos += 12;
            }
          }
        }
      }

      // Add citations if present
      if (document.references?.length) {
        if (yPos > pageHeight - margin - 50) {
          pdf.addPage();
          yPos = margin;
          pdf.setFontSize(8);
          pdf.setFont("times", "italic");
          pdf.text("2025 IEEE Conference", margin, 20);
          pdf.setFont("times", "normal");
          pdf.text(`Page ${pdf.getCurrentPageInfo().pageNumber}`, pageWidth - margin - 30, pageHeight - 20);
        }
        pdf.setFont("times", "bold");
        pdf.setFontSize(11);
        pdf.text("References", column1X, yPos);
        pdf.setFont("times", "normal");
        pdf.setFontSize(9);
        yPos += 14;
        document.references.forEach((ref: string, index: number) => {
          pdf.text(`[${index + 1}] ${ref}`, column1X + 10, yPos, { maxWidth: pageWidth - 2 * margin - 10 });
          yPos += 12;
        });
      }

      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsLoading(false);
      return url;
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF preview. Please try again.");
      setIsLoading(false);
      return null;
    }
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (!document || !previewRef.current || !isBrowser) {
      alert("Export is not available in this environment.");
      return;
    }
    
    setIsExporting(true);

    const content = document.sections?.[0]?.content || "";
    const title = document.title || 'Document';

    try {
      if (format === 'pdf') {
        const pdfUrlFinal = pdfUrl || (await generateIEEEpdf(content, title, document));
        if (!pdfUrlFinal) {
          throw new Error("No PDF URL available for export.");
        }
        const response = await fetch(pdfUrlFinal);
        if (!response.ok) {
          throw new Error("Failed to fetch PDF for export.");
        }
        const blob = await response.blob();
        const a = window.document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${title}.pdf`;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);

      } else if (format === 'docx') {
        const paragraphs = content.split('\n').map((line: string) => new Paragraph({
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
              run: { font: "Times New Roman", size: 20 }
            }]
          }
        });
        const blob = await Packer.toBlob(docx);
        const url = URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = `${title}.docx`;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Export failed. Please ensure the content is compatible and try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDisplayLatex = () => {
    setShowLatex(!showLatex);
  };

  // Generate PDF preview when document changes
  useEffect(() => {
    if (document && document.sections?.[0]?.content) {
      generateIEEEpdf(document.sections[0].content, document.title || 'Document', document);
    }
    // Cleanup previous pdfUrl to prevent memory leaks
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    };
  }, [document]);

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
              disabled={!document || isExporting || isLoading || !isBrowser}
              size="sm"
            >
              {isExporting ? <><i className="fas fa-spinner fa-spin mr-2"></i>Exporting...</> : <><i className="fas fa-file-pdf mr-2"></i>PDF</>}
            </Button>
            <Button
              onClick={() => handleExport('docx')}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={!document || isExporting || !isBrowser}
              size="sm"
            >
              <i className="fas fa-file-word mr-2"></i>DOCX
            </Button>
            <Button
              onClick={handleDisplayLatex}
              className="bg-purple-600 text-white hover:bg-purple-700"
              disabled={!document}
              size="sm"
            >
              <i className="fas fa-code mr-2"></i>{showLatex ? "Hide LaTeX" : "Display LaTeX"}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 min-h-96 overflow-auto">
        {showLatex ? (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-12">
            <h3 className="text-lg font-semibold mb-4">LaTeX Code</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto" style={{ fontSize: '10pt', whiteSpace: 'pre-wrap' }}>
              {formattedContent}
            </pre>
            <Button
              onClick={() => navigator.clipboard.writeText(formattedContent)}
              className="mt-4 bg-gray-500 text-white hover:bg-gray-600"
              size="sm"
            >
              <i className="fas fa-copy mr-2"></i>Copy LaTeX
            </Button>
          </div>
        ) : (
          <div
            ref={previewRef}
            className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto transition-transform ieee-document p-12"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              minHeight: '842pt'
            }}
          >
            {isLoading ? (
              <p>Loading IEEE PDF preview...</p>
            ) : pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-96 border"
                title="IEEE PDF Preview"
              ></iframe>
            ) : (
              <p>Failed to load PDF preview. Please try again.</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}


