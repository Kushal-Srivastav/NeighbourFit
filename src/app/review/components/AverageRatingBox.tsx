import React from 'react';

interface AverageRatingBoxProps {
  avgRatings: Record<string, number> | null;
  categories: { value: string; label: string; icon: React.ElementType }[];
}

const AverageRatingBox: React.FC<AverageRatingBoxProps> = ({ avgRatings, categories }) => {
  if (!avgRatings) return null;
  return (
    <div className="bg-zinc-900 rounded-lg p-4 shadow-md mb-8">
      <h3 className="text-lg font-semibold mb-2 text-white">Average Ratings</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.value} className="flex items-center gap-2">
            <cat.icon className="w-4 h-4 text-blue-400" />
            <span className="text-zinc-200">{cat.label}:</span>
            <span className="font-bold text-white">{avgRatings[cat.value]?.toFixed(1) ?? 'N/A'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AverageRatingBox;
