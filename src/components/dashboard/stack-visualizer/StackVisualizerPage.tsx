"use client";

import { useState } from "react";
import ControlPanel from "./ControlPanel";
import StackDisplay from "./StackDisplay";
import OperationLog from "./OperationLog";

export default function StackVisualizerPage() {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [log, setLog] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(500);

  const addLog = (message: string) => {
    setLog(prev => [message, ...prev]);
  };

  const handlePush = (value: string) => {
    const newStack = [...stack, value];
    setStack(newStack);
    addLog(`Pushed ${value}`);
    setActiveIndex(newStack.length - 1);
  };

  const handlePop = () => {
    if (stack.length === 0) return;

    const poppedValue = stack[stack.length - 1];
    const newStack = stack.slice(0, -1);
    setStack(newStack);
    addLog(`Popped ${poppedValue}`);
    setActiveIndex(newStack.length > 0 ? newStack.length - 1 : null);
  };

  const handleReset = () => {
    setStack([]);
    setLog([]);
    setInputValue("");
    setActiveIndex(null);
  };

  return (
    <main className="flex flex-col md:flex-row p-6 max-w-7xl mx-auto space-y-8 md:space-y-0 md:space-x-8">

      {/* Stack Visualizer */}
      <section className="flex-1 space-y-6">
        <ControlPanel
          mode="stack"
          onPushOrEnqueue={handlePush}
          onPopOrDequeue={handlePop}
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
