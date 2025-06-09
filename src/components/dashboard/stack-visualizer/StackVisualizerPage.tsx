"use client";

import { useState } from "react";
import ControlPanel from "./ControlPanel";
import StackDisplay from "./StackDisplay";
import OperationLog from "./OperationLog";
import StackSidebar from "./StackSidebar"; // Sidebar Component

type StackType = "LIFO" | "FIFO";

export default function StackVisualizerPage() {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [log, setLog] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(500);
  const [stackType, setStackType] = useState<StackType>("LIFO");

  const addLog = (message: string) => {
    setLog(prev => [message, ...prev]);
  };

  const handlePushOrEnqueue = (value: string) => {
    if (stackType === "LIFO") {
      // stack push
      const newStack = [...stack, value];
      setStack(newStack);
      addLog(`Pushed ${value}`);
      setActiveIndex(newStack.length - 1);
    } else {
      // queue enqueue
      const newStack = [...stack, value];
      setStack(newStack);
      addLog(`Enqueued ${value}`);
      setActiveIndex(newStack.length - 1);
    }
  };

  const handlePopOrDequeue = () => {
    if (stack.length === 0) return;

    if (stackType === "LIFO") {
      const poppedValue = stack[stack.length - 1];
      const newStack = stack.slice(0, -1);
      setStack(newStack);
      addLog(`Popped ${poppedValue}`);
      setActiveIndex(newStack.length - 1 >= 0 ? newStack.length - 1 : null);
    } else {
      const dequeuedValue = stack[0];
      const newStack = stack.slice(1);
      setStack(newStack);
      addLog(`Dequeued ${dequeuedValue}`);
      setActiveIndex(newStack.length > 0 ? 0 : null);
    }
  };

  const handleReset = () => {
    setStack([]);
    setLog([]);
    setInputValue("");
    setActiveIndex(null);
  };

  return (
    <main className="flex flex-col md:flex-row p-6 max-w-7xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
        {/* Sidebar: Stack Type Selection */}
              <div className="w-full md:w-80 ml-7">
                <StackSidebar />
              </div>
      {/* Stack Visualizer */}
      <section className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold text-center">Stack Visualizer</h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Visualize stack operations ({stackType}) in real-time.
        </p>

        {/* Select Stack Type */}
        <div className="flex justify-center space-x-4 mb-4">
          <label className="font-semibold">Select Stack Type:</label>
          <select
            value={stackType}
            onChange={(e) => {
              setStackType(e.target.value as StackType);
              handleReset();
            }}
            className="border rounded px-2 py-1"
          >
            <option value="LIFO">LIFO (Stack)</option>
            <option value="FIFO">FIFO (Queue)</option>
          </select>
        </div>

        <ControlPanel
          mode={stackType === "LIFO" ? "stack" : "queue"}
          onPushOrEnqueue={handlePushOrEnqueue}
          onPopOrDequeue={handlePopOrDequeue}
          onReset={handleReset}
          speed={speed}
          setSpeed={setSpeed}
          isAnimating={false}
          isDisabledPop={stack.length === 0}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <StackDisplay stack={stack} activeIndex={activeIndex} />
      </section>

      {/* Sidebar: Operation Log */}
      <aside className="md:w-1/3">
        <OperationLog log={log} />
      </aside>
    </main>
  );
}
