'use client';

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Image from "next/image";
import Navbar from "@/components/nav/nav";


export const BubbleSortVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [speed, setSpeed] = useState<number>(300);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [swapIndices, setSwapIndices] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(arr);
    setTimeline([]);
    setActiveIndices([]);
    setStartTime(null);
    setEndTime(null);
  };



  const [customInput, setCustomInput] = useState(""); // new
  const [error, setError] = useState(""); // new

  const handleCustomInput = () => {
    // Remove whitespace, split by commas, and validate
    const rawItems = customInput.split(",").map(item => item.trim());
  
    // Check for empty strings (caused by ,, or leading/trailing commas)
    const hasInvalid = rawItems.some(item => item === "" || isNaN(Number(item)));
  
    if (hasInvalid || rawItems.length === 0) {
      setError("Please enter a valid comma-separated list of numbers.");
      return;
    }
  
    const cleaned = rawItems.map(Number);
    setArray(cleaned);
    setTimeline([]);
    setError(""); // Clear error
  };


  const addTimelineEvent = (event: string) => {
    setTimeline(prev => [...prev, event]);
  };


const isPausedRef = useRef(isPaused);

useEffect(() => {
  isPausedRef.current = isPaused;
}, [isPaused]);


  const waitWhilePaused = () => {
    return new Promise<void>((resolve) => {
      const check = () => {
        if (!isPausedRef.current) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  };
  
  const pausableDelay = async (ms: number) => {
    const interval = 50;
    let elapsed = 0;
    while (elapsed < ms) {
      if (!isPausedRef.current) {
        await new Promise((res) => setTimeout(res, interval));
        elapsed += interval;
      } else {
        await new Promise((res) => setTimeout(res, interval));
      }
    }
  };
  
  
  const bubbleSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
  
    const arr = [...array];
    const n = arr.length;
    let swapped;
  
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
  
      for (let j = 0; j < n - i - 1; j++) {
        await waitWhilePaused();
  
        setActiveIndices([j, j + 1]);
        setSwapIndices([]); // Reset unless actually swapping
        addTimelineEvent(`Comparing ${arr[j]} and ${arr[j + 1]}`);
  
        await waitWhilePaused();
  
        if (arr[j] > arr[j + 1]) {
          addTimelineEvent(`Swapping ${arr[j]} and ${arr[j + 1]}`);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          setSwapIndices([j, j + 1]);
  
        
          await pausableDelay(speed);      // during swap
               // if no swap

          swapped = true;
        } else {
          // await waitWhilePaused();
          // await delay(speed / 2);
          await pausableDelay(speed / 2); 
        }
      }
  
      if (!swapped) {
        addTimelineEvent("Array already sorted early!");
        break;
      }
    }
  
    setActiveIndices([]);
    setSwapIndices([]);
    setEndTime(Date.now());
    addTimelineEvent("Sorting Complete!");
    setIsSorting(false);
  };

  function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
  }






  return (

    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background">
  <Navbar />
    <VisualizerLayout
  title="Bubble Sort Visualizer"
  description="Understand Bubble Sort step-by-step through animations, flowcharts, custom inputs, and key insights."
  concepts={
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
      <Accordion
        type="multiple"
        className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2"
      >
        {/* What is Bubble Sort */}
        <AccordionItem value="what-is">
          <AccordionTrigger>What is Bubble Sort?</AccordionTrigger>
          <AccordionContent>
            Bubble Sort is a simple, comparison-based sorting algorithm. It repeatedly compares adjacent elements and swaps them if they are in the wrong order. This process continues until the array is fully sorted. Smaller elements &quot;bubble&quot; to the top in each pass.
          </AccordionContent>
        </AccordionItem>

        {/* Pattern & Category */}
        <AccordionItem value="pattern">
          <AccordionTrigger>Pattern & Category</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside ml-4">
              <li>Comparison-Based Sorting</li>
              <li>In-Place Algorithm (O(1) extra space)</li>
              <li>Stable Sorting</li>
              <li>Adaptive (can exit early if already sorted)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Complexity */}
        <AccordionItem value="complexity">
          <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Best Case:</strong> O(n) — already sorted (with optimization)</li>
              <li><strong>Average Case:</strong> O(n²)</li>
              <li><strong>Worst Case:</strong> O(n²)</li>
            </ul>
            <p className="mt-2"><strong>Space Complexity:</strong> O(1) — constant space</p>
          </AccordionContent>
        </AccordionItem>

        {/* Step-by-Step */}
        <AccordionItem value="steps">
          <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Start from the first element of the array.</li>
              <li>Compare each pair of adjacent elements.</li>
              <li>If the first is greater than the second, swap them.</li>
              <li>After each full pass, the largest unsorted element is placed at the end.</li>
              <li>Repeat the process for the remaining unsorted part.</li>
              <li>If no swaps were made during a pass, the array is sorted and the algorithm stops early.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        {/* Pseudocode */}
        <AccordionItem value="pseudocode">
          <AccordionTrigger>Pseudocode</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-xs font-mono whitespace-pre overflow-auto">
{`for i from 0 to n - 1:
    swapped = false
    for j from 0 to n - i - 2:
        if array[j] > array[j + 1]:
            swap(array[j], array[j + 1])
            swapped = true
    if not swapped:
        break`}
            </pre>
          </AccordionContent>
        </AccordionItem>

        {/* Tricks */}
        <AccordionItem value="tricks">
          <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside ml-4">
              <li>Use a `swapped` flag to exit early.</li>
              <li>Skip already sorted elements at the end of each pass.</li>
              <li>Great for small or nearly sorted arrays.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Example */}
        <AccordionItem value="example">
          <AccordionTrigger>Example Walkthrough</AccordionTrigger>
          <AccordionContent>
            <p className="mb-1">Input: <code>[5, 2, 9, 1]</code></p>
            <p>Pass 1: [2, 5, 1, 9]</p>
            <p>Pass 2: [2, 1, 5, 9]</p>
            <p>Pass 3: [1, 2, 5, 9]</p>
            <p>Final Output: <code>[1, 2, 5, 9]</code></p>
          </AccordionContent>
        </AccordionItem>

        {/* Flowchart */}
        <AccordionItem value="flowchart">
          <AccordionTrigger>Flowchart</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-center mt-4 bg-yellow-100 rounded-md p-4 overflow-x-auto">
              <Image 
                src="/flowchart.png"
                alt="Bubble Sort Flowchart"
                width={400}
                height={300}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Use Cases */}
        <AccordionItem value="use-cases">
          <AccordionTrigger>Use Cases</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside ml-4">
              <li>Great for learning sorting algorithms</li>
              <li>Good for small data or nearly sorted inputs</li>
              <li>Used in educational and visualization tools</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  }
>

  
    

      {/* Sorting Bars */}
      <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-10 py-6 gap-8">

{/* Visualization Bars */}

<div className="flex items-end justify-center w-full max-w-4xl gap-[2px] sm:gap-1 overflow-hidden bg-muted rounded-lg p-4 h-[300px] sm:h-[400px] transition-all">
  {array.map((value, idx) => (
    <div key={idx} className="flex flex-col items-center">
      {/* Label on top of the bar */}
      <span
        className={cn(
          "mb-1 text-xs sm:text-sm font-medium",
          swapIndices.includes(idx)
            ? "text-green-600"
            : activeIndices.includes(idx)
            ? "text-red-500"
            : "text-foreground"
        )}
      >
        {value}
      </span>

      {/* The actual animated bar */}
      <motion.div
        className={cn(
          "rounded-t-md transition-all duration-300",
          swapIndices.includes(idx)
            ? "bg-green-500"
            : activeIndices.includes(idx)
            ? "bg-red-400"
            : "bg-primary",
          "w-[8px] sm:w-[13px] md:w-[16px] lg:w-[20px]"
        )}
        style={{
          height: `${value * 3}px`,
        }}
        layout
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  ))}
</div>


{/* Controls Section */}
<div className="w-full flex flex-col items-center gap-6 max-w-xl">

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
    <button
      onClick={generateArray}
      className="w-full sm:w-auto px-6 py-3 bg-muted rounded-full font-semibold hover:scale-105 transition"
      disabled={isSorting}
    >
      New Array
    </button>

    <button
      onClick={bubbleSort}
      className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:scale-105 transition"
      disabled={isSorting}
    >
      Start Sorting
    </button>

    <button
  onClick={() => setIsPaused(!isPaused)}
  className="px-6 py-3 bg-yellow-400 text-white rounded-full font-semibold hover:scale-105 transition"
  disabled={!isSorting}
>
  {isPaused ? "Resume" : "Pause"}
</button>

  </div>

  {/* Speed Selector */}
  <div className="flex flex-col items-center w-full">
    <label className="text-sm font-semibold mb-1">Speed Control</label>
    <select
      value={speed}
      onChange={(e) => setSpeed(Number(e.target.value))}
      disabled={isSorting}
      className="rounded-full bg-background p-2 text-sm w-full sm:w-40"
    >
      <option value={500}>Slow</option>
      <option value={300}>Medium</option>
      <option value={100}>Fast</option>
    </select>

    
  </div>

  {/* Timeline */}
  <div className="w-full max-h-[200px] overflow-y-auto bg-background p-3 rounded-lg shadow-inner border border-muted">
    <h2 className="text-md font-semibold text-center mb-2">Timeline</h2>
    <div className="flex flex-col gap-2 text-xs">
      {timeline.map((event, idx) => (
        <div key={idx} className="bg-muted px-3 py-2 rounded-md">
          {event}
        </div>
      ))}
    </div>
  </div>
  {endTime && startTime && (
  <div className="text-center text-sm font-semibold mt-4">
    Sorting completed in {(endTime - startTime) / 1000} seconds
  </div>
)}

  {/* Custom Input */}

  <div className="w-full flex flex-col items-center justify-center mt-7 gap-2">
  <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center">
    <input
      type="text"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder="Enter numbers like 5, 2, 9, 1"
      className="w-full sm:w-[250px] border rounded-md px-4 py-2"
      disabled={isSorting}
    />
    <button
      onClick={handleCustomInput}
      className="w-full sm:w-auto px-4 py-2 bg-secondary rounded-md font-semibold"
      disabled={isSorting}
    >
      Visualize Input
    </button>
  </div>

  {error && (
    <p className="text-red-500 text-sm text-center">{error}</p>
  )}
</div>

</div>
</div>

    </VisualizerLayout>
    
    </section>
  );
};

export default BubbleSortVisualizer;
