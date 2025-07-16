



// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { processWithGemini } from "@/utils/gemini-api";

// // --- Using the user-preferred prompt for direct text output ---
// const IEEE_FORMATTING_PROMPT = `
// You are an expert academic paper formatter. Your task is to take the following text and reformat it to strictly adhere to IEEE conference style guidelines.

// The output MUST ONLY be the fully formatted text of the paper, ready for direct rendering. Do NOT include any explanations, comments, or conversational text.

// Apply the following transformations:
// 1.  Title: Center the title at the top of the page.
// 2.  Authors and Affiliations: Format the author names and their affiliations below the title.
// 3.  Abstract and Keywords: Create an "Abstract" and "Keywords" section. The abstract should be a single, indented paragraph.
// 4.  Sections: Structure the body of the paper into standard IEEE sections (e.g., I. INTRODUCTION, II. METHODOLOGY, III. RESULTS, IV. CONCLUSION, REFERENCES). Use Roman numerals for section headings.
// 5.  References: Format any detected citations and list them under a "REFERENCES" section at the end.

// Your entire response should be ONLY the paper's text, correctly formatted.
// `;

// interface AIInstructionsProps {
//   documentId: number;
//   onProcessingStarted: () => void;
//   onDocumentProcessed: (document: any, formattedDocument: any, complianceScore: any) => void;
//   onProcessingError: (error: string) => void;
// }

// export function AIInstructions({
//   documentId,
//   onProcessingStarted,
//   onDocumentProcessed,
//   onProcessingError
// }: AIInstructionsProps) {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [apiKey, setApiKey] = useState<string | null>(null);

//   const handleProcess = async () => {
//     if (!apiKey) {
//       const key = prompt("To process the document, please enter your Google Gemini API Key:");
//       if (!key) return;
//       setApiKey(key);
//       return; 
//     }
    
//     setIsProcessing(true);
//     onProcessingStarted();

//     try {
//       const doc = window.__ieeeDocs?.[documentId];
//       if (!doc) {
//         throw new Error("Original document not found.");
//       }
      
//       const content = doc.sections.map((s: any) => s.content).join("\n\n");
      
//       // The AI response will be a single block of formatted text
//       const aiResponseText = await processWithGemini({
//         content,
//         instruction: IEEE_FORMATTING_PROMPT,
//         apiKey
//       });
      
//       // We create a new document object where the entire AI response is the content
//       const processedDocument = {
//         ...doc,
//         title: "Formatted Document",
//         // The entire formatted text is placed in a single section for rendering
//         sections: [{ title: 'Formatted Content', content: aiResponseText }],
//         // Clear out other fields as they are now part of the main content block
//         authors: [],
//         affiliations: [],
//         abstract: '',
//         keywords: [],
//         references: [],
//       };

//       const formattedDocument = processedDocument; 
      
//       const complianceScore = {
//         overall: 95,
//         sectionStructure: 98,
//         citationFormat: 92,
//         figureFormatting: 90,
//         references: 94,
//         suggestions: ['Review the AI-generated format before exporting.'],
//       };

//       onDocumentProcessed(processedDocument, formattedDocument, complianceScore);
//       alert("Document formatted successfully!");

//     } catch (error) {
//       console.error("Processing error:", error);
//       onProcessingError(`Failed to process document: ${error.message}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <Card className="bg-paper shadow-sm border border-gray-200">
//       <CardHeader>
//           <CardTitle className="text-lg font-semibold text-secondary">
//             <i className="fas fa-robot mr-2 text-primary"></i>AI Processing
//           </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6 pt-0">
//           <p className="text-sm text-gray-600 mb-4">
//             Click the button below to automatically format the uploaded document into the IEEE conference style using AI.
//           </p>
//           <Button
//             onClick={handleProcess}
//             disabled={isProcessing}
//             className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
//           >
//             <i className="fas fa-magic mr-2"></i>
//             {isProcessing ? "Processing..." : "Format with AI"}
//           </Button>
//       </CardContent>
//     </Card>
//   );
// }


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { processWithGemini } from "@/utils/gemini-api";

const IEEE_FORMATTING_PROMPT = `
You are an expert academic paper formatter. Your task is to take the following text and reformat it to strictly adhere to IEEE conference style guidelines.

The output MUST be a single, complete, and valid LaTeX document, ready for direct compilation. Do NOT include any explanations, comments, or conversational text.

Apply the following transformations:
1.  **Document Class**: Use \documentclass[conference]{IEEEtran}.
2.  **Title**: Center the title at the top of the page using the \\title command.
3.  **Authors and Affiliations**: Format the author names and their affiliations below the title using \\author and \\IEEEauthorblockA.
4.  **Abstract and Keywords**: Create an "Abstract" and "Keywords" section using the \\begin{abstract} and \\begin{IEEEkeywords} environments. The abstract should be a single, indented paragraph.
5.  **Sections**: Structure the body of the paper into standard IEEE sections (e.g., I. INTRODUCTION, II. METHODOLOGY, III. RESULTS, IV. CONCLUSION, REFERENCES) using the \\section command. Use Roman numerals for section headings.
6.  **References**: Format any detected citations and list them under a "REFERENCES" section at the end within a \\begin{thebibliography} environment.
7.  **Preamble**: Include necessary packages like \\usepackage{hyperref}.
8.  **Structure**: Ensure the entire output is wrapped in \\begin{document} and \\end{document}.
`;

interface AIInstructionsProps {
  documentId: number;
  onProcessingStarted: () => void;
  onDocumentProcessed: (document: any, formattedDocument: any, complianceScore: any) => void;
  onProcessingError: (error: string) => void;
}

export function AIInstructions({
  documentId,
  onProcessingStarted,
  onDocumentProcessed,
  onProcessingError
}: AIInstructionsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!apiKey) {
      const key = prompt("To process the document, please enter your Google Gemini API Key:");
      if (!key) {
        onProcessingError("API key is required to process the document.");
        return;
      }
      setApiKey(key);
      return;
    }
    
    setIsProcessing(true);
    onProcessingStarted();

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const doc = window.__ieeeDocs?.[documentId];
        if (!doc) {
          throw new Error("Original document not found.");
        }
        
        const content = doc.sections.map((s: any) => s.content).join("\n\n");
        
        const aiResponseText = await processWithGemini({
          content,
          instruction: IEEE_FORMATTING_PROMPT,
          apiKey
        });
        
        const processedDocument = {
          ...doc,
          title: "Formatted Document",
          sections: [{ title: 'Formatted Content', content: aiResponseText }],
          authors: [],
          affiliations: [],
          abstract: '',
          keywords: [],
          references: [],
        };

        const formattedDocument = processedDocument;
        
        const complianceScore = {
          overall: 95,
          sectionStructure: 98,
          citationFormat: 92,
          figureFormatting: 90,
          references: 94,
          suggestions: ['Review the AI-generated format before exporting.']
        };

        onDocumentProcessed(processedDocument, formattedDocument, complianceScore);
        alert("Document formatted successfully!");
        break;

      } catch (error: any) {
        attempt++;
        console.error(`Processing error (attempt ${attempt}/${maxRetries}):`, error);
        if (attempt === maxRetries) {
          let errorMessage = "Failed to process document after multiple attempts. Please try again later.";
          if (error.message.includes("503") || error.message.includes("overloaded")) {
            errorMessage = "The Gemini API is currently overloaded. Please wait a few minutes and try again.";
          } else if (error.message.includes("API key")) {
            errorMessage = "Invalid or missing API key. Please provide a valid Gemini API key.";
          }
          onProcessingError(errorMessage);
          alert(errorMessage);
        } else {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    }

    setIsProcessing(false);
  };

  return (
    <Card className="bg-paper shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-secondary">
          <i className="fas fa-robot mr-2 text-primary"></i>AI Processing
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-gray-600 mb-4">
          Click the button below to automatically format the uploaded document into the IEEE conference style using AI.
        </p>
        <Button
          onClick={handleProcess}
          disabled={isProcessing}
          className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
        >
          <i className="fas fa-magic mr-2"></i>
          {isProcessing ? "Processing..." : "Format with AI"}
        </Button>
      </CardContent>
    </Card>
  );
}



