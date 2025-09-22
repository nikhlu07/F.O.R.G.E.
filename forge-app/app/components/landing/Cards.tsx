import React from 'react';

export const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="feature-card text-left">
      <div className="bg-cyan-900/50 text-cyan-400 rounded-lg w-12 h-12 flex items-center justify-center border border-cyan-400/30">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mt-6 text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
};

export const CaseStudyCard = ({ title, description, solutionTitle, solutionDescription }: { title: string, description: string, solutionTitle: string, solutionDescription: string }) => {
  return (
    <div className="feature-card text-left !p-0 overflow-hidden">
      <div className="p-8">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-gray-400">{description}</p>
      </div>
      <div className="bg-black/40 p-8 border-t border-gray-800">
        <h4 className="font-semibold text-cyan-400">{solutionTitle}</h4>
        <p className="mt-3 text-gray-300">{solutionDescription}</p>
      </div>
    </div>
  );
};
