import React from 'react';
import { CriterionDetail } from '../types/fuzzyTopsis';
import { LINGUISTIC_TERMS, CRITERION_TYPES } from '../utils/constants';

type Props = {
  criteria: CriterionDetail[];
  onCriteriaChange: (criteria: CriterionDetail[]) => void;
  onBack: () => void;
  onNext: () => void;
};

export const CriteriaSetupForm: React.FC<Props> = ({
  criteria,
  onCriteriaChange,
  onBack,
  onNext
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-6">Criteria Setup</h2>
    <div className="space-y-6">
      {criteria.map((criterion, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-medium mb-4">Criterion {index + 1}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter criterion name"
                value={criterion.name}
                onChange={(e) => {
                  const newCriteria = [...criteria];
                  newCriteria[index].name = e.target.value;
                  onCriteriaChange(newCriteria);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight
              </label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={criterion.weight}
                onChange={(e) => {
                  const newCriteria = [...criteria];
                  newCriteria[index].weight = e.target.value as any;
                  onCriteriaChange(newCriteria);
                }}
              >
                {Object.entries(LINGUISTIC_TERMS).map(([key, value]) => (
                  <option key={key} value={key}>{value} ({key})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={criterion.type}
                onChange={(e) => {
                  const newCriteria = [...criteria];
                  newCriteria[index].type = e.target.value as any;
                  onCriteriaChange(newCriteria);
                }}
              >
                {Object.entries(CRITERION_TYPES).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button
          className="flex-1 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="flex-1 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!criteria.every(c => c.name.trim())}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);