// import { useState } from "react";
// import { FileUpload } from "@/components/file-upload";
// import { AIInstructions } from "@/components/ai-instructions";
// import { ComplianceScore } from "@/components/compliance-score";
// import { DocumentPreview } from "@/components/document-preview";
// import { ProcessingModal } from "@/components/processing-modal";
// import { CollaborationPanel } from "@/components/collaboration-panel";
// import { CitationManager } from "@/components/citation-manager";
// import { useQuery } from "@tanstack/react-query";
// import { useToast } from "@/hooks/use-toast";
// import { Document, ComplianceScore as ComplianceScoreType } from "@shared/schema";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function Home() {
//   const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
//   const [formattedDocument, setFormattedDocument] = useState<any>(null);
//   const [complianceScore, setComplianceScore] = useState<ComplianceScoreType | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { toast } = useToast();

//   const handleDocumentUploaded = (document: Document, formatted: any, compliance: ComplianceScoreType) => {
//     setCurrentDocument(document);
//     setFormattedDocument(formatted);
//     setComplianceScore(compliance);
//     toast({
//       title: "Document Uploaded Successfully",
//       description: "Your paper has been processed and formatted according to IEEE standards.",
//     });
//   };

//   const handleDocumentProcessed = (document: Document, formatted: any, compliance: ComplianceScoreType) => {
//     setCurrentDocument(document);
//     setFormattedDocument(formatted);
//     setComplianceScore(compliance);
//     setIsProcessing(false);
//     toast({
//       title: "Document Processed Successfully",
//       description: "Your paper has been updated with AI-powered improvements.",
//     });
//   };

//   const handleProcessingStarted = () => {
//     setIsProcessing(true);
//   };

//   const handleProcessingError = (error: string) => {
//     setIsProcessing(false);
//     toast({
//       title: "Processing Error",
//       description: error,
//       variant: "destructive",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-surface">
//       {/* Header */}
//       <header className="bg-paper shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <i className="fas fa-file-alt text-2xl text-primary"></i>
//               <div>
//                 <h1 className="text-xl font-semibold text-secondary">IEEE Paper Formatter</h1>
//                 <p className="text-sm text-gray-500">AI-Powered Academic Writing Tool</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
//                 <i className="fas fa-question-circle mr-2"></i>Help
//               </button>
//               <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
//                 <i className="fas fa-save mr-2"></i>Save Project
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Panel - Upload & Controls */}
//           <div className="lg:col-span-1 space-y-6">
//             <FileUpload onDocumentUploaded={handleDocumentUploaded} />
            
//             {currentDocument && (
//               <AIInstructions 
//                 documentId={currentDocument.id}
//                 onProcessingStarted={handleProcessingStarted}
//                 onDocumentProcessed={handleDocumentProcessed}
//                 onProcessingError={handleProcessingError}
//               />
//             )}
            
//             {complianceScore && (
//               <ComplianceScore score={complianceScore} />
//             )}
//           </div>

//           {/* Main Panel - Preview & Export */}
//           <div className="lg:col-span-2 space-y-6">
//             <DocumentPreview 
//               document={formattedDocument} 
//               documentId={currentDocument?.id}
//             />
//           </div>

//           {/* Right Panel - Collaboration */}
//           <div className="lg:col-span-1">
//             <Tabs defaultValue="collaboration" className="w-full">
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="collaboration">Collaborate</TabsTrigger>
//                 <TabsTrigger value="citations">Citations</TabsTrigger>
//                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
//               </TabsList>
//               <TabsContent value="collaboration">
//                 <CollaborationPanel />
//               </TabsContent>
//               <TabsContent value="citations">
//                 <CitationManager 
//                   documentId={currentDocument?.id}
//                   citations={formattedDocument?.citations || []}
//                   figures={formattedDocument?.figures || []}
//                 />
//               </TabsContent>
//               <TabsContent value="analytics">
//                 <div className="p-4 text-center text-gray-500">
//                   <i className="fas fa-chart-bar text-4xl mb-4"></i>
//                   <p>Analytics coming soon</p>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>

//       {/* Processing Modal */}
//       {isProcessing && <ProcessingModal />}
//     </div>
//   );
// }


import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { AIInstructions } from "@/components/ai-instructions";
import { ComplianceScore } from "@/components/compliance-score";
import { DocumentPreview } from "@/components/document-preview";
import { ProcessingModal } from "@/components/processing-modal";
import { CollaborationPanel } from "@/components/collaboration-panel";
import { CitationManager } from "@/components/citation-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [currentDocument, setCurrentDocument] = useState<any>(null);
  const [formattedDocument, setFormattedDocument] = useState<any>(null);
  const [complianceScore, setComplianceScore] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDocumentUploaded = (document: any, formatted: any, compliance: any) => {
    setCurrentDocument(document);
    setFormattedDocument(formatted);
    setComplianceScore(compliance);
  };

  const handleDocumentProcessed = (document: any, formatted: any, compliance: any) => {
    setCurrentDocument(document);
    setFormattedDocument(formatted);
    setComplianceScore(compliance);
    setIsProcessing(false);
  };

  const handleProcessingStarted = () => {
    setIsProcessing(true);
  };

  const handleProcessingError = (error: string) => {
    setIsProcessing(false);
    alert(`Processing Error: ${error}`);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-paper shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <i className="fas fa-file-alt text-2xl text-primary"></i>
              <div>
                <h1 className="text-xl font-semibold text-secondary">IEEE Paper Formatter</h1>
                <p className="text-sm text-gray-500">AI-Powered Academic Writing Tool</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                <i className="fas fa-question-circle mr-2"></i>Help
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                <i className="fas fa-save mr-2"></i>Save Project
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload onDocumentUploaded={handleDocumentUploaded} />
            
            {currentDocument && (
              <AIInstructions 
                documentId={currentDocument.id}
                onProcessingStarted={handleProcessingStarted}
                onDocumentProcessed={handleDocumentProcessed}
                onProcessingError={handleProcessingError}
              />
            )}
            
            {complianceScore && (
              <ComplianceScore score={complianceScore} />
            )}
          </div>

          {/* Main Panel - Preview & Export */}
          <div className="lg:col-span-2 space-y-6">
            <DocumentPreview 
              document={formattedDocument} 
              documentId={currentDocument?.id}
            />
          </div>

          {/* Right Panel - Collaboration */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="collaboration" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="collaboration">Collaborate</TabsTrigger>
                <TabsTrigger value="citations">Citations</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="collaboration">
                <CollaborationPanel />
              </TabsContent>
              <TabsContent value="citations">
                <CitationManager 
                  citations={formattedDocument?.citations || []}
                  figures={formattedDocument?.figures || []}
                />
              </TabsContent>
              <TabsContent value="analytics">
                <div className="p-4 text-center text-gray-500">
                  <i className="fas fa-chart-bar text-4xl mb-4"></i>
                  <p>Analytics coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isProcessing && <ProcessingModal />}
    </div>
  );
}
