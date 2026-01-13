import { ImageAnalysisResult, InlineData } from '../types';

export const generateImageTags = async (imageData: InlineData): Promise<ImageAnalysisResult> => {
    try {
        // Determine backend URL - defaulting to localhost:8000
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

        const response = await fetch(`${backendUrl}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: imageData.data,
                mimeType: imageData.mimeType
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result: ImageAnalysisResult = await response.json();
        return result;

    } catch (error) {
        console.error("Error calling backend API:", error);
        throw new Error("Failed to analyze image. Ensure the backend server is running on port 8000.");
    }
};
