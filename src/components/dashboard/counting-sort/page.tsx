"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { cn } from "@/lib/utils";

export default function CountingSortVisualizer() {
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


const countingSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
    const arr = [...array];
  
    const max = Math.max(...arr);
    const count = Array(max + 1).fill(0);
    const output = Array(arr.length);
  
    addTimelineEvent("🔍 Counting frequencies");
  
    // Step 1: Count occurrences
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      count[val]++;
      setActiveIndices([i]);
      addTimelineEvent(`Count of ${val} incremented to ${count[val]}`);
      await pausableDelay(speed);
    }
  
    // Step 2: Accumulate counts (prefix sum)
    addTimelineEvent("📊 Calculating cumulative counts");
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
      addTimelineEvent(`Cumulative count at ${i} is now ${count[i]}`);
      await pausableDelay(speed / 1.5);
    }
  
    // Step 3: Build output array (iterate from end for stability)
    addTimelineEvent("🛠 Building output array");
    for (let i = arr.length - 1; i >= 0; i--) {
      const val = arr[i];
      const pos = count[val] - 1;
      output[pos] = val;
      count[val]--;
      setActiveIndices([i]);
      setSwapIndices([pos]);
      setArray([...output]); // live update output bar
      addTimelineEvent(`Placing ${val} at position ${pos}`);
      await pausableDelay(speed);
    }
  
    // Step 4: Copy back to original array
    addTimelineEvent("📦 Copying sorted output back to original array");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      setArray([...arr]);
      setActiveIndices([i]);
      setSwapIndices([]);
      await pausableDelay(speed / 1.2);
    }
  
    setActiveIndices([]);
    setSwapIndices([]);
    setEndTime(Date.now());
    addTimelineEvent("✅ Counting Sort Complete!");
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
  title="Counting Sort Visualizer"
  description="Visualize the Counting Sort algorithm with customizable array size and animation speed."
  concepts={
    <Accordion type="multiple" className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">

      <AccordionItem value="what-is-counting-sort">
        <AccordionTrigger>What is Counting Sort?</AccordionTrigger>
        <AccordionContent>
          Counting Sort is a <strong>non-comparison-based</strong> sorting algorithm ideal for sorting integers within a limited range:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Counts the number of occurrences of each value</li>
            <li>Calculates positions using cumulative counts</li>
            <li>Places elements into their sorted position</li>
          </ul>
          It works best when the range of input values is not significantly larger than the number of elements.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pattern-category">
        <AccordionTrigger>Pattern & Category</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Pattern:</strong> Frequency Counting</li>
            <li><strong>Category:</strong> Non-comparison-based, Stable Sorting Algorithm</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="complexity">
        <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Time Complexity:</strong> O(n + k) — where <code>n</code> is the number of elements and <code>k</code> is the range of input</li>
            <li><strong>Space Complexity:</strong> O(k + n) — extra space for count and output arrays</li>
          </ul>
          Counting Sort is linear if <code>k</code> is in the order of <code>n</code>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-by-step">
        <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Find the maximum value in the array</li>
            <li>Create a count array of size (max + 1) initialized to 0</li>
            <li>Count the frequency of each element</li>
            <li>Modify the count array to hold cumulative counts</li>
            <li>Place each element in the output array using the count array</li>
            <li>Copy the sorted values back to the original array</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pseudocode">
        <AccordionTrigger>Pseudocode</AccordionTrigger>
        <AccordionContent>
          <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
{`function countingSort(arr):
  maxVal = find maximum value in arr
  count = array of size maxVal + 1 initialized to 0
  output = array of size arr.length

  for num in arr:
    count[num] += 1

  for i from 1 to maxVal:
    count[i] += count[i - 1]

  for i from arr.length - 1 downto 0:
    output[count[arr[i]] - 1] = arr[i]
    count[arr[i]] -= 1

  copy output to arr`}
          </pre>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="optimizations">
        <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Only sort non-negative integers unless you normalize the input</li>
            <li>Skip unused parts of the count array for memory optimization</li>
            <li>Use prefix sums in the count array to determine correct positions</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="example">
        <AccordionTrigger>Example Walkthrough</AccordionTrigger>
        <AccordionContent>
          <p>For array: [4, 2, 2, 8, 3, 3, 1]</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Count: [0, 1, 2, 2, 1, 0, 0, 0, 1]</li>
            <li>Cumulative count: [0, 1, 3, 5, 6, 6, 6, 6, 7]</li>
            <li>Sorted array: [1, 2, 2, 3, 3, 4, 8]</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flowchart">
        <AccordionTrigger>Flowchart</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Visual process overview:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Start → Find max value</li>
            <li>→ Count frequencies</li>
            <li>→ Create cumulative count array</li>
            <li>→ Build output array</li>
            <li>→ Copy output to original</li>
          </ul>
          <p className="mt-2">You can later add an SVG or image-based flowchart here for clarity.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="use-cases">
        <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Sorting student test scores (bounded integers)</li>
            <li>Used as a stable sort inside Radix Sort</li>
            <li>Efficient for low-range integer keys in linear time</li>
            <li>Preprocessing step for histogram-based analytics</li>
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
            <Button onClick={countingSort} disabled={isSorting}>
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