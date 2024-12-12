import { 
  DecisionMatrix, 
  CriterionDetail, 
  FuzzyNumber,
  CalculationResults 
} from '../types/fuzzyTopsis';

export const linguisticWeights: Record<string, FuzzyNumber> = {
  VL: [1, 1, 1],
  L: [1, 3, 5],
  A: [3, 5, 7],
  H: [5, 7, 9],
  VH: [7, 9, 9]
};

export const aggregateDecisionMatrix = (
  matrix: DecisionMatrix,
  numDM: number
): FuzzyNumber[][] => {
  const numAlt = matrix[0].length;
  const numCrit = matrix[0][0].length;
  const result: FuzzyNumber[][] = [];

  for (let i = 0; i < numAlt; i++) {
    result[i] = [];
    for (let j = 0; j < numCrit; j++) {
      const values = matrix.map(dm => linguisticWeights[dm[i][j]]);
      result[i][j] = [
        Math.min(...values.map(v => v[0])),
        values.reduce((sum, v) => sum + v[1], 0) / numDM,
        Math.max(...values.map(v => v[2]))
      ];
    }
  }

  return result;
};

export const normalizeMatrix = (
  matrix: FuzzyNumber[][],
  criteriaTypes: ('benefit' | 'cost')[]
): FuzzyNumber[][] => {
  const numAlt = matrix.length;
  const numCrit = matrix[0].length;
  const result: FuzzyNumber[][] = [];

  for (let j = 0; j < numCrit; j++) {
    const cMax = Math.max(...matrix.map(row => row[j][2]));
    const cMin = Math.min(...matrix.map(row => row[j][0]));

    for (let i = 0; i < numAlt; i++) {
      if (!result[i]) result[i] = [];
      
      if (criteriaTypes[j] === 'benefit') {
        result[i][j] = [
          matrix[i][j][0] / cMax,
          matrix[i][j][1] / cMax,
          matrix[i][j][2] / cMax
        ];
      } else {
        result[i][j] = [
          cMin / matrix[i][j][2],
          cMin / matrix[i][j][1],
          cMin / matrix[i][j][0]
        ];
      }
    }
  }

  return result;
};

export const calculateWeightedMatrix = (
  matrix: FuzzyNumber[][],
  weights: FuzzyNumber[]
): FuzzyNumber[][] => {
  return matrix.map(row =>
    row.map((cell, j) => [
      cell[0] * weights[j][0],
      cell[1] * weights[j][1],
      cell[2] * weights[j][2]
    ])
  );
};

export const calculateIdealSolutions = (
  matrix: FuzzyNumber[][]
): { fpis: FuzzyNumber[]; fnis: FuzzyNumber[] } => {
  const numCrit = matrix[0].length;
  const fpis: FuzzyNumber[] = [];
  const fnis: FuzzyNumber[] = [];

  for (let j = 0; j < numCrit; j++) {
    const column = matrix.map(row => row[j]);
    fpis[j] = [
      Math.max(...column.map(v => v[0])),
      Math.max(...column.map(v => v[1])),
      Math.max(...column.map(v => v[2]))
    ];
    fnis[j] = [
      Math.min(...column.map(v => v[0])),
      Math.min(...column.map(v => v[1])),
      Math.min(...column.map(v => v[2]))
    ];
  }

  return { fpis, fnis };
};

export const calculateDistances = (
  matrix: FuzzyNumber[][],
  fpis: FuzzyNumber[],
  fnis: FuzzyNumber[]
): { dPlus: number[]; dMinus: number[] } => {
  const dPlus: number[] = [];
  const dMinus: number[] = [];

  matrix.forEach((row, i) => {
    dPlus[i] = Math.sqrt(
      row.reduce((sum, cell, j) => {
        const d = (
          Math.pow(cell[0] - fpis[j][0], 2) +
          Math.pow(cell[1] - fpis[j][1], 2) +
          Math.pow(cell[2] - fpis[j][2], 2)
        ) / 3;
        return sum + d;
      }, 0)
    );

    dMinus[i] = Math.sqrt(
      row.reduce((sum, cell, j) => {
        const d = (
          Math.pow(cell[0] - fnis[j][0], 2) +
          Math.pow(cell[1] - fnis[j][1], 2) +
          Math.pow(cell[2] - fnis[j][2], 2)
        ) / 3;
        return sum + d;
      }, 0)
    );
  });

  return { dPlus, dMinus };
};

export const calculateClosenessCoefficients = (
  dPlus: number[],
  dMinus: number[]
): number[] => {
  return dPlus.map((dp, i) => dMinus[i] / (dPlus[i] + dMinus[i]));
};

export const calculateFuzzyTopsis = (
  decisionMatrix: DecisionMatrix,
  criteriaDetails: CriterionDetail[]
): CalculationResults => {
  // 1. Aggregate decision makers' opinions
  const aggregatedMatrix = aggregateDecisionMatrix(
    decisionMatrix,
    decisionMatrix.length
  );

  // 2. Normalize the fuzzy decision matrix
  const normalizedMatrix = normalizeMatrix(
    aggregatedMatrix,
    criteriaDetails.map(c => c.type)
  );

  // 3. Calculate weighted normalized matrix
  const criteriaWeights = criteriaDetails.map(c => linguisticWeights[c.weight]);
  const weightedMatrix = calculateWeightedMatrix(normalizedMatrix, criteriaWeights);

  // 4. Calculate FPIS and FNIS
  const { fpis, fnis } = calculateIdealSolutions(weightedMatrix);

  // 5. Calculate distances and closeness coefficients
  const { dPlus, dMinus } = calculateDistances(weightedMatrix, fpis, fnis);
  const closenessCoefficients = calculateClosenessCoefficients(dPlus, dMinus);

  // 6. Calculate final results and ranking
  const finalResults = closenessCoefficients
    .map((cc, i) => ({
      alternative: `Alternative ${i + 1}`,
      closenessCoefficient: cc,
      rank: 0
    }))
    .sort((a, b) => b.closenessCoefficient - a.closenessCoefficient)
    .map((result, index) => ({ ...result, rank: index + 1 }));

  return {
    aggregatedResult: {
      matrix: aggregatedMatrix,
      description: "Aggregated opinions from all decision makers using min-arithmetic mean-max method."
    },
    normalizedResult: {
      matrix: normalizedMatrix,
      description: "Normalized matrix using linear scale transformation."
    },
    weightedResult: {
      matrix: weightedMatrix,
      description: "Weighted normalized matrix considering criteria importance weights."
    },
    idealSolutions: {
      fpis,
      fnis,
      description: "Fuzzy Positive Ideal Solution (FPIS) and Fuzzy Negative Ideal Solution (FNIS)."
    },
    distances: {
      dPlus,
      dMinus,
      description: "Distances from each alternative to FPIS (d+) and FNIS (d-)."
    },
    finalResults
  };
};