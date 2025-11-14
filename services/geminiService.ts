
import { GoogleGenAI, Type } from "@google/genai";
import { ImageAnalysisResult, InlineData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    caption: {
      type: Type.STRING,
      description: "A single, concise, and descriptive sentence that accurately summarizes the image.",
    },
    tags: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of 5-10 relevant keywords or tags that correspond to things visually present in the image."
    },
  },
  required: ['caption', 'tags'],
};

const prompt = `You are an expert AI assistant specialized in image analysis and tagging. Your task is to analyze the provided image and generate a descriptive caption and a list of visually relevant tags.

Follow these steps precisely:
1.  **Analyze the image:** Carefully observe all objects, the setting, actions, colors, and any text present.
2.  **Generate a Caption:** Write a single, concise, and descriptive sentence that accurately summarizes the image.
3.  **Extract Tags:** From your caption and direct observation of the image, generate a list of 5-10 relevant keywords or tags. These tags must correspond to things that are *actually visible* in the image. Do not include abstract concepts unless they are clearly depicted.
4.  **Format the Output:** Return your response as a JSON object that strictly adheres to the provided schema.

Do not include any text, explanations, or markdown formatting outside of the JSON object.`;


export const generateImageTags = async (imageData: InlineData): Promise<ImageAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { 
        parts: [
          { text: prompt },
          { inlineData: imageData }
        ] 
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    
    // Sometimes the model might still wrap the JSON in markdown
    const cleanedJsonString = jsonString.replace(/^```json\n?/, '').replace(/```\n?$/, '');
    
    const result: ImageAnalysisResult = JSON.parse(cleanedJsonString);
    
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API_KEY')) {
        throw new Error("Invalid API Key. Please check your environment configuration.");
    }
    throw new Error("Failed to analyze image with Gemini API. The model may be unable to process this request.");
  }
};
