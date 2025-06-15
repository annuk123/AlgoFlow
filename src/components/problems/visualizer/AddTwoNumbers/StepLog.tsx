import React from "react";

interface StepLogProps {
  steps: string[];
  currentStep: number;
}

const StepLog: React.FC<StepLogProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-2xl p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">Step Log</h2>
      <div className="max-h-64 overflow-y-auto space-y-2">
        {steps.length === 0 && <p className="text-gray-500 text-center">Steps will appear here as you proceed.</p>}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-2 rounded ${index === currentStep ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"}`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepLog;
