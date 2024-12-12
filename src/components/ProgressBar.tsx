import React from 'react';

type Props = {
  step: number;
  stages: string[];
};

export const ProgressBar: React.FC<Props> = ({ step, stages }) => (
  <div className="mb-8">
    <div className="flex justify-between mb-2">
      {stages.map((stageName, index) => (
        <div
          key={index}
          className={`text-sm ${step === index + 1 ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
        >
          {stageName}
        </div>
      ))}
    </div>
    <div className="h-2 bg-gray-200 rounded">
      <div
        className="h-full bg-blue-500 rounded transition-all duration-300"
        style={{ width: `${(step / stages.length) * 100}%` }}
      />
    </div>
  </div>
);