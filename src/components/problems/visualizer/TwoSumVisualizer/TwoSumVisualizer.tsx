"use client";
import React, { useState, useEffect, useRef } from "react";
import ArrayDisplay from "./ArrayDisplay";
import MapDisplay from "./MapDisplay";
import StepController from "./StepController";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Step {
  currentIndex: number;
  complement: number | null;
  mapSnapshot: { [key: number]: number };
  found: boolean;
  explanation: string;
}

const TwoSumVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState("2,7,11,15");
  const [inputTarget, setInputTarget] = useState("9");

  const [nums, setNums] = useState<number[]>([2, 7, 11, 15]);
  const [target, setTarget] = useState<number>(9);

  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Build steps based on input
  const buildSteps = (array: number[], targetValue: number) => {
    const map = new Map<number, number>();
    const stepsArray: Step[] = [];

    for (let i = 0; i < array.length; i++) {
      const complement = targetValue - array[i];
      const mapSnapshot = Object.fromEntries(map);
      const found = map.has(complement);

      const explanation = found
        ? `Found complement ${complement} at index ${map.get(complement)}. Solution: [${map.get(complement)}, ${i}].`
        : `Looking for ${complement} in the map. Not found. Storing ${array[i]} at index ${i} in the map.`;

      stepsArray.push({
        currentIndex: i,
        complement: found ? complement : null,
        mapSnapshot,
        found,
        explanation,
      });

      if (found) break;

      map.set(array[i], i);
    }

    return stepsArray;
  };

  // Initialize steps
  useEffect(() => {
    setSteps(buildSteps(nums, target));
  }, [nums, target]);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, steps.length, speed]);

  if (steps.length === 0) return <div className="text-center mt-8">Loading Visualizer...</div>;

  const currentStep = steps[currentStepIndex];

  // Handlers
  const handlePlayPause = () => setIsPlaying((prev) => !prev);
  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };
  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

const handleUserInput = () => {
  try {
    const parsedArray = inputArray.split(",").map((num) => parseInt(num.trim(), 10));
    const parsedTarget = parseInt(inputTarget.trim(), 10);

    if (parsedArray.some(isNaN) || isNaN(parsedTarget)) {
      alert("Please enter valid numbers.");
      return;
    }

    setNums(parsedArray);
    setTarget(parsedTarget);
    setSteps(buildSteps(parsedArray, parsedTarget));
    setCurrentStepIndex(0);
    setIsPlaying(false);
  } catch {
    alert("Invalid input. Please try again.");
  }
};


  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient text-center mb-6">Two Sum Visualizer</h1>

      {/* User Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <Input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter array (e.g. 2,7,11,15)"
          className="w-full md:w-1/2"
        />
        <Input
          type="text"
          value={inputTarget}
          onChange={(e) => setInputTarget(e.target.value)}
          placeholder="Enter target (e.g. 9)"
          className="w-full md:w-1/4"
        />
        <Button onClick={handleUserInput} className="w-full md:w-auto">
          Visualize
        </Button>
      </div>

      <ArrayDisplay
        array={nums}
        currentIndex={currentStep.currentIndex}
        complementIndex={nums.indexOf(currentStep.complement ?? -1)}
      />

      <MapDisplay
        map={currentStep.mapSnapshot}
        currentSearch={target - nums[currentStep.currentIndex]}
      />

      <div className="my-4">
        <Progress value={progress} className="h-3" />
        <p className="text-center text-gray-600 mt-2">
          Step {currentStepIndex + 1} of {steps.length}
        </p>
      </div>

      <StepController
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        onRestart={handleRestart}
      />

      <div className="my-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Speed: {speed}ms per step</label>
        <input
          type="range"
          min="500"
          max="3000"
          step="100"
          value={speed}
          onChange={handleSpeedChange}
          className="w-full"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="font-semibold mb-2 text-lg">Explanation:</h2>
        <p className="text-gray-700">{currentStep.explanation}</p>
      </div>

      {currentStep.found && (
        <div className="mt-6 text-center text-green-600 font-semibold text-lg">
          🎉 Solution Found: [{currentStep.mapSnapshot[currentStep.complement!]}, {currentStep.currentIndex}]
        </div>
      )}
    </div>
  );
};

export default TwoSumVisualizer;
