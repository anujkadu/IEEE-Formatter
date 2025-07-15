

// import type { } from "@google/generative-ai";
// import type { } from "pdfjs-dist";

// export async function processWithGemini({ content, instruction, apiKey }) {
//   // Combine instruction and content into a single prompt
//   const prompt = instruction ? `${instruction}\n\n${content}` : content;
//   const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       contents: [{ parts: [{ text: prompt }] }],
//     }),
//   });
//   const data = await response.json();
//   return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
// }


// import type { } from "@google/generative-ai";
// import type { } from "pdfjs-dist";

// export async function processWithGemini({ content, instruction, apiKey }) {
//   // Combine instruction and content into a single prompt
//   const prompt = `${instruction}\n\n---\n\n${content}`;
  
//   const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       contents: [{ parts: [{ text: prompt }] }],
//       // Add this generationConfig to enforce JSON output
//       generationConfig: {
//         response_mime_type: "application/json",
//       },
//     }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(`Gemini API error: ${error.error.message}`);
//   }

//   const data = await response.json();
//   // The response is now a JSON string that needs to be parsed
//   const jsonString = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
//   return JSON.parse(jsonString);
// }


export async function processWithGemini({ content, instruction, apiKey }) {
  const prompt = `${instruction}\n\n---\n\n${content}`;
  
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}