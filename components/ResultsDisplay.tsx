
import React from 'react';
import { ImageAnalysisResult } from '../types';
import { Tag } from './Tag';

interface ResultsDisplayProps {
  result: ImageAnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="w-full h-full animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Generated Caption</h3>
        <p className="bg-base-100 p-4 rounded-lg text-content-200 italic border border-base-300">
          "{result.caption}"
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Visually Relevant Tags</h3>
        <div className="flex flex-wrap gap-2">
          {result.tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};
