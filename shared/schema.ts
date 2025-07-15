



import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  originalContent: text("original_content").notNull(),
  processedContent: text("processed_content"),
  metadata: jsonb("metadata").$type<{
    authors?: string[];
    affiliations?: string[];
    keywords?: string[];
    figures?: Array<{ id: string; caption: string; position: number }>;
    references?: Array<{ id: string; citation: string; }>;
  }>().default({}),
  complianceScore: integer("compliance_score").default(0),
  complianceDetails: jsonb("compliance_details").$type<{
    sectionStructure: number;
    citationFormat: number;
    figureFormatting: number;
    references: number;
    suggestions: string[];
  }>().default({
    sectionStructure: 0,
    citationFormat: 0,
    figureFormatting: 0,
    references: 0,
    suggestions: []
  }),
  status: text("status").notNull().default("draft"), // draft, processing, completed, error
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateDocumentSchema = insertDocumentSchema.partial();

export const aiInstructionSchema = z.object({
  instruction: z.string().min(1, "Instruction cannot be empty"),
  processingMode: z.enum(["standard", "quick", "comprehensive"]).default("standard"),
});

export const complianceScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  sectionStructure: z.number().min(0).max(100),
  citationFormat: z.number().min(0).max(100),
  figureFormatting: z.number().min(0).max(100),
  references: z.number().min(0).max(100),
  suggestions: z.array(z.string()),
});

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type UpdateDocument = z.infer<typeof updateDocumentSchema>;
export type Document = typeof documents.$inferSelect;
export type AIInstruction = z.infer<typeof aiInstructionSchema>;
export type ComplianceScore = z.infer<typeof complianceScoreSchema>;