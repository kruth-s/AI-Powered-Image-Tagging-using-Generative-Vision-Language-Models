
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeMessage } from './components/WelcomeMessage';
import { generateImageTags } from './services/apiService';
import { ImageAnalysisResult, InlineData } from './types';

const App: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageAnalysis = useCallback(async (imageData: InlineData) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await generateImageTags(imageData);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300">
            <ImageUploader 
              onImageReady={handleImageAnalysis} 
              setImagePreview={setImagePreview}
              isLoading={isLoading}
              onReset={handleReset}
              imagePreview={imagePreview}
            />
          </div>

          <div className="bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300 flex flex-col min-h-[400px] lg:min-h-0">
            <h2 className="text-2xl font-bold mb-4 text-content-100 border-b border-base-300 pb-2">Analysis Results</h2>
            <div className="flex-grow flex items-center justify-center">
              {isLoading && <Spinner />}
              {error && <ErrorMessage message={error} />}
              {!isLoading && !error && !analysisResult && <WelcomeMessage />}
              {!isLoading && !error && analysisResult && <ResultsDisplay result={analysisResult} />}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by BLIP, KeyBERT & CLIP. Designed for exceptional UI/UX.</p>
      </footer>
    </div>
  );
};

export default App;
