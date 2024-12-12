import { useState, useEffect } from 'react';
import { InitialSetup, CriterionDetail, DecisionMatrix } from '../types/fuzzyTopsis';
import { calculateFuzzyTopsis } from '../utils/fuzzyCalculations';

export function useDecisionSystem() {
  const [step, setStep] = useState(1);
  const [initialSetup, setInitialSetup] = useState<InitialSetup>({
    alternatives: 0,
    criteria: 0,
    decisionMakers: 0
  });
  const [criteriaDetails, setCriteriaDetails] = useState<CriterionDetail[]>([]);
  const [decisionMatrix, setDecisionMatrix] = useState<DecisionMatrix>([]);
  const [calculationResults, setCalculationResults] = useState<any>(null);

  useEffect(() => {
    if (step === 2 && criteriaDetails.length === 0) {
      setCriteriaDetails(
        Array(initialSetup.criteria).fill(null).map(() => ({
          name: '',
          weight: 'A',
          type: 'benefit'
        }))
      );
    }

    if (step === 3 && decisionMatrix.length === 0) {
      setDecisionMatrix(
        Array(initialSetup.decisionMakers).fill(null).map(() =>
          Array(initialSetup.alternatives).fill(null).map(() =>
            Array(initialSetup.criteria).fill('VL')
          )
        )
      );
    }
  }, [step, initialSetup]);

  const calculateResults = () => {
    const results = calculateFuzzyTopsis(decisionMatrix, criteriaDetails);
    setCalculationResults(results);
    setStep(4);
  };

  return {
    step,
    setStep,
    initialSetup,
    setInitialSetup,
    criteriaDetails,
    setCriteriaDetails,
    decisionMatrix,
    setDecisionMatrix,
    calculationResults,
    calculateResults
  };
}