// import { useState, useRef } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { apiRequest } from "@/lib/queryClient";
// import { Document, ComplianceScore } from "@shared/schema";

// interface FileUploadProps {
//   onDocumentUploaded: (document: Document, formattedDocument: any, complianceScore: ComplianceScore) => void;
// }

// export function FileUpload({ onDocumentUploaded }: FileUploadProps) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileSelect = (file: File) => {
//     if (file.type !== "application/pdf") {
//       alert("Please select a PDF file");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       alert("File size must be less than 10MB");
//       return;
//     }

//     uploadFile(file);
//   };

//   const uploadFile = async (file: File) => {
//     setIsUploading(true);
//     setUploadProgress(0);

//     try {
//       const formData = new FormData();
//       formData.append("pdf", file);

//       // Simulate progress for better UX
//       const progressInterval = setInterval(() => {
//         setUploadProgress(prev => Math.min(prev + 10, 90));
//       }, 200);

//       const response = await fetch("/api/documents/upload", {
//         method: "POST",
//         body: formData,
//       });

//       clearInterval(progressInterval);
//       setUploadProgress(100);

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Upload failed");
//       }

//       const data = await response.json();
//       onDocumentUploaded(data.document, data.formattedDocument, data.complianceScore);

//     } catch (error) {
//       console.error("Upload error:", error);
//       alert(`Upload failed: ${error}`);
//     } finally {
//       setIsUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   };

//   return (
//     <Card className="bg-paper shadow-sm border border-gray-200">
//       <CardContent className="p-6">
//         <h2 className="text-lg font-semibold text-secondary mb-4">
//           <i className="fas fa-upload mr-2 text-primary"></i>Upload Research Paper
//         </h2>
        
//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
//             isDragging
//               ? "border-primary bg-blue-50"
//               : "border-gray-300 hover:border-primary"
//           }`}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={handleClick}
//         >
//           <i className="fas fa-file-pdf text-4xl text-gray-400 mb-4"></i>
//           <p className="text-gray-600 mb-2">Drop your PDF here or click to browse</p>
//           <p className="text-sm text-gray-500">Supports PDF files up to 10MB</p>
          
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".pdf"
//             className="hidden"
//             onChange={handleFileInputChange}
//           />
//         </div>
        
//         {isUploading && (
//           <div className="mt-4">
//             <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//               <span>Extracting content...</span>
//               <span>{uploadProgress}%</span>
//             </div>
//             <Progress value={uploadProgress} className="w-full" />
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }



import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onDocumentUploaded: (document: any, formattedDocument: any, complianceScore: any) => void;
}

export function FileUpload({ onDocumentUploaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Simulate file processing
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for processing

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Simulate document processing
      const document = { id: 1, title: file.name }; // Mock document object
      const formattedDocument = { citations: [], figures: [] }; // Mock formatted document
      const complianceScore = { overall: 100, sectionStructure: 100, citationFormat: 100, figureFormatting: 100, references: 100, suggestions: [] }; // Mock compliance score

      onDocumentUploaded(document, formattedDocument, complianceScore);

    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <Card className="bg-paper shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-secondary mb-4">
          <i className="fas fa-upload mr-2 text-primary"></i>Upload Research Paper
        </h2>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-blue-50"
              : "border-gray-300 hover:border-primary"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <i className="fas fa-file-pdf text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-600 mb-2">Drop your PDF here or click to browse</p>
          <p className="text-sm text-gray-500">Supports PDF files up to 10MB</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
        
        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Extracting content...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
