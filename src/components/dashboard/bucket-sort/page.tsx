"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { cn } from "@/lib/utils";

export default function BucketSortVisualizer() {
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
const insertionSortBucket = (bucket: number[]): number[] => {
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;
    }
    return bucket;
  };
  


const bucketSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
  
    const arr = [...array];
    const n = arr.length;
    const numBuckets = 10;
  
    const buckets: number[][] = Array.from({ length: numBuckets }, () => []);
  
    const maxVal = Math.max(...arr);
    const minVal = Math.min(...arr);
    const range = maxVal - minVal || 1;
  
    addTimelineEvent("🪣 Creating and filling buckets");
  
    // Step 1: Distribute into buckets
    for (let i = 0; i < n; i++) {
      const index = Math.floor(((arr[i] - minVal) / range) * (numBuckets - 1));
      buckets[index].push(arr[i]);
      setActiveIndices([i]);
      addTimelineEvent(`Putting ${arr[i]} into bucket ${index}`);
      await pausableDelay(speed);
    }
  
    // Step 2: Sort each bucket (insertion sort for stability)
    addTimelineEvent("🔄 Sorting individual buckets");
    for (let b = 0; b < numBuckets; b++) {
      if (buckets[b].length > 0) {
        buckets[b] = insertionSortBucket(buckets[b]); // returns sorted bucket
        addTimelineEvent(`Sorted bucket ${b}: [${buckets[b].join(', ')}]`);
        await pausableDelay(speed * 0.7);
      }
    }
  
    // Step 3: Concatenate buckets into array
    addTimelineEvent("Merging buckets into sorted array");
  
    let idx = 0;
    for (let b = 0; b < numBuckets; b++) {
      for (let i = 0; i < buckets[b].length; i++) {
        arr[idx++] = buckets[b][i];
        setArray([...arr]);
        setActiveIndices([idx - 1]);
        await pausableDelay(speed);
      }
    }
  
    setArray([...arr]);
    setActiveIndices([]);
    setSwapIndices([]);
    setEndTime(Date.now());
    addTimelineEvent("✅ Bucket Sort Complete!");
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
  title="Bucket Sort Visualizer"
  description="Visualize the Bucket Sort algorithm with customizable array size and animation speed."
  concepts={
    <Accordion type="multiple" className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">

      <AccordionItem value="what-is-bucket-sort">
        <AccordionTrigger>What is Bucket Sort?</AccordionTrigger>
        <AccordionContent>
          Bucket Sort is a <strong>non-comparison-based</strong> sorting algorithm that:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Distributes elements into a number of buckets</li>
            <li>Sorts each bucket individually (often using Insertion Sort)</li>
            <li>Concatenates all sorted buckets into a final sorted array</li>
          </ul>
          It’s effective for uniformly distributed data and can outperform comparison sorts in such cases.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pattern-category">
        <AccordionTrigger>Pattern & Category</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Pattern:</strong> Distribution & Insertion</li>
            <li><strong>Category:</strong> Non-comparison-based, Distribution Sort</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="complexity">
        <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Time Complexity:</strong> O(n + k) average — depends on bucket distribution</li>
            <li><strong>Worst Case:</strong> O(n²) — if all elements land in one bucket</li>
            <li><strong>Space Complexity:</strong> O(n + k) — extra space for buckets</li>
          </ul>
          The performance depends on how evenly the data is distributed into buckets.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-by-step">
        <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Create empty buckets</li>
            <li>Distribute the array elements into appropriate buckets</li>
            <li>Sort each bucket (commonly using Insertion Sort)</li>
            <li>Concatenate all sorted buckets into the final array</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pseudocode">
        <AccordionTrigger>Pseudocode</AccordionTrigger>
        <AccordionContent>
          <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
{`function bucketSort(arr, bucketSize):
  if arr.length <= 1:
    return arr

  minVal = min(arr)
  maxVal = max(arr)

  bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1
  buckets = array of empty arrays of size bucketCount

  for num in arr:
    bucketIndex = Math.floor((num - minVal) / bucketSize)
    buckets[bucketIndex].push(num)

  sortedArray = []
  for bucket in buckets:
    insertionSort(bucket)
    sortedArray = sortedArray.concat(bucket)

  return sortedArray`}
          </pre>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="optimizations">
        <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Choose optimal bucket size based on data range</li>
            <li>Use Insertion Sort for small or partially sorted buckets</li>
            <li>Use dynamic bucket resizing to handle skewed distributions</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="example">
        <AccordionTrigger>Example Walkthrough</AccordionTrigger>
        <AccordionContent>
          <p>For array: [0.42, 0.32, 0.23, 0.52, 0.25, 0.47]</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Create 5 buckets: [0–0.2), [0.2–0.4), [0.4–0.6), etc.</li>
            <li>Distribute: [0.23, 0.25, 0.32] → 1st bucket, [0.42, 0.47, 0.52] → 2nd bucket</li>
            <li>Sort each bucket: [0.23, 0.25, 0.32], [0.42, 0.47, 0.52]</li>
            <li>Concatenate: [0.23, 0.25, 0.32, 0.42, 0.47, 0.52]</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flowchart">
        <AccordionTrigger>Flowchart</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Overview of the process:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Start → Create Buckets</li>
            <li>→ Distribute Elements</li>
            <li>→ Sort Buckets</li>
            <li>→ Merge Buckets → Sorted Array</li>
          </ul>
          <p className="mt-2">Consider adding a flowchart visual using SVG or image for better understanding.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="use-cases">
        <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Sorting floating-point numbers uniformly distributed between 0 and 1</li>
            <li>Histogram sort and statistical data processing</li>
            <li>Parallel/distributed sorting systems</li>
            <li>Efficient sorting of decimal values in computer graphics and simulations</li>
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
            <Button onClick={bucketSort} disabled={isSorting}>
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