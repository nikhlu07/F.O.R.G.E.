import React from 'react';
import { Card, CardContent } from './Card';

interface StatCardProps {
  title: string;
  value: string;
  isAlert?: boolean;
  isRisk?: boolean;
}

export const StatCard = ({ title, value, isAlert, isRisk }: StatCardProps) => {
  const getValueColor = () => {
    if (isAlert) return 'text-red-400';
    if (isRisk) {
      const numericValue = parseInt(value);
      if (numericValue > 50) return 'text-red-400';
      if (numericValue > 20) return 'text-yellow-400';
    }
    return 'text-white';
  };

  const valueColor = getValueColor();

  return (
    <Card className="transition-all duration-300 hover:bg-white/5 hover:scale-105">
      <CardContent className="text-center">
        <p className="text-sm font-semibold text-cyan-400/80 uppercase tracking-wider">{title}</p>
        <p className={`text-4xl font-bold mt-2 ${valueColor}`}>{value}</p>
      </CardContent>
    </Card>
  );
};
