


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Define types for frontend-only data
interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'reviewer';
  lastSeen: string;
  isOnline: boolean;
}

interface Comment {
  id: string;
  author: Collaborator;
  content: string;
  timestamp: string;
  resolved: boolean;
}

interface Change {
  id: string;
  author: Collaborator;
  type: 'edit' | 'comment';
  description: string;
  timestamp: string;
}

export function CollaborationPanel() {
  // Mock data - exists only in frontend state
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'You',
      email: 'user@example.com',
      role: 'owner',
      lastSeen: 'Just now',
      isOnline: true
    },
    {
      id: '2',
      name: 'Reviewer',
      email: 'reviewer@university.edu',
      role: 'reviewer',
      lastSeen: '5 mins ago',
      isOnline: false
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: collaborators[1],
      content: 'Consider expanding the methodology section with more experimental details.',
      timestamp: '1 hour ago',
      resolved: false
    }
  ]);

  const [recentChanges, setRecentChanges] = useState<Change[]>([
    {
      id: '1',
      author: collaborators[0],
      type: 'edit',
      description: 'Updated abstract for clarity',
      timestamp: '30 mins ago'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  // Frontend-only handlers
  const handleInvite = () => {
    if (inviteEmail) {
      const newCollaborator: Collaborator = {
        id: `${collaborators.length + 1}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: 'reviewer',
        lastSeen: 'Just now',
        isOnline: true
      };
      setCollaborators([...collaborators, newCollaborator]);
      setInviteEmail('');
      alert(`${newCollaborator.name} invited (mock - no backend)`);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `${comments.length + 1}`,
        author: collaborators[0], // Current user
        content: newComment,
        timestamp: 'Just now',
        resolved: false
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleResolveComment = (id: string) => {
    setComments(comments.map(c =>
      c.id === id ? { ...c, resolved: true } : c
    ));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <i className="fas fa-users text-primary" />
          Collaboration Tools
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Collaborators Section */}
        <div>
          <h3 className="font-medium mb-2">Active Collaborators</h3>
          <div className="space-y-2">
            {collaborators.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <Badge variant={user.isOnline ? "default" : "secondary"} className="text-xs">
                    {user.isOnline ? "Online" : `Last seen ${user.lastSeen}`}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={handleInvite}>Invite</Button>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h3 className="font-medium mb-2">Comments</h3>
          <ScrollArea className="h-40 rounded-md border p-2 mb-3">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{comment.author.name}</span>
                  </div>
                  {!comment.resolved && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleResolveComment(comment.id)}
                    >
                      Mark resolved
                    </Button>
                  )}
                </div>
                <p className="text-sm ml-8">{comment.content}</p>
                <p className="text-xs text-muted-foreground ml-8">{comment.timestamp}</p>
                <Separator className="my-2" />
              </div>
            ))}
          </ScrollArea>
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button className="mt-2" onClick={handleAddComment}>
            Post Comment
          </Button>
        </div>

        {/* Recent Changes Section */}
        <div>
          <h3 className="font-medium mb-2">Recent Changes</h3>
          <ul className="space-y-2 text-sm">
            {recentChanges.map((change) => (
              <li key={change.id} className="flex items-start gap-2">
                <Avatar className="h-6 w-6 mt-1">
                  <AvatarFallback>{change.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{change.description}</p>
                  <p className="text-xs text-muted-foreground">{change.timestamp}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}