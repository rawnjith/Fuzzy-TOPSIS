import React from 'react';
import { InitialSetup } from '../types/fuzzyTopsis';

type Props = {
  initialSetup: InitialSetup;
  onSetup: (setup: InitialSetup) => void;
  onNext: () => void;
};

export const InitialSetupForm: React.FC<Props> = ({
  initialSetup,
  onSetup,
  onNext
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-6">Initial Setup</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Alternatives
        </label>
        <input
          type="number"
          min="1"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={initialSetup.alternatives || ''}
          onChange={(e) => onSetup({
            ...initialSetup,
            alternatives: parseInt(e.target.value) || 0
          })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Criteria
        </label>
        <input
          type="number"
          min="1"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={initialSetup.criteria || ''}
          onChange={(e) => onSetup({
            ...initialSetup,
            criteria: parseInt(e.target.value) || 0
          })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Decision Makers
        </label>
        <input
          type="number"
          min="1"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={initialSetup.decisionMakers || ''}
          onChange={(e) => onSetup({
            ...initialSetup,
            decisionMakers: parseInt(e.target.value) || 0
          })}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
        onClick={onNext}
        disabled={!initialSetup.alternatives || !initialSetup.criteria || !initialSetup.decisionMakers}
      >
        Next
      </button>
    </div>
  </div>
);