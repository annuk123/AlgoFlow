"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { cn } from "@/lib/utils";

export default function RadixSortVisualizer() {
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


const getDigit = (num: number, place: number): number => {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  };
  
  const getMaxDigits = (arr: number[]): number => {
    return Math.max(...arr).toString().length;
  };
  
  const countingSortByDigit = async (arr: number[], digit: number) => {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
  
    for (let i = 0; i < arr.length; i++) {
      const digitValue = getDigit(arr[i], digit);
      setActiveIndices([i]);
      addTimelineEvent(`Placing ${arr[i]} in bucket ${digitValue}`);
      buckets[digitValue].push(arr[i]);
      await pausableDelay(speed);
    }
  
    let idx = 0;
    for (let b = 0; b < 10; b++) {
      for (const val of buckets[b]) {
        arr[idx++] = val;
        setArray([...arr]);
        setSwapIndices([idx - 1]);
        addTimelineEvent(`Placing ${val} back from bucket ${b}`);
        await pausableDelay(speed);
      }
    }
  
    setActiveIndices([]);
    setSwapIndices([]);
  };
  
  const radixSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
    const arr = [...array];
  
    const maxDigits = getMaxDigits(arr);
    for (let digit = 0; digit < maxDigits; digit++) {
      addTimelineEvent(`--- Sorting by digit ${digit + 1} ---`);
      await countingSortByDigit(arr, digit);
    }
  
    setArray([...arr]);
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
  title="Radix Sort Visualizer"
  description="Visualize the Radix Sort algorithm with customizable array size and animation speed."
  concepts={
    <Accordion type="multiple" className="w-full text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">

      <AccordionItem value="what-is-radix-sort">
        <AccordionTrigger>What is Radix Sort?</AccordionTrigger>
        <AccordionContent>
          Radix Sort is a <strong>non-comparison</strong> sorting algorithm that sorts numbers digit by digit:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Starts from the least significant digit (LSD)</li>
            <li>Sorts elements by each digit using a stable sort (like counting sort)</li>
            <li>Continues until all digits are processed</li>
          </ul>
          It&apos;s especially efficient for sorting integers with fixed digit length.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pattern-category">
        <AccordionTrigger>Pattern & Category</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Pattern:</strong> Digit-by-digit processing</li>
            <li><strong>Category:</strong> Non-comparison-based, Integer Sorting Algorithm</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="complexity">
        <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Time Complexity:</strong> O(n × k) — where <code>n</code> is number of elements, <code>k</code> is number of digits</li>
            <li><strong>Space Complexity:</strong> O(n + k) — for temporary buckets and digit counting</li>
          </ul>
          Radix Sort is linear for fixed-size integers, making it faster than comparison-based sorts in specific scenarios.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-by-step">
        <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Find the maximum number to determine the number of digits</li>
            <li>Start with the least significant digit (LSD)</li>
            <li>Use a stable sort (like counting sort) based on that digit</li>
            <li>Repeat for each digit moving left (LSD → MSD)</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pseudocode">
        <AccordionTrigger>Pseudocode</AccordionTrigger>
        <AccordionContent>
          <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
{`function radixSort(arr):
  maxNum = find maximum number in arr
  digitPlace = 1

  while maxNum / digitPlace > 0:
    countingSortByDigit(arr, digitPlace)
    digitPlace *= 10

function countingSortByDigit(arr, digitPlace):
  count = array of size 10 initialized to 0
  output = array of size arr.length

  for number in arr:
    index = (number / digitPlace) % 10
    count[index] += 1

  for i = 1 to 9:
    count[i] += count[i - 1]

  for i = arr.length - 1 downto 0:
    index = (arr[i] / digitPlace) % 10
    output[count[index] - 1] = arr[i]
    count[index] -= 1

  copy output to arr`}
          </pre>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="optimizations">
        <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use Counting Sort to maintain linear time complexity</li>
            <li>Skip digit levels where all numbers have the same digit</li>
            <li>Only works on non-negative integers — extend with padding or transformation for negatives</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="example">
        <AccordionTrigger>Example Walkthrough</AccordionTrigger>
        <AccordionContent>
          <p>For array: [170, 45, 75, 90, 802, 24, 2, 66]</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Sort by unit digit → [170, 90, 802, 2, 24, 45, 75, 66]</li>
            <li>Sort by tens digit → [802, 2, 24, 45, 66, 170, 75, 90]</li>
            <li>Sort by hundreds digit → [2, 24, 45, 66, 75, 90, 170, 802]</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flowchart">
        <AccordionTrigger>Flowchart</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Radix Sort flow overview:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Start → Find max digits</li>
            <li>→ For each digit (LSD to MSD)</li>
            <li>→ Perform stable sort on that digit</li>
            <li>→ Repeat until all digits processed</li>
            <li>→ Sorted array</li>
          </ul>
          <p className="mt-2">Add an SVG or image-based visual later for better clarity.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="use-cases">
        <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Sorting large lists of integers efficiently</li>
            <li>Fixed-width numeric fields in databases</li>
            <li>Radix-based sorting in systems that avoid comparisons</li>
            <li>Data compression, digital signal processing (DSP)</li>
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
            <Button onClick={radixSort} disabled={isSorting}>
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