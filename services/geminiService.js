import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.VUE_GOOGLE_API_KEY,
});

export async function generateChatResponses(query) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([query]);

    console.log("API Response:", result);

    return result.responses.map((response) => response.text);
  } catch (error) {
    console.error("Error generating chat response:", error);
    console.log(import.meta.env.VUE_GOOGLE_API_KEY);
    return ["Sorry, something went wrong."];
  }
}
