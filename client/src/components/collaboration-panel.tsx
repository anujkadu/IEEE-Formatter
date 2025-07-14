// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";

// interface Collaborator {
//   id: string;
//   name: string;
//   email: string;
//   role: 'owner' | 'editor' | 'reviewer' | 'viewer';
//   avatar?: string;
//   lastSeen: Date;
//   isOnline: boolean;
// }

// interface Comment {
//   id: string;
//   author: Collaborator;
//   content: string;
//   timestamp: Date;
//   resolved: boolean;
//   replies: Comment[];
//   section?: string;
// }

// interface Change {
//   id: string;
//   author: Collaborator;
//   type: 'edit' | 'add' | 'delete' | 'comment';
//   description: string;
//   timestamp: Date;
//   section: string;
// }

// export function CollaborationPanel() {
//   const [collaborators, setCollaborators] = useState<Collaborator[]>([
//     {
//       id: '1',
//       name: 'John Doe',
//       email: 'john@example.com',
//       role: 'owner',
//       lastSeen: new Date(),
//       isOnline: true
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       role: 'editor',
//       lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
//       isOnline: false
//     }
//   ]);

//   const [comments, setComments] = useState<Comment[]>([
//     {
//       id: '1',
//       author: collaborators[1],
//       content: 'The methodology section needs more detail about the experimental setup.',
//       timestamp: new Date(Date.now() - 3600000), // 1 hour ago
//       resolved: false,
//       replies: [],
//       section: 'II. METHODOLOGY'
//     }
//   ]);

//   const [recentChanges, setRecentChanges] = useState<Change[]>([
//     {
//       id: '1',
//       author: collaborators[1],
//       type: 'edit',
//       description: 'Modified abstract for clarity',
//       timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
//       section: 'Abstract'
//     }
//   ]);

//   const [newComment, setNewComment] = useState('');
//   const [inviteEmail, setInviteEmail] = useState('');

//   const handleInviteCollaborator = () => {
//     if (inviteEmail) {
//       // TODO: Implement actual invitation logic
//       console.log('Inviting:', inviteEmail);
//       setInviteEmail('');
//     }
//   };

//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       const comment: Comment = {
//         id: Date.now().toString(),
//         author: collaborators[0], // Current user
//         content: newComment,
//         timestamp: new Date(),
//         resolved: false,
//         replies: []
//       };
//       setComments([comment, ...comments]);
//       setNewComment('');
//     }
//   };

//   const handleResolveComment = (commentId: string) => {
//     setComments(comments.map(comment => 
//       comment.id === commentId ? { ...comment, resolved: true } : comment
//     ));
//   };

//   const getRoleColor = (role: string) => {
//     switch (role) {
//       case 'owner': return 'bg-purple-100 text-purple-800';
//       case 'editor': return 'bg-blue-100 text-blue-800';
//       case 'reviewer': return 'bg-green-100 text-green-800';
//       case 'viewer': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Active Collaborators */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center text-sm">
//             <i className="fas fa-users mr-2 text-primary"></i>
//             Active Collaborators
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {collaborators.map(collaborator => (
//               <div key={collaborator.id} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage src={collaborator.avatar} />
//                       <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                     </Avatar>
//                     {collaborator.isOnline && (
//                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">{collaborator.name}</p>
//                     <p className="text-xs text-gray-500">{collaborator.email}</p>
//                   </div>
//                 </div>
//                 <Badge className={getRoleColor(collaborator.role)}>
//                   {collaborator.role}
//                 </Badge>
//               </div>
//             ))}
//           </div>

//           <Separator className="my-4" />

//           <div className="flex space-x-2">
//             <Input
//               placeholder="Email address"
//               value={inviteEmail}
//               onChange={(e) => setInviteEmail(e.target.value)}
//               className="flex-1"
//             />
//             <Button onClick={handleInviteCollaborator} size="sm">
//               <i className="fas fa-plus mr-2"></i>Invite
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Comments & Feedback */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center text-sm">
//             <i className="fas fa-comments mr-2 text-primary"></i>
//             Comments & Feedback
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3 mb-4">
//             <Textarea
//               placeholder="Add a comment or suggestion..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               className="min-h-[80px]"
//             />
//             <Button onClick={handleAddComment} size="sm" className="w-full">
//               <i className="fas fa-comment mr-2"></i>Add Comment
//             </Button>
//           </div>

//           <ScrollArea className="h-48">
//             <div className="space-y-3">
//               {comments.map(comment => (
//                 <div key={comment.id} className={`p-3 rounded-lg border ${comment.resolved ? 'bg-gray-50' : 'bg-white'}`}>
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex items-center space-x-2">
//                       <Avatar className="h-6 w-6">
//                         <AvatarImage src={comment.author.avatar} />
//                         <AvatarFallback>{comment.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                       </Avatar>
//                       <span className="text-sm font-medium">{comment.author.name}</span>
//                       {comment.section && (
//                         <Badge variant="outline" className="text-xs">
//                           {comment.section}
//                         </Badge>
//                       )}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="text-xs text-gray-500">
//                         {comment.timestamp.toLocaleTimeString()}
//                       </span>
//                       {!comment.resolved && (
//                         <Button
//                           onClick={() => handleResolveComment(comment.id)}
//                           variant="ghost"
//                           size="sm"
//                           className="h-6 w-6 p-0"
//                         >
//                           <i className="fas fa-check text-green-600"></i>
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-700">{comment.content}</p>
//                   {comment.resolved && (
//                     <Badge variant="secondary" className="mt-2">
//                       Resolved
//                     </Badge>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       </Card>

//       {/* Recent Changes */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center text-sm">
//             <i className="fas fa-history mr-2 text-primary"></i>
//             Recent Changes
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ScrollArea className="h-32">
//             <div className="space-y-2">
//               {recentChanges.map(change => (
//                 <div key={change.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
//                   <Avatar className="h-6 w-6">
//                     <AvatarImage src={change.author.avatar} />
//                     <AvatarFallback>{change.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm font-medium">{change.author.name}</span>
//                       <Badge variant="outline" className="text-xs">
//                         {change.type}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-gray-600">{change.description}</p>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <span className="text-xs text-gray-500">{change.section}</span>
//                       <span className="text-xs text-gray-500">•</span>
//                       <span className="text-xs text-gray-500">
//                         {change.timestamp.toLocaleTimeString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


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
