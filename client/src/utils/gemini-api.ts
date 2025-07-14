import type { } from "@google/generative-ai";
import type { } from "pdfjs-dist";

export async function processWithGemini({ content, instruction, apiKey }) {
  // Combine instruction and content into a single prompt
  const prompt = instruction ? `${instruction}\n\n${content}` : content;
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}