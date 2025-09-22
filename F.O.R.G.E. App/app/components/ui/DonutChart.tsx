interface DonutChartProps {
  total: number;
  disbursed: number;
  remaining: number;
}

export const DonutChart = ({ total, disbursed, remaining }: DonutChartProps) => {
  const disbursedPercent = (disbursed / total) * 100;
  const remainingPercent = (remaining / total) * 100;

  const circumference = 2 * Math.PI * 40;
  const disbursedOffset = circumference - (disbursedPercent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          className="text-gray-800"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        {/* Remaining (as part of the background) */}
        <circle
          className="text-gray-600"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        {/* Disbursed Circle */}
        <circle
          className="text-cyan-400"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={disbursedOffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">
          {((disbursed / total) * 100).toFixed(0)}%
        </span>
        <span className="text-sm text-gray-400">Disbursed</span>
      </div>
    </div>
  );
};
