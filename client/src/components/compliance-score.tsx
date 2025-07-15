

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ComplianceScore as ComplianceScoreType } from "@shared/schema";

interface ComplianceScoreProps {
  score: ComplianceScoreType;
}

export function ComplianceScore({ score }: ComplianceScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 90) return "text-accent";
    if (value >= 70) return "text-warning";
    return "text-error";
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return "bg-accent";
    if (value >= 70) return "bg-warning";
    return "bg-error";
  };

  return (
    <Card className="bg-paper shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-secondary mb-4">
          <i className="fas fa-chart-line mr-2 text-primary"></i>IEEE Compliance Score
        </h2>

        <div className="text-center mb-6">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(score.overall)}`}>
            {score.overall}
          </div>
          <p className="text-sm text-gray-600">Overall Compliance Score</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Section Structure</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(score.sectionStructure)}`}
                  style={{ width: `${score.sectionStructure}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getScoreColor(score.sectionStructure)}`}>
                {score.sectionStructure}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Citation Format</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(score.citationFormat)}`}
                  style={{ width: `${score.citationFormat}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getScoreColor(score.citationFormat)}`}>
                {score.citationFormat}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Figure Formatting</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(score.figureFormatting)}`}
                  style={{ width: `${score.figureFormatting}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getScoreColor(score.figureFormatting)}`}>
                {score.figureFormatting}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">References</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(score.references)}`}
                  style={{ width: `${score.references}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getScoreColor(score.references)}`}>
                {score.references}%
              </span>
            </div>
          </div>
        </div>

        {score.suggestions.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Improvement Suggestions</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {score.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-exclamation-triangle text-warning text-xs mt-1 mr-2"></i>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}