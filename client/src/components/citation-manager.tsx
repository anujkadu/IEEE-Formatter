import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Citation {
  id: string;
  number: number;
  authors: string[];
  title: string;
  publication: string;
  year: number;
  pages?: string;
  doi?: string;
  url?: string;
  type: 'journal' | 'conference' | 'book' | 'website' | 'thesis';
  rawText: string;
}

interface Figure {
  id: string;
  caption: string;
  position: number;
  type: 'graph' | 'table' | 'image' | 'diagram';
  section?: string;
}

interface CitationManagerProps {
  documentId?: number;
  citations?: Citation[];
  figures?: Figure[];
  onCitationsUpdate?: (citations: Citation[]) => void;
  onFiguresUpdate?: (figures: Figure[]) => void;
}

export function CitationManager({ 
  documentId, 
  citations = [], 
  figures = [], 
  onCitationsUpdate, 
  onFiguresUpdate 
}: CitationManagerProps) {
  const [localCitations, setLocalCitations] = useState<Citation[]>(citations);
  const [localFigures, setLocalFigures] = useState<Figure[]>(figures);
  const [newCitation, setNewCitation] = useState<Partial<Citation>>({
    authors: [],
    title: '',
    publication: '',
    year: new Date().getFullYear(),
    type: 'journal'
  });
  const [newFigure, setNewFigure] = useState<Partial<Figure>>({
    caption: '',
    type: 'image'
  });
  const [showAddCitation, setShowAddCitation] = useState(false);
  const [showAddFigure, setShowAddFigure] = useState(false);

  useEffect(() => {
    setLocalCitations(citations);
  }, [citations]);

  useEffect(() => {
    setLocalFigures(figures);
  }, [figures]);

  const handleAddCitation = () => {
    if (newCitation.title && newCitation.authors && newCitation.authors.length > 0) {
      const citation: Citation = {
        id: `citation-${Date.now()}`,
        number: localCitations.length + 1,
        authors: newCitation.authors,
        title: newCitation.title,
        publication: newCitation.publication || '',
        year: newCitation.year || new Date().getFullYear(),
        type: newCitation.type || 'journal',
        rawText: `${newCitation.authors?.join(', ')}, "${newCitation.title}," ${newCitation.publication}, ${newCitation.year}.`,
        pages: newCitation.pages,
        doi: newCitation.doi,
        url: newCitation.url
      };

      const updatedCitations = [...localCitations, citation];
      setLocalCitations(updatedCitations);
      onCitationsUpdate?.(updatedCitations);
      
      setNewCitation({
        authors: [],
        title: '',
        publication: '',
        year: new Date().getFullYear(),
        type: 'journal'
      });
      setShowAddCitation(false);
    }
  };

  const handleAddFigure = () => {
    if (newFigure.caption) {
      const figure: Figure = {
        id: `figure-${Date.now()}`,
        caption: newFigure.caption,
        position: localFigures.length + 1,
        type: newFigure.type || 'image'
      };

      const updatedFigures = [...localFigures, figure];
      setLocalFigures(updatedFigures);
      onFiguresUpdate?.(updatedFigures);
      
      setNewFigure({
        caption: '',
        type: 'image'
      });
      setShowAddFigure(false);
    }
  };

  const handleDeleteCitation = (id: string) => {
    const updatedCitations = localCitations.filter(c => c.id !== id);
    setLocalCitations(updatedCitations);
    onCitationsUpdate?.(updatedCitations);
  };

  const handleDeleteFigure = (id: string) => {
    const updatedFigures = localFigures.filter(f => f.id !== id);
    setLocalFigures(updatedFigures);
    onFiguresUpdate?.(updatedFigures);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'bg-blue-100 text-blue-800';
      case 'conference': return 'bg-green-100 text-green-800';
      case 'book': return 'bg-purple-100 text-purple-800';
      case 'website': return 'bg-orange-100 text-orange-800';
      case 'thesis': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFigureTypeColor = (type: string) => {
    switch (type) {
      case 'graph': return 'bg-blue-100 text-blue-800';
      case 'table': return 'bg-green-100 text-green-800';
      case 'image': return 'bg-purple-100 text-purple-800';
      case 'diagram': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Citations Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-sm">
            <span>
              <i className="fas fa-quote-right mr-2 text-primary"></i>
              Citations ({localCitations.length})
            </span>
            <Dialog open={showAddCitation} onOpenChange={setShowAddCitation}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <i className="fas fa-plus mr-2"></i>Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Citation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="authors">Authors (comma-separated)</Label>
                    <Input
                      id="authors"
                      placeholder="Smith, J., Doe, A."
                      value={newCitation.authors?.join(', ') || ''}
                      onChange={(e) => setNewCitation({
                        ...newCitation,
                        authors: e.target.value.split(',').map(a => a.trim())
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Paper title"
                      value={newCitation.title || ''}
                      onChange={(e) => setNewCitation({
                        ...newCitation,
                        title: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="publication">Publication</Label>
                    <Input
                      id="publication"
                      placeholder="Journal or conference name"
                      value={newCitation.publication || ''}
                      onChange={(e) => setNewCitation({
                        ...newCitation,
                        publication: e.target.value
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={newCitation.year || ''}
                        onChange={(e) => setNewCitation({
                          ...newCitation,
                          year: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newCitation.type}
                        onValueChange={(value) => setNewCitation({
                          ...newCitation,
                          type: value as Citation['type']
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="journal">Journal</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="book">Book</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="thesis">Thesis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="doi">DOI (optional)</Label>
                    <Input
                      id="doi"
                      placeholder="10.1000/182"
                      value={newCitation.doi || ''}
                      onChange={(e) => setNewCitation({
                        ...newCitation,
                        doi: e.target.value
                      })}
                    />
                  </div>
                  <Button onClick={handleAddCitation} className="w-full">
                    Add Citation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {localCitations.map((citation, index) => (
                <div key={citation.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="secondary">[{citation.number}]</Badge>
                        <Badge className={getTypeColor(citation.type)}>
                          {citation.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">{citation.title}</p>
                      <p className="text-xs text-gray-600">
                        {citation.authors.join(', ')} • {citation.publication} • {citation.year}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCitation(citation.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Figures Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-sm">
            <span>
              <i className="fas fa-image mr-2 text-primary"></i>
              Figures & Tables ({localFigures.length})
            </span>
            <Dialog open={showAddFigure} onOpenChange={setShowAddFigure}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <i className="fas fa-plus mr-2"></i>Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Figure/Table</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea
                      id="caption"
                      placeholder="Figure caption or table description"
                      value={newFigure.caption || ''}
                      onChange={(e) => setNewFigure({
                        ...newFigure,
                        caption: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="figureType">Type</Label>
                    <Select
                      value={newFigure.type}
                      onValueChange={(value) => setNewFigure({
                        ...newFigure,
                        type: value as Figure['type']
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="graph">Graph</SelectItem>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="diagram">Diagram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddFigure} className="w-full">
                    Add Figure
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {localFigures.map((figure, index) => (
                <div key={figure.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="secondary">
                          {figure.type === 'table' ? 'Table' : 'Fig.'} {figure.position}
                        </Badge>
                        <Badge className={getFigureTypeColor(figure.type)}>
                          {figure.type}
                        </Badge>
                      </div>
                      <p className="text-sm">{figure.caption}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFigure(figure.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            <i className="fas fa-tools mr-2 text-primary"></i>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <i className="fas fa-check mr-2"></i>Validate
            </Button>
            <Button variant="outline" size="sm">
              <i className="fas fa-sort mr-2"></i>Reorder
            </Button>
            <Button variant="outline" size="sm">
              <i className="fas fa-download mr-2"></i>Export BibTeX
            </Button>
            <Button variant="outline" size="sm">
              <i className="fas fa-link mr-2"></i>Cross-ref
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}