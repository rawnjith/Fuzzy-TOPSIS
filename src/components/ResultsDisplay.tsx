import React from 'react';
import { CalculationResults } from '../types/fuzzyTopsis';
import { formatFuzzyNumber, formatDecimal } from '../utils/formatters';

type Props = {
  results: CalculationResults;
  onBack: (step: number) => void;
};

const MatrixTable: React.FC<{ matrix: number[][][]; title: string }> = ({ matrix, title }) => (
  <div className="mb-6">
    <h3 className="font-bold mb-2">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border p-2 text-sm">
                  {formatFuzzyNumber(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const ResultsDisplay: React.FC<Props> = ({ results, onBack }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-6">Detailed Results</h2>
    
    <div className="space-y-8">
      <div>
        <h3 className="font-bold mb-2">1. Aggregation of Decision Makers' Opinions</h3>
        <p className="text-sm mb-4 text-gray-600">{results.aggregatedResult.description}</p>
        <MatrixTable matrix={results.aggregatedResult.matrix} title="Aggregated Decision Matrix" />
      </div>

      <div>
        <h3 className="font-bold mb-2">2. Normalized Fuzzy Decision Matrix</h3>
        <p className="text-sm mb-4 text-gray-600">{results.normalizedResult.description}</p>
        <MatrixTable matrix={results.normalizedResult.matrix} title="Normalized Matrix" />
      </div>

      <div>
        <h3 className="font-bold mb-2">3. Weighted Normalized Fuzzy Decision Matrix</h3>
        <p className="text-sm mb-4 text-gray-600">{results.weightedResult.description}</p>
        <MatrixTable matrix={results.weightedResult.matrix} title="Weighted Matrix" />
      </div>

      <div>
        <h3 className="font-bold mb-2">4. FPIS and FNIS</h3>
        <p className="text-sm mb-4 text-gray-600">{results.idealSolutions.description}</p>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">FPIS:</h4>
            <div className="overflow-x-auto p-2 bg-gray-50 rounded">
              {results.idealSolutions.fpis.map((fn, i) => (
                <span key={i} className="mr-4">{formatFuzzyNumber(fn)}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">FNIS:</h4>
            <div className="overflow-x-auto p-2 bg-gray-50 rounded">
              {results.idealSolutions.fnis.map((fn, i) => (
                <span key={i} className="mr-4">{formatFuzzyNumber(fn)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">5. Distance Calculations</h3>
        <p className="text-sm mb-4 text-gray-600">{results.distances.description}</p>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-50">Alternative</th>
              <th className="border p-2 bg-gray-50">d+</th>
              <th className="border p-2 bg-gray-50">d-</th>
            </tr>
          </thead>
          <tbody>
            {results.distances.dPlus.map((dp, i) => (
              <tr key={i}>
                <td className="border p-2">Alternative {i + 1}</td>
                <td className="border p-2">{formatDecimal(dp)}</td>
                <td className="border p-2">{formatDecimal(results.distances.dMinus[i])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-bold mb-2">6. Final Results and Ranking</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-50">Rank</th>
              <th className="border p-2 bg-gray-50">Alternative</th>
              <th className="border p-2 bg-gray-50">Closeness Coefficient</th>
            </tr>
          </thead>
          <tbody>
            {results.finalResults.map((result) => (
              <tr key={result.alternative}>
                <td className="border p-2 text-center">{result.rank}</td>
                <td className="border p-2">{result.alternative}</td>
                <td className="border p-2 text-center">{formatDecimal(result.closenessCoefficient)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <button
          className="w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors"
          onClick={() => onBack(1)}
        >
          Start New Analysis
        </button>
      </div>
    </div>
  </div>
);