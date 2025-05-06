"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { cn } from "@/lib/utils";

export default function QuickSortVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [activeIndices, setActiveIndices] = useState<number[]>([]);
    const [pivotIndex, setPivotIndex] = useState<number | null>(null);
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
    setPivotIndex(null);
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


const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    setPivotIndex(high);
    addTimelineEvent(`Pivot chosen: ${pivot} at index ${high}`);
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      setActiveIndices([j]);
      await pausableDelay(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        addTimelineEvent(`Swapped ${arr[i]} and ${arr[j]}`);
        await pausableDelay(speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    addTimelineEvent(`Swapped pivot ${arr[i + 1]} with ${arr[high]}`);
    setActiveIndices([]);
    setPivotIndex(null);
    await pausableDelay(speed);
    return i + 1;
  };

  const startQuickSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
    await quickSort(array, 0, array.length - 1);
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
  };
  
  
  

  return (
         <section className="min-h-screen flex flex-col p-8 py-25 bg-background">
              <Navbar />
   <VisualizerLayout
  title="Quick Sort Visualizer"
  description="Visualize the Quick Sort algorithm with customizable array size and animation speed."
  concepts={
    <Accordion type="multiple" className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">
      
      <AccordionItem value="what-is-quick-sort">
        <AccordionTrigger>What is Quick Sort?</AccordionTrigger>
        <AccordionContent>
          Quick Sort is a <strong>Divide and Conquer</strong> algorithm that:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Selects a pivot element</li>
            <li>Partitions the array such that elements less than pivot go to the left, greater to the right</li>
            <li>Recursively applies the same strategy to subarrays</li>
          </ul>
          It’s one of the fastest in-place sorting algorithms in practice.
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
            <li><strong>Time Complexity:</strong> 
              <ul className="ml-4 list-disc space-y-1">
                <li>Best & Average: O(n log n)</li>
                <li>Worst: O(n²) — occurs when pivot selection is poor (e.g., already sorted array)</li>
              </ul>
            </li>
            <li><strong>Space Complexity:</strong> O(log n) — for recursive stack (in-place sort)</li>
          </ul>
          Unlike Merge Sort, Quick Sort doesn&apos;t require extra space for merging.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-by-step">
        <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Pick a pivot element (usually first, last, middle, or random)</li>
            <li>Partition the array into two subarrays around the pivot</li>
            <li>Recursively apply the same logic to left and right subarrays</li>
            <li>Combine the results to form a sorted array</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pseudocode">
        <AccordionTrigger>Pseudocode</AccordionTrigger>
        <AccordionContent>
          <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
{`function quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)

function partition(arr, low, high):
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1:
    if arr[j] < pivot:
      i++
      swap arr[i] and arr[j]
  swap arr[i + 1] and arr[high]
  return i + 1`}
          </pre>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="optimizations">
        <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use median-of-three or random pivot to avoid worst-case performance</li>
            <li>Tail call optimization or iterative implementation to reduce recursion stack</li>
            <li>Hybrid sort: switch to insertion sort for small partitions</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="example">
        <AccordionTrigger>Example Walkthrough</AccordionTrigger>
        <AccordionContent>
          <p>For array: [6, 3, 8, 5]</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Choose pivot: 5</li>
            <li>Partition → [3], [5], [6, 8]</li>
            <li>Sort left → [3], sort right → [6, 8]</li>
            <li>Final array: [3, 5, 6, 8]</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flowchart">
        <AccordionTrigger>Flowchart</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Simplified Quick Sort process:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Start → Choose Pivot</li>
            <li>→ Partition Array</li>
            <li>→ Recursively Sort Left & Right</li>
            <li>→ Final Sorted Array</li>
          </ul>
          <p className="mt-2">Add a visual flowchart using SVG or image later.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="use-cases">
        <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Efficient in-memory sorting when space is limited</li>
            <li>High-performance libraries and system-level sorts</li>
            <li>Sorting primitive data types in low-latency systems</li>
            <li>General-purpose fast sort when average performance matters most</li>
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
            <Button onClick={startQuickSort} disabled={isSorting}>
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
                "mb-1 text-[10px] sm:text-xs md:text-sm font-medium",
                pivotIndex === idx
                  ? "text-yellow-500"
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
                pivotIndex === idx
                  ? "bg-yellow-400"
                  : activeIndices.includes(idx)
                  ? "bg-red-400"
                  : "bg-primary",
                "w-[5px] sm:w-[10px] md:w-[14px] lg:w-[18px] xl:w-[22px]"
              )}
              style={{ height: `clamp(10px, ${value * 2.5}px, 90vh)` }}
              layout
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
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