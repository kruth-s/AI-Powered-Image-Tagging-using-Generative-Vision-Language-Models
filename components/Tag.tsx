
import React from 'react';

interface TagProps {
  text: string;
}

export const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <div className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-content-200 text-sm font-medium px-3 py-1 rounded-full border border-brand-primary/50">
      {text}
    </div>
  );
};
