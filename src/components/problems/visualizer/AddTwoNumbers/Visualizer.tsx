"use client";

import React, { useEffect, useState, useCallback } from "react";
import CarryDisplay from "./CarryDisplay";
import AdditionStep from "./AdditionStep";
import ResultList from "./ResultList";
import Controls from "./Controls";
import InputLists from "./InputLists";
import StepLog from "./StepLog";

export default function Add2NumVisualizer() {
  const [l1, setL1] = useState<number[] | null>(null);
  const [l2, setL2] = useState<number[] | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [carry, setCarry] = useState(0);
  const [result, setResult] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [steps, setSteps] = useState<string[]>([]);

  const l1Val = l1 && currentIndex < l1.length ? l1[currentIndex] : 0;
  const l2Val = l2 && currentIndex < l2.length ? l2[currentIndex] : 0;

  const handleNextStep = useCallback(() => {
    if (!l1 || !l2) return;

    if (currentIndex >= l1.length && currentIndex >= l2.length && carry === 0) {
      setIsPlaying(false);
      return;
    }

    const sum = l1Val + l2Val + carry;
    const newDigit = sum % 10;
    const newCarry = Math.floor(sum / 10);

    setResult((prev) => [...prev, newDigit]);
    setCarry(newCarry);
    setCurrentIndex((prev) => prev + 1);

    const stepDescription = `Step ${currentIndex + 1}: ${l1Val} + ${l2Val} + carry ${carry} = ${sum} ➜ Digit: ${newDigit}, New Carry: ${newCarry}`;
    setSteps((prev) => [...prev, stepDescription]);
  }, [l1, l2, currentIndex, carry, l1Val, l2Val]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        handleNextStep();
      }, speed);
    }

    return () => clearInterval(interval);
  }, [isPlaying, speed, handleNextStep]);

  const handlePreviousStep = () => {
    if (currentIndex === 0) return;

    const updatedResult = [...result];
    updatedResult.pop();

    setResult(updatedResult);
    setCurrentIndex((prev) => prev - 1);

    const updatedSteps = [...steps];
    updatedSteps.pop();
    setSteps(updatedSteps);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setCarry(0);
    setResult([]);
    setIsPlaying(false);
    setSteps([]);
  };

  const handleInputSubmit = (list1: number[], list2: number[]) => {
    setL1(list1);
    setL2(list2);
    handleReset();
  };

  if (!l1 || !l2) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full">
        <InputLists onSubmit={handleInputSubmit} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 p-4 sm:p-8 max-w-4xl mx-auto w-full">
      {/* Carry Display */}
      <CarryDisplay carry={carry} />

      {/* Addition Step */}
      <AdditionStep l1Val={l1Val} l2Val={l2Val} carry={carry} />

      {/* Result List */}
      <ResultList result={result} currentIndex={result.length - 1} />

      {/* Controls (Next, Previous, Play, Reset, Speed Control) */}
      <div className="w-full">
        <Controls
          isPlaying={isPlaying}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          onPlayPause={() => setIsPlaying((prev) => !prev)}
          onReset={handleReset}
          speed={speed}
          onSpeedChange={(newSpeed) => setSpeed(newSpeed)}
        />
      </div>

      {/* Step Log */}
      <div className="w-full">
        <StepLog steps={steps} currentStep={currentIndex} />
      </div>
    </div>
  );
}
