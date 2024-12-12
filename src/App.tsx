import React from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { InitialSetupForm } from './components/InitialSetupForm';
import { CriteriaSetupForm } from './components/CriteriaSetupForm';
import { DecisionMatrixForm } from './components/DecisionMatrixForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { useDecisionSystem } from './hooks/useDecisionSystem';

const STAGES = ['Initial Setup', 'Criteria Setup', 'Decision Matrix', 'Results'];

export default function App() {
  const {
    step,
    initialSetup,
    criteriaDetails,
    decisionMatrix,
    calculationResults,
    setStep,
    setInitialSetup,
    setCriteriaDetails,
    setDecisionMatrix,
    calculateResults
  } = useDecisionSystem();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      <ProgressBar step={step} stages={STAGES} />

      {step === 1 && (
        <InitialSetupForm
          initialSetup={initialSetup}
          onSetup={setInitialSetup}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <CriteriaSetupForm
          criteria={criteriaDetails}
          onCriteriaChange={setCriteriaDetails}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <DecisionMatrixForm
          matrix={decisionMatrix}
          criteria={criteriaDetails}
          onMatrixChange={setDecisionMatrix}
          onBack={() => setStep(2)}
          onCalculate={calculateResults}
        />
      )}
      {step === 4 && calculationResults && (
        <ResultsDisplay
          results={calculationResults}
          onBack={setStep}
        />
      )}
    </div>
  );
}