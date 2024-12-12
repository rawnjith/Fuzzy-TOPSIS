export type LinguisticTerm = 'VL' | 'L' | 'A' | 'H' | 'VH';

export type FuzzyNumber = [number, number, number];

export type InitialSetup = {
  alternatives: number;
  criteria: number;
  decisionMakers: number;
};

export type CriterionDetail = {
  name: string;
  weight: LinguisticTerm;
  type: 'benefit' | 'cost';
};

export type DecisionMatrix = LinguisticTerm[][][];

export type MatrixResult = {
  matrix: FuzzyNumber[][];
  description: string;
};

export type IdealSolutions = {
  fpis: FuzzyNumber[];
  fnis: FuzzyNumber[];
  description: string;
};

export type DistanceResult = {
  dPlus: number[];
  dMinus: number[];
  description: string;
};

export type FinalResult = {
  alternative: string;
  closenessCoefficient: number;
  rank: number;
};

export type CalculationResults = {
  aggregatedResult: MatrixResult;
  normalizedResult: MatrixResult;
  weightedResult: MatrixResult;
  idealSolutions: IdealSolutions;
  distances: DistanceResult;
  finalResults: FinalResult[];
};