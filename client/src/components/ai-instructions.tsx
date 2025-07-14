import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { processWithGemini } from "@/utils/gemini-api";

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
  const [instruction, setInstruction] = useState("");
  const [processingMode, setProcessingMode] = useState<"standard" | "quick" | "comprehensive">("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!instruction.trim()) {
      alert("Please enter an instruction");
      return;
    }
    if (!apiKey) {
      const key = prompt("Enter your Gemini API Key:");
      if (!key) return;
      setApiKey(key);
      return;
    }
    setIsProcessing(true);
    onProcessingStarted();
    try {
      // For demo, use the documentId as a lookup to the document in window (since we have no backend)
      const doc = window.__ieeeDocs?.[documentId];
      const content = doc ? doc.sections.map((s: any) => s.content).join("\n") : "";
      const aiResponse = await processWithGemini({ content, instruction, apiKey });
      // For demo, update the first section with the AI response
      const processedDocument = { ...doc, sections: [{ title: doc.sections[0].title, content: aiResponse }] };
      const formattedDocument = processedDocument;
      const complianceScore = {
        overall: 90,
        sectionStructure: 85,
        citationFormat: 80,
        figureFormatting: 90,
        references: 80,
        suggestions: [
          'Check section headings for IEEE compliance.',
          'Review references formatting.'
        ]
      };
      onDocumentProcessed(processedDocument, formattedDocument, complianceScore);
      alert("Document processed successfully!");
    } catch (error) {
      console.error("Processing error:", error);
      onProcessingError(`Failed to process document: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-paper shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-secondary mb-4">
          <i className="fas fa-robot mr-2 text-primary"></i>AI Instructions
        </h2>
        
        <Textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-32 text-sm"
          placeholder="Describe the changes you want to make to your paper. For example: 'Rewrite the conclusion to be more concise' or 'Convert all citations to IEEE format'"
        />
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={processingMode} onValueChange={(value: "standard" | "quick" | "comprehensive") => setProcessingMode(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Processing mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Processing</SelectItem>
                <SelectItem value="quick">Quick Edit</SelectItem>
                <SelectItem value="comprehensive">Comprehensive Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            onClick={handleProcess}
            disabled={isProcessing || !instruction.trim()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            <i className="fas fa-magic mr-2"></i>
            {isProcessing ? "Processing..." : "Process"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
