import { useState } from "react";
import { Header } from "@/components/header";
import { FileUploader } from "@/components/file-uploader";
import { DocumentPreview } from "@/components/document-preview";
import { ComplianceScore } from "@/components/compliance-score";
import { AIInstructions } from "@/components/ai-instructions";
import { DocumentHistory } from "@/components/document-history";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/toaster";

declare global {
  interface Window {
    __ieeeDocs?: Record<number, any>;
  }
}

export default function DocumentWorkspace() {
  const [documentId, setDocumentId] = useState<number | null>(null);
  // This state now holds only the raw LaTeX string from the AI
  const [formattedLatex, setFormattedLatex] = useState<string | null>(null);
  const [complianceScore, setComplianceScore] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUploaded = (doc: any, docId: number) => {
    if (!window.__ieeeDocs) {
      window.__ieeeDocs = {};
    }
    window.__ieeeDocs[docId] = doc;
    setDocumentId(docId);
    setFormattedLatex(null);
    setComplianceScore(null);
  };

  const handleProcessingStarted = () => {
    setIsProcessing(true);
    setFormattedLatex(null);
  };

  // The processed document is now just a LaTeX string
  const handleDocumentProcessed = (latexString: string, compliance: any) => {
    setFormattedLatex(latexString);
    setComplianceScore(compliance);
    setIsProcessing(false);
  };

  const handleProcessingError = (error: string) => {
    console.error("Processing Error:", error);
    alert(error); // Notify the user
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={25} minSize={20} className="p-4 flex flex-col space-y-4">
            <FileUploader onFileUploaded={handleFileUploaded} />
            {documentId !== null && (
              <AIInstructions
                documentId={documentId}
                onProcessingStarted={handleProcessingStarted}
                onDocumentProcessed={handleDocumentProcessed}
                onProcessingError={handleProcessingError}
              />
            )}
            {complianceScore && <ComplianceScore score={complianceScore} />}
            <DocumentHistory />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75}>
            <div className="p-4 h-full">
              {isProcessing ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
                    <p className="text-lg text-gray-600">AI is formatting your document...</p>
                  </div>
                </div>
              ) : (
                <DocumentPreview formattedLatex={formattedLatex} />
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <Toaster />
    </div>
  );
}