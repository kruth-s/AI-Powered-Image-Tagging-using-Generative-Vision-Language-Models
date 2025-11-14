
import React from 'react';

const AISparkleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-2-2 9.293-9.293a1 1 0 011.414 0L17 9.586M17 9.586l4.414 4.414a1 1 0 010 1.414L13 24l-4-4-2-2 9.586-9.586z" />
    </svg>
);


export const WelcomeMessage: React.FC = () => {
    return (
        <div className="text-center text-gray-400 p-8">
            <AISparkleIcon />
            <h3 className="mt-4 text-xl font-semibold text-content-100">Ready to Tag!</h3>
            <p className="mt-2">Upload an image to start the AI-powered analysis. The generated caption and tags will appear here.</p>
        </div>
    );
};
