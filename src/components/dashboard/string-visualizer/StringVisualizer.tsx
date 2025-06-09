"use client";

import { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import { useSearchParams } from "next/navigation";

export default function StringVisualizer() {
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [operation, setOperation] = useState("traverse");

  const searchParams = useSearchParams();
  const initialOperation = searchParams.get("operation") || "traverse";

  useEffect(() => {
    setOperation(initialOperation);
  }, [initialOperation]);

  const handleStart = () => {
    setIsPlaying(true);
    if (operation === "traverse") animateTraversal();
    else if (operation === "reverse") animateReverse();
  };

  const animateTraversal = () => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentIndex(index);
      index++;
      if (index >= input.length) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, speed);
  };

const animateReverse = () => {
  const arr = input.split("");
  let start = 0, end = arr.length - 1;

  const interval = setInterval(() => {
    if (start >= end) {
      clearInterval(interval);
      setIsPlaying(false);
      return;
    }
    [arr[start], arr[end]] = [arr[end], arr[start]];
    setInput(arr.join(""));
    setCurrentIndex(start);
    start++;
    end--;
  }, speed);
};


  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(-1);
  };

  return (
    <section className="flex flex-col md:flex-row gap-6 p-6">
      <div className="md:w-3/3 space-y-6">
        <input
          type="text"
          placeholder="Enter a string"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-700"
        />

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Memory Allocation</h2>
          <div className="flex justify-center flex-wrap gap-4">
            {input.split("").map((char, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg text-lg font-bold ${
                    index === currentIndex ? "border-purple-600 bg-purple-400" : "border-gray-400"
                  }`}
                >
                  {char}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">Index {index}</div>
              </div>
            ))}
          </div>
        </div>
        <ControlPanel
          onStart={handleStart}
          onReset={handleReset}
          speed={speed}
          setSpeed={setSpeed}
          isPlaying={isPlaying}
          setOperation={setOperation}
        />

                <div className="text-center max-w-full text-gray-600 dark:text-gray-300">
          <p className="mb-4">
            Enter a string below to visualize string operations such as character traversal, string reversal, and memory allocation. You can control the animation speed and switch between operations using the control panel.
          </p>
          <ul className="list-disc list-inside text-left space-y-2">
            <li><strong>Traverse:</strong> Highlights each character in sequence.</li>
            <li><strong>Reverse:</strong> Swaps characters from both ends, visually reversing the string.</li>
            <li><strong>Memory Allocation:</strong> Displays how each character is stored in individual memory blocks (indices).</li>
            <li><strong>Speed Control:</strong> Adjust the slider to change animation speed.</li>
            <li><strong>Reset:</strong> Clears the visualization and resets to the starting point.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
