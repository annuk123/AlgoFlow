'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { cn } from "@/lib/utils";

export default function SelectionSortVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [swapIndices, setSwapIndices] = useState<number[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [customInput, setCustomInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateArray(); // generate array on first load
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 25 }, () =>
      Math.floor(Math.random() * 100) + 5
    );
    setArray(newArray);
    setTimeline([]);
    setActiveIndices([]);
    setSwapIndices([]);
    setActiveIndices([]);
    setStartTime(null);
    setEndTime(null);
  };
  const addTimelineEvent = (event: string) => {
    setTimeline((prev) => [...prev, event]);
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

  const selectionSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      await waitWhilePaused();
      addTimelineEvent(`Selecting index ${i} as current minimum`);
      setActiveIndices([i]);
      await waitWhilePaused();

      for (let j = i + 1; j < n; j++) {
        setActiveIndices([minIdx, j]);
        addTimelineEvent(`Comparing ${arr[j]} with current minimum ${arr[minIdx]}`);
        await pausableDelay(speed);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          addTimelineEvent(`New minimum found: ${arr[minIdx]} at index ${minIdx}`);
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setSwapIndices([i, minIdx]);
        setArray([...arr]);
        addTimelineEvent(`Swapped ${arr[minIdx]} with ${arr[i]}`);
        await pausableDelay(speed);
      }

      setSwapIndices([]);
    }

    setIsSorting(false);
    setEndTime(Date.now());
    setActiveIndices([]);
    setSwapIndices([]);
    addTimelineEvent("Sorting Complete!");
  };

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


  return (
     <section className="min-h-screen flex flex-col p-8 py-25 bg-background">
          <Navbar />
    <VisualizerLayout
      title="Selection Sort Visualizer"
      description="Selection Sort is a simple and intuitive sorting algorithm that divides the array into a sorted and an unsorted part."
      concepts={
        <Accordion type="multiple" className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed">
            <AccordionItem value="what-is-selection-sort">
  <AccordionTrigger>What is Selection Sort?</AccordionTrigger>
  <AccordionContent>
    <p>
      Selection Sort is a straightforward comparison-based sorting algorithm.
      It works by dividing the array into two parts: a sorted part at the beginning and an unsorted part at the end.
      The algorithm repeatedly selects the smallest (or largest) element from the unsorted section and swaps it with the first unsorted element,
      thus growing the sorted part one element at a time.
    </p>
    <p className="mt-2">
      Unlike Bubble Sort, it does not repeatedly swap adjacent elements. Instead, it minimizes the number of swaps by only swapping once per outer loop iteration.
    </p>
  </AccordionContent>
</AccordionItem>    
          <AccordionItem value="pattern-category">
            <AccordionTrigger>Pattern & Category</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Category:</strong> Comparison-based Sorting <br />
                <strong>Algorithmic Paradigm:</strong> In-place, Unstable <br />
                <strong>Sorting Pattern:</strong> Selection pattern — repeatedly selects the minimum/maximum.
              </p>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="complexity">
            <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Best Case:</strong> O(n²) <br />
                <strong>Average Case:</strong> O(n²) <br />
                <strong>Worst Case:</strong> O(n²) <br />
                <strong>Space Complexity:</strong> O(1) (in-place)
              </p>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="step-process">
            <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-1">
                <li>Start from the beginning of the array.</li>
                <li>Find the smallest element in the unsorted part.</li>
                <li>Swap it with the first element of the unsorted part.</li>
                <li>Move the boundary of the sorted part one element to the right.</li>
                <li>Repeat until the array is fully sorted.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="pseudocode">
            <AccordionTrigger>Pseudocode</AccordionTrigger>
            <AccordionContent>
              <pre className="bg-background p-3 rounded-md text-sm overflow-x-auto">
      {`for i from 0 to n - 1:
          minIndex = i
          for j from i + 1 to n:
              if array[j] < array[minIndex]:
                  minIndex = j
          swap array[i] and array[minIndex]`}
              </pre>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="optimizations">
            <AccordionTrigger>Optimizations</AccordionTrigger>
            <AccordionContent>
              <p>Selection sort cannot be easily optimized like Bubble Sort. However, one slight improvement is to skip the swap if the min index is the same as the current index.</p>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="tips-tricks">
            <AccordionTrigger>Tips & Tricks</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Always minimizes the number of swaps compared to Bubble Sort.</li>
                <li>Useful in memory write-limited environments.</li>
                <li>Does not depend on input order — performs equally on sorted, reversed, or random data.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="example">
            <AccordionTrigger>Example Walkthrough</AccordionTrigger>
            <AccordionContent>
              <pre className="bg-background p-3 rounded-md text-sm overflow-x-auto">
      {`Input: [29, 10, 14, 37, 13]
      Step 1: Select min (10), swap with 29 → [10, 29, 14, 37, 13]
      Step 2: Select min (13), swap with 29 → [10, 13, 14, 37, 29]
      Step 3: Select min (14), already in place
      Step 4: Select min (29), swap with 37 → [10, 13, 14, 29, 37]
      Done.`}
              </pre>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="flowchart">
            <AccordionTrigger>Flowchart</AccordionTrigger>
            <AccordionContent>
              <p>I can provide a clean and colorful SVG or PNG flowchart diagram. Would you like me to generate one?</p>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="real-use-case">
            <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Sorting very small datasets where simplicity matters.</li>
                <li>Education — great for teaching sorting logic and visualizations.</li>
                <li>Memory-limited systems where swap cost is more important than comparisons.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
      
    >
      {/* Array Visual */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center mt-6 px-6">
      <div className="w-full flex items-center justify-center mb-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={generateArray} disabled={isSorting}>
              Generate New Array
            </Button>
            <Button onClick={selectionSort} disabled={isSorting}>
              Start Sorting
            </Button>
            <Button
              onClick={() => setIsPaused(true)}
              disabled={!isSorting || isPaused}
              variant="secondary"
            >
              Pause
            </Button>
            <Button
              onClick={() => setIsPaused(false)}
              disabled={!isSorting || !isPaused}
              variant="default"
            >
              Resume
            </Button>
          </div>
        </div>
        {/* Visualizer Bars */}
        0<div className="flex items-end justify-center w-[100%] max-w-6xl gap-[2px] sm:gap-1 md:gap-1.5 bg-muted rounded-lg px-7 py-4 h-[40vh] sm:h-[50vh] md:h-[60vh]">
  {array.map((value, idx) => (
    <div key={idx} className="flex flex-col items-center">
      {/* Label on top of the bar */}
      <span
        className={cn(
          "mb-1 text-[10px] sm:text-xs md:text-sm font-medium",
          swapIndices.includes(idx)
            ? "text-green-600"
            : activeIndices.includes(idx)
            ? "text-red-500"
            : "text-foreground"
        )}
      >
        {value}
      </span>

      <motion.div
        className={cn(
          "rounded-t-md",
          swapIndices.includes(idx)
            ? "bg-yellow-400"
            : activeIndices.includes(idx)
            ? "bg-red-400"
            : "bg-primary",
          // Responsive width
          "w-[5px] sm:w-[10px] md:w-[14px] lg:w-[18px] xl:w-[22px]"
        )}
        // Responsive height using clamp
        style={{ height: `clamp(10px, ${value * 2.5}px, 90vh)` }}
        layout
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  ))}
</div>


      {/* Controls */}
      <div className="flex flex-col gap-4 mt-6 w-full items-center">
        

        <div className="flex items-center gap-2 mt-4">
          <label className="text-sm font-medium">Speed:</label>
          <select
            className="rounded-md bg-background border p-2"
            disabled={isSorting}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value={500}>Slow</option>
            <option value={300}>Medium</option>
            <option value={100}>Fast</option>
          </select>
        </div>



        {/* Timeline */}
        <div className="w-full max-w-xl bg-muted rounded-lg mt-6 p-4 h-[200px] overflow-y-auto">
          <h2 className="text-md font-semibold mb-2 text-center">Timeline</h2>
          <div className="text-xs flex flex-col gap-1">
            {timeline.map((event, idx) => (
              <div key={idx} className="bg-background p-2 rounded-md shadow-sm">
                {event}
              </div>
            ))}
          </div>
        </div>

        {/* Time Taken */}
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
}
