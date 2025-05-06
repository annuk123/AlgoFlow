"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { cn } from "@/lib/utils";

export default function MergeSortVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [activeIndices, setActiveIndices] = useState<number[]>([]);
    // const [swapIndices, setSwapIndices] = useState<number[]>([]);
    const [timeline, setTimeline] = useState<string[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(300);
    const [customInput, setCustomInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [mergedIndices, setMergedIndices] = useState<number[]>([]);


      useEffect(() => {
        generateArray(); // generate array on first load
      }, []);    

  const generateArray = () => {
    const newArray = Array.from({ length: 25 }, () =>
      Math.floor(Math.random() * 100) + 5
    );
    setArray(newArray);
    setTimeline([]);
    setMergedIndices([]);
    setActiveIndices([]);
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
const mergeSort = async (arr: number[], l: number, r: number): Promise<void> => {
    if (l >= r) return;
  
    const mid = Math.floor((l + r) / 2);
    await mergeSort(arr, l, mid);
    await mergeSort(arr, mid + 1, r);
    await merge(arr, l, mid, r);
  };
  
  const merge = async (arr: number[], l: number, m: number, r: number) => {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
  
    while (i < left.length && j < right.length) {
      setActiveIndices([k]);
      await waitWhilePaused(); // Add this if pause support is needed
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }
      setArray([...arr]);
      setMergedIndices([k]);
      addTimelineEvent(`Placed ${arr[k]} at index ${k}`);
      await pausableDelay(speed);
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i++];
      setArray([...arr]);
      setMergedIndices([k]);
      addTimelineEvent(`Copied remaining ${arr[k]} at index ${k}`);
      await pausableDelay(speed);
      k++;
    }
  
    while (j < right.length) {
      arr[k] = right[j++];
      setArray([...arr]);
      setMergedIndices([k]);
      addTimelineEvent(`Copied remaining ${arr[k]} at index ${k}`);
      await pausableDelay(speed);
      k++;
    }
  };
  

  const startSorting = async (inputArray: number[]) => {
    setIsSorting(true);
    setStartTime(Date.now());
    setEndTime(null);
    
  
    const arrayCopy = [...inputArray]; // Work on a copy to avoid mutation issues
    await mergeSort(arrayCopy, 0, arrayCopy.length - 1);
    
    setIsSorting(false);
    setEndTime(Date.now());
    addTimelineEvent("✅ Sorting Complete!");
  };
  

  const handleCustomInput = () => {
    const rawItems = customInput.split(",").map(item => item.trim());
    const hasInvalid = rawItems.some(item => item === "" || isNaN(Number(item)));
  
    if (hasInvalid || rawItems.length === 0) {
      setError("Please enter a valid comma-separated list of numbers.");
      return;
    }
  
    const cleaned = rawItems.map(Number);
    setArray(cleaned);
    setTimeline([]);
    setError(""); // Clear error
    startSorting(cleaned); //  CALL startSorting AFTER SETTING
  };
  
  
  

  return (
         <section className="min-h-screen flex flex-col p-8 py-25 bg-background">
              <Navbar />
    <VisualizerLayout
      title="Merge Sort Visualizer"
      description="Visualize the Merge Sort algorithm with customizable array size and animation speed."
      concepts={
        <Accordion type="multiple" className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">
          
          <AccordionItem value="what-is-merge-sort">
            <AccordionTrigger>What is Merge Sort?</AccordionTrigger>
            <AccordionContent>
              Merge Sort is a <strong>Divide and Conquer</strong> algorithm that:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Recursively splits the array into halves</li>
                <li>Sorts each half independently</li>
                <li>Merges the sorted halves into a final sorted array</li>
              </ul>
              It&apos;s highly efficient for large datasets due to its predictable performance.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="pattern-category">
            <AccordionTrigger>Pattern & Category</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Pattern:</strong> Divide and Conquer</li>
                <li><strong>Category:</strong> Comparison-based, Recursive Sorting Algorithm</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="complexity">
            <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Time Complexity:</strong> O(n log n) — in all cases (worst, average, best)</li>
                <li><strong>Space Complexity:</strong> O(n) — extra space is used for merging</li>
              </ul>
              Unlike in-place sorts, Merge Sort requires additional memory for the merge process.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="step-by-step">
            <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Divide the array into two halves</li>
                <li>Recursively sort the left half</li>
                <li>Recursively sort the right half</li>
                <li>Merge the sorted halves</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="pseudocode">
            <AccordionTrigger>Pseudocode</AccordionTrigger>
            <AccordionContent>
              <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      {`function mergeSort(arr):
        if length of arr <= 1:
          return arr
      
        mid = length of arr / 2
        left = mergeSort(arr[0:mid])
        right = mergeSort(arr[mid:end])
      
        return merge(left, right)
      
      function merge(left, right):
        result = []
        while left and right:
          if left[0] < right[0]:
            result.push(left.shift())
          else:
            result.push(right.shift())
        return result.concat(left).concat(right)`}
              </pre>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="optimizations">
            <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Use insertion sort for small subarrays to reduce overhead</li>
                <li>Avoid merging if the subarrays are already sorted</li>
                <li>Implement bottom-up (iterative) merge sort to reduce recursion stack usage</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="example">
            <AccordionTrigger>Example Walkthrough</AccordionTrigger>
            <AccordionContent>
              <p>For array: [6, 3, 8, 5]</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Split into: [6, 3] and [8, 5]</li>
                <li>Sort each: → [3, 6] and [5, 8]</li>
                <li>Merge them: → [3, 5, 6, 8]</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="flowchart">
            <AccordionTrigger>Flowchart</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Here’s a simplified process diagram:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Start → Split Array</li>
                <li>→ Recursively Sort Left & Right</li>
                <li>→ Merge Sorted Subarrays</li>
                <li>→ Final Sorted Array</li>
              </ul>
              <p className="mt-2">You can add a visual flowchart in the UI later using SVG or image.</p>
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="use-cases">
            <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Sorting linked lists efficiently</li>
                <li>External sorting with large data (e.g., file sorting)</li>
                <li>Stable sort requirement (e.g., sorting objects by multiple keys)</li>
                <li>Databases and compilers that need guaranteed O(n log n) sorting</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
        </Accordion>
      }
      >
        
         <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center mt-6 px-6">
      <div className="w-full flex items-center justify-center mb-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={generateArray} disabled={isSorting}>
              Generate New Array
            </Button>
            <Button onClick={() => startSorting(array)} disabled={isSorting}>
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

<div className="flex items-end justify-center w-full max-w-6xl gap-[2px] sm:gap-1 md:gap-1.5 bg-muted rounded-lg px-7 py-4 h-[40vh] sm:h-[50vh] md:h-[60vh]">
  {array.map((value, idx) => (
    <div key={idx} className="flex flex-col items-center">
      {/* Value label above the bar */}
      <span
        className={cn(
          "mb-1 text-[10px] sm:text-xs md:text-sm font-medium transition-all",
          mergedIndices.includes(idx)
            ? "text-green-600"
            : activeIndices.includes(idx)
            ? "text-red-500"
            : "text-foreground"
        )}
      >
        {value}
      </span>

      {/* Animated bar */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "rounded-t-md transition-colors duration-300",
          mergedIndices.includes(idx)
            ? "bg-green-400" // recently merged
            : activeIndices.includes(idx)
            ? "bg-red-400" //  currently comparing/placing
            : "bg-primary", //  idle
          // Width (responsive)
          "w-[5px] sm:w-[10px] md:w-[14px] lg:w-[18px] xl:w-[22px]"
        )}
        style={{
          height: `clamp(10px, ${value * 2.5}px, 90vh)`, // Responsive height
        }}
      />
    </div>
  ))}
</div>

<div className="flex justify-center mt-5 gap-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-red-400 rounded-sm" /> Comparing
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-green-400 rounded-sm" /> Merged
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-primary rounded-sm" /> Idle
        </span>
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