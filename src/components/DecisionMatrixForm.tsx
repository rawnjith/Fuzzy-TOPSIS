import React from 'react';
import { DecisionMatrix, CriterionDetail } from '../types/fuzzyTopsis';
import { LINGUISTIC_TERMS } from '../utils/constants';

type Props = {
  matrix: DecisionMatrix;
  criteria: CriterionDetail[];
  onMatrixChange: (matrix: DecisionMatrix) => void;
  onBack: () => void;
  onCalculate: () => void;
};

export const DecisionMatrixForm: React.FC<Props> = ({
  matrix,
  criteria,
  onMatrixChange,
  onBack,
  onCalculate
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-6">Decision Matrix Input</h2>
    <div className="space-y-8">
      {matrix.map((dm, dmIndex) => (
        <div key={dmIndex} className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Decision Maker {dmIndex + 1}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border bg-gray-50">Alternative</th>
                  {criteria.map((criterion, i) => (
                    <th key={i} className="p-2 border bg-gray-50">{criterion.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dm.map((alt, altIndex) => (
                  <tr key={altIndex}>
                    <td className="p-2 border bg-gray-50 font-medium">
                      Alternative {altIndex + 1}
                    </td>
                    {alt.map((val, critIndex) => (
                      <td key={critIndex} className="p-2 border">
                        <select
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={val}
                          onChange={(e) => {
                            const newMatrix = [...matrix];
                            newMatrix[dmIndex][altIndex][critIndex] = e.target.value as any;
                            onMatrixChange(newMatrix);
                          }}
                        >
                          {Object.entries(LINGUISTIC_TERMS).map(([key, value]) => (
                            <option key={key} value={key}>{value} ({key})</option>
                          ))}
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
          className="flex-1 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
          onClick={onCalculate}
        >
          Calculate Results
        </button>
      </div>
    </div>
  </div>
);