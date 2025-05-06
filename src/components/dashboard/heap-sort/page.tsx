"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { cn } from "@/lib/utils";

export default function HeapSortVisualizer() {
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


const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    setActiveIndices([i, left, right]);
    await pausableDelay(speed);

    if (largest !== i) {
      setSwapIndices([i, largest]);
      addTimelineEvent(`Swapping ${arr[i]} and ${arr[largest]}`);
      swap(arr, i, largest);
      setArray([...arr]);
      await pausableDelay(speed);
      setSwapIndices([]);
      await heapify(arr, n, largest);
    }
  };

  const heapSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
    const arr = [...array];
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Heap sort
    for (let i = n - 1; i > 0; i--) {
      setSwapIndices([0, i]);
      addTimelineEvent(`Moving max ${arr[0]} to end`);
      swap(arr, 0, i);
      setArray([...arr]);
      await pausableDelay(speed);
      setSwapIndices([]);
      await heapify(arr, i, 0);
    }

    setActiveIndices([]);
    setEndTime(Date.now());
    addTimelineEvent("✅ Sorting Complete!");
    setIsSorting(false);
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
  };
  
  
  

  return (
         <section className="min-h-screen flex flex-col p-8 py-25 bg-background">
              <Navbar />
              <VisualizerLayout
  title="Heap Sort Visualizer"
  description="Visualize the Heap Sort algorithm with customizable array size and animation speed."
  concepts={
    <Accordion type="multiple" className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">
      
      <AccordionItem value="what-is-heap-sort">
        <AccordionTrigger>What is Heap Sort?</AccordionTrigger>
        <AccordionContent>
          Heap Sort is a <strong>Comparison-based</strong> sorting algorithm that uses a Binary Heap data structure:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Builds a Max Heap from the input array</li>
            <li>Extracts the maximum element and places it at the end</li>
            <li>Repeats the process to sort the entire array</li>
          </ul>
          It’s efficient, in-place, and doesn’t require recursion.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pattern-category">
        <AccordionTrigger>Pattern & Category</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Pattern:</strong> Heap / Priority Queue</li>
            <li><strong>Category:</strong> Comparison-based, In-place Sorting Algorithm</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="complexity">
        <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Time Complexity:</strong> O(n log n) — in all cases</li>
            <li><strong>Space Complexity:</strong> O(1) — in-place sort using no extra memory</li>
          </ul>
          Heap Sort offers consistent performance regardless of input order.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-by-step">
        <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Build a Max Heap from the array</li>
            <li>Swap the first (largest) element with the last</li>
            <li>Reduce heap size and heapify the root</li>
            <li>Repeat until the array is sorted</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pseudocode">
        <AccordionTrigger>Pseudocode</AccordionTrigger>
        <AccordionContent>
          <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
{`function heapSort(arr):
  n = length of arr

  // Build max heap
  for i = n/2 - 1 to 0:
    heapify(arr, n, i)

  // Extract elements from heap one by one
  for i = n - 1 to 1:
    swap arr[0] and arr[i]
    heapify(arr, i, 0)

function heapify(arr, n, i):
  largest = i
  left = 2 * i + 1
  right = 2 * i + 2

  if left < n and arr[left] > arr[largest]:
    largest = left
  if right < n and arr[right] > arr[largest]:
    largest = right

  if largest != i:
    swap arr[i] and arr[largest]
    heapify(arr, n, largest)`}
          </pre>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="optimizations">
        <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use bottom-up heap construction for efficiency (linear time build)</li>
            <li>Minimize swaps by using sift-down optimization</li>
            <li>In-place variant makes it suitable for memory-constrained environments</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="example">
        <AccordionTrigger>Example Walkthrough</AccordionTrigger>
        <AccordionContent>
          <p>For array: [4, 10, 3, 5, 1]</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Build Max Heap: [10, 5, 3, 4, 1]</li>
            <li>Swap 10 with 1 → [1, 5, 3, 4, 10], then heapify → [5, 4, 3, 1, 10]</li>
            <li>Repeat → [4, 1, 3, 5, 10] → [3, 1, 4, 5, 10] → ...</li>
            <li>Sorted array: [1, 3, 4, 5, 10]</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flowchart">
        <AccordionTrigger>Flowchart</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Simplified Heap Sort process:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Start → Build Max Heap</li>
            <li>→ Swap Root with Last</li>
            <li>→ Heapify Reduced Heap</li>
            <li>→ Repeat Until Sorted</li>
          </ul>
          <p className="mt-2">You can later add a visual flowchart using SVG or an image.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="use-cases">
        <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Systems with limited memory that require in-place sorting</li>
            <li>Sorting large datasets with consistent performance</li>
            <li>Priority queue implementations (core concept of heap)</li>
            <li>Streaming data where top-K elements are required</li>
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
            <Button onClick={heapSort} disabled={isSorting}>
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

      <div className="flex items-end justify-center w-full max-w-6xl gap-[2px] sm:gap-1 md:gap-1.5 bg-muted rounded-lg px-7 py-4 h-[40vh] sm:h-[50vh] md:h-[60vh]">
        {array.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center">
             <span
              className={cn(
                "mb-1 text-xs",
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
              layout
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className={cn(
                "rounded-t-md",
                swapIndices.includes(idx)
                  ? "bg-yellow-400"
                  : activeIndices.includes(idx)
                  ? "bg-red-400"
                  : "bg-primary",
                "w-[8px] sm:w-[12px] md:w-[16px] lg:w-[20px]"
              )}
              style={{
                height: `${value * 3}px`,
              }}
            />
          </div>
        ))}
      </div>

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