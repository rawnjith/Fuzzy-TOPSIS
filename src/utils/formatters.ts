import { FuzzyNumber } from '../types/fuzzyTopsis';

export const formatFuzzyNumber = (fn: FuzzyNumber): string =>
  `(${fn[0].toFixed(4)}, ${fn[1].toFixed(4)}, ${fn[2].toFixed(4)})`;

export const formatDecimal = (num: number): string => num.toFixed(4);