import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg shadow-black/20 ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return (
    <div className={`p-5 border-b border-white/10 ${className}`}>
      <h3 className="text-lg font-semibold text-white">{children}</h3>
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = '' }: CardContentProps) => {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
};
