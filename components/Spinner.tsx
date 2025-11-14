
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
        <p className="mt-4 text-lg font-semibold text-content-200">Analyzing Image...</p>
        <p className="text-sm text-gray-400">This may take a moment.</p>
    </div>
  );
};
