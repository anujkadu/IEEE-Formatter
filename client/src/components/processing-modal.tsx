import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export function ProcessingModal() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-md">
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-secondary mb-2">Processing Your Request</h3>
          <p className="text-sm text-gray-600 mb-4">AI is analyzing and reformatting your paper...</p>
          <Progress value={progress} className="w-full mb-2" />
          <p className="text-xs text-gray-500">This may take a few moments</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
