
import React, { useRef, useState, useCallback } from 'react';
import { InlineData } from '../types';

interface ImageUploaderProps {
  onImageReady: (imageData: InlineData) => void;
  setImagePreview: (url: string | null) => void;
  isLoading: boolean;
  onReset: () => void;
  imagePreview: string | null;
}

const fileToInlineData = (file: File): Promise<InlineData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('Failed to read file as data URL.'));
      }
      const base64Data = reader.result.split(',')[1];
      if (!base64Data) {
        return reject(new Error('Failed to extract base64 data from file.'));
      }
      resolve({
        mimeType: file.type,
        data: base64Data,
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageReady, setImagePreview, isLoading, onReset, imagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        alert("File is too large. Please select an image under 4MB.");
        return;
      }
      onReset();
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      try {
        const imageData = await fileToInlineData(file);
        onImageReady(imageData);
      } catch(e) {
        alert("Could not process file. Please try another image.");
        onReset();
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleInternalReset = () => {
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    onReset();
  }

  const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );

  const TrashIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-content-100">Upload Image</h2>
           {imagePreview && (
              <button 
                onClick={handleInternalReset}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <TrashIcon/>
                Reset
              </button>
            )}
      </div>

      <div 
        className="flex-grow border-2 border-dashed border-base-300 rounded-xl flex items-center justify-center p-4 transition-colors duration-300 bg-base-100"
      >
        {imagePreview ? (
          <div className="relative w-full h-full max-h-[400px]">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg"/>
          </div>
        ) : (
          <div className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              disabled={isLoading}
            />
            <button
              onClick={handleUploadClick}
              disabled={isLoading}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UploadIcon/>
              Select an Image
            </button>
            <p className="mt-2 text-sm text-gray-400">PNG, JPG, WEBP up to 4MB.</p>
          </div>
        )}
      </div>
    </div>
  );
};
