# IEEE Research Paper Formatter

## Overview

This application is a sophisticated academic paper formatting tool that automatically converts research papers to IEEE standards using AI-powered processing. It combines a React frontend with an Express backend to provide PDF upload capabilities, content extraction, IEEE formatting, and compliance scoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage currently)
- **File Processing**: Multer for file uploads, pdf-parse for PDF content extraction
- **AI Integration**: Google Gemini AI for document processing and formatting

### Key Design Decisions
1. **Monorepo Structure**: Single repository with separate client/server folders for easier development
2. **Shared Schema**: Common TypeScript types and validation schemas in `/shared` folder
3. **Component Library**: Custom UI components built on Radix UI for consistency and accessibility
4. **Service Layer**: Modular backend services for PDF processing, IEEE formatting, and compliance scoring

## Key Components

### Frontend Components
- **FileUpload**: Drag-and-drop PDF upload with progress tracking
- **AIInstructions**: Interface for custom AI processing instructions
- **ComplianceScore**: Visual display of IEEE compliance metrics
- **DocumentPreview**: Formatted document display with export capabilities
- **ProcessingModal**: Loading states during AI processing

### Backend Services
- **PDFProcessor**: Extracts text, metadata, and structure from uploaded PDFs
- **IEEEFormatter**: Applies IEEE formatting standards to extracted content
- **ComplianceScorer**: Evaluates documents against IEEE compliance criteria
- **GeminiClient**: Handles AI-powered document enhancement and formatting

### Database Schema
- **documents**: Stores document metadata, content, and compliance scores
- **Compliance tracking**: JSON fields for detailed formatting analysis
- **Processing status**: Tracks document processing stages

## Data Flow

1. **Upload**: User uploads PDF through drag-and-drop interface
2. **Extraction**: Backend extracts text and metadata using pdf-parse
3. **Initial Formatting**: Document is formatted according to IEEE standards
4. **Compliance Analysis**: System calculates compliance scores across multiple criteria
5. **AI Processing**: Optional AI enhancement based on user instructions
6. **Display**: Formatted document and compliance scores shown to user
7. **Export**: Final document can be exported in various formats

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Query for state management
- **Backend**: Express.js, Multer for file handling, pdf-parse for PDF processing
- **Database**: Drizzle ORM with PostgreSQL support (NeonDB serverless)
- **AI**: Google Gemini AI for document processing
- **UI**: Radix UI components, Tailwind CSS for styling

### Development Tools
- **Build**: Vite for frontend, esbuild for backend bundling
- **TypeScript**: Full TypeScript support across the stack
- **Validation**: Zod for schema validation
- **Database**: Drizzle Kit for database migrations

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized static assets to `/dist/public`
- **Backend**: esbuild bundles server code to `/dist/index.js`
- **Database**: PostgreSQL with connection pooling via NeonDB serverless
- **Environment**: Production environment variables for database and AI API keys

### Development Setup
- **Hot Reload**: Vite dev server with HMR for frontend changes
- **Server**: tsx for TypeScript execution with automatic restarts
- **Database**: Drizzle push for schema synchronization
- **AI**: Gemini API integration with configurable processing modes

### Key Features
1. **Drag-and-drop PDF upload** with file validation and progress tracking
2. **Automatic IEEE formatting** with section structure analysis
3. **AI-powered content enhancement** with customizable instructions
4. **Compliance scoring** across multiple IEEE criteria
5. **Real-time document preview** with zoom and navigation
6. **Multi-format export** (PDF, DOCX, LaTeX) with proper file downloads
7. **Advanced figure and table extraction** with positioning and type detection
8. **Comprehensive citation management** with cross-referencing capabilities
9. **Collaborative editing features** with real-time comments and user management
10. **Enhanced IEEE preview formatting** with proper typography and layout

### Recent Updates (January 14, 2025)
- Enhanced IEEE preview formatting with proper font sizes, spacing, and layout
- Added multi-format export functionality (PDF, DOCX, LaTeX) with proper file downloads
- Implemented advanced figure and table extraction with positioning and type detection
- Created comprehensive citation management system with cross-referencing capabilities
- Added collaborative editing features with real-time comments and user management
- Expanded UI layout to 4-column grid with dedicated collaboration and citation panels

The application uses a modern, type-safe architecture with clear separation of concerns and comprehensive error handling throughout the stack.