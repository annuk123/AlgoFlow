"use client";

import { VisualizerLayout } from "@/components/VisualizerLayout/page";
import { useEffect, useState, useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/nav/nav";
import Image from "next/image";


export default function InsertionSortPage() {
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [swapIndices, setSwapIndices] = useState<number[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  // const [customInput, setCustomInput] = useState<string>("");
  const [customInput, setCustomInput] = useState("");
  const [error, setError] = useState(""); // error message
  





  // Generate random array
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


  useEffect(() => {
    generateArray();
  }, []);

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

  const insertionSort = async () => {
    setIsSorting(true);
    setStartTime(Date.now());
    setTimeline([]);
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      await waitWhilePaused();
      addTimelineEvent(`Picking element ${key} at index ${i}`);
      setActiveIndices([i]);
      await waitWhilePaused();

      while (j >= 0 && arr[j] > key) {
        addTimelineEvent(`Comparing ${arr[j]} and ${key} — shifting ${arr[j]} to right`);
        setActiveIndices([j, j + 1]);
        setSwapIndices([j, j + 1]);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await pausableDelay(speed);
        j--;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setSwapIndices([j + 1]);
      addTimelineEvent(`Placed ${key} at index ${j + 1}`);
      await pausableDelay(speed);
    }

    setActiveIndices([]);
    setSwapIndices([]);
    setEndTime(Date.now());
    setIsSorting(false);
    addTimelineEvent("Sorting Complete!");
  };

  return (
    <section className="min-h-screen flex flex-col p-8  py-25 bg-background">
      <Navbar />
    <VisualizerLayout
      title="Insertion Sort"
      description="Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time."
      concepts={
        <Accordion type="multiple" className="w-full text-muted-foreground space-y-4 text-sm sm:text-base">
          {/* What is Insertion Sort */}
          <AccordionItem value="what-is">
            <AccordionTrigger>What is Insertion Sort?</AccordionTrigger>
            <AccordionContent>
              Insertion Sort is a simple and intuitive sorting algorithm that builds the final sorted array one item at a time. It’s similar to sorting playing cards in your hand, you pick one card and insert it at the correct position among the already-sorted cards.
            </AccordionContent>
          </AccordionItem>
      
          {/* Pattern & Category */}
          <AccordionItem value="pattern-category">
            <AccordionTrigger>Pattern & Category</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Algorithmic Pattern:</strong> Incremental Build / In-Place Sorting</li>
                <li><strong>Category:</strong> Comparison-based Sorting Algorithm</li>
                <li><strong>Stability:</strong> Stable</li>
                <li><strong>In-Place:</strong> Yes (no extra space needed)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
          {/* Time & Space Complexity */}
          <AccordionItem value="complexity">
            <AccordionTrigger>Time & Space Complexity</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Best Case:</strong> O(n) – when the array is already sorted</li>
                <li><strong>Average Case:</strong> O(n²)</li>
                <li><strong>Worst Case:</strong> O(n²) – when array is sorted in reverse</li>
                <li><strong>Space Complexity:</strong> O(1) – in-place</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
          {/* Step-by-Step Process */}
          <AccordionItem value="steps">
            <AccordionTrigger>Step-by-Step Process</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Start from the second element (index 1).</li>
                <li>Compare it with the element(s) before it.</li>
                <li>Shift elements one position to the right to make space for the key.</li>
                <li>Insert the key at the correct position.</li>
                <li>Repeat for all elements.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
      
          {/* Pseudocode */}
          <AccordionItem value="pseudocode">
            <AccordionTrigger>Pseudocode</AccordionTrigger>
            <AccordionContent>
              <pre className="bg-background rounded-md p-4 text-xs sm:text-sm overflow-auto">
      {`for i from 1 to length(array) - 1
        key = array[i]
        j = i - 1
        while j >= 0 and array[j] > key
          array[j + 1] = array[j]
          j = j - 1
        array[j + 1] = key`}
              </pre>
            </AccordionContent>
          </AccordionItem>
      
          {/* Tricks & Optimizations */}
          <AccordionItem value="optimizations">
            <AccordionTrigger>Tricks & Optimizations</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc ml-6 space-y-1">
                <li>Best suited for small datasets or partially sorted arrays.</li>
                <li>Use Binary Insertion Sort (via Binary Search) to reduce comparisons.</li>
                <li>Efficient for real-time insertion like in online scenarios.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      
          {/* Example Walkthrough */}
          <AccordionItem value="walkthrough">
            <AccordionTrigger>Example Walkthrough</AccordionTrigger>
            <AccordionContent>
            <pre className="bg-background p-3 rounded-md text-sm overflow-x-auto">
              {`Given: [5, 3, 4, 1]

                1. Compare 3 with 5 → Shift 5 → Insert 3 → [3, 5, 4, 1]
                2. Compare 4 with 5 → Shift 5 → Compare 4 with 3 → Insert 4 → [3, 4, 5, 1]
                3. Compare 1 with 5 → Shift → with 4 → Shift → with 3 → Shift → Insert 1 → [1, 3, 4, 5] 
              
              `}
              </pre>
            </AccordionContent>
          </AccordionItem>
      
          {/* Flowchart */}
          <AccordionItem value="flowchart">
            <AccordionTrigger>Flowchart</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Here’s a visual representation:</p>
              <Image src="/images/insertion-sort-flowchart.png" alt="Insertion Sort Flowchart" className="rounded-md border shadow-md" />
              <p className="text-xs text-center mt-1">*Flowchart illustrating the loop and insertion process*</p>
            </AccordionContent>
          </AccordionItem>
      
          {/* Use Cases */}
          <AccordionItem value="use-cases">
            <AccordionTrigger>Real-World Use Cases</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc ml-6 space-y-1">
                <li>Small datasets or almost sorted data</li>
                <li>Online algorithms that require real-time data insertion</li>
                <li>Embedded systems with limited memory (due to O(1) space)</li>
                <li>Teaching basic sorting principles due to simplicity</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
      
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center mt-6 px-4">
        <div className="w-full flex items-center justify-center mb-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={generateArray} disabled={isSorting}>
              Generate New Array
            </Button>
            <Button onClick={insertionSort} disabled={isSorting}>
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
        <div className="flex items-end justify-center w-[100%] max-w-6xl gap-[2px] sm:gap-1 md:gap-1.5 bg-muted rounded-lg px-6 py-4 h-[40vh] sm:h-[50vh] md:h-[60vh]">
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
        style={{ height: `clamp(10px, ${value * 2.5}px, 80vh)` }}
        layout
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  ))}
</div>


        <div className="flex flex-col items-center w-full mt-7">
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

        {/* Timeline Output */}
        <div className="w-full mt-6 bg-background p-4 rounded-lg max-h-[200px] overflow-y-auto border">
          <h2 className="text-lg font-semibold mb-2">Timeline</h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            {timeline.map((event, index) => (
              <li key={index} className="p-1 rounded bg-muted/70">
                {event}
              </li>
            ))}
          </ul>
        </div>

        {/* Sorting Time */}
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
    </VisualizerLayout>
    </section>
  );
}
