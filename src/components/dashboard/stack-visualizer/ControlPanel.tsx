"use client";

import { Button } from "@/components/ui/button";

type ControlPanelProps = {
  mode: "stack" | "queue";
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onPushOrEnqueue: (value: string) => void;
  onPopOrDequeue: () => void;
  onReset: () => void;
  isDisabledPop: boolean;
  speed: number;
  setSpeed: (speed: number) => void;
  isAnimating: boolean;
};

export default function ControlPanel({
  mode,
  inputValue,
  setInputValue,
  onPushOrEnqueue,
  onPopOrDequeue,
  onReset,
  isDisabledPop,
  speed,
  setSpeed,
  isAnimating,
}: ControlPanelProps) {
  const pushLabel = mode === "stack" ? "Push" : "Enqueue";
  const popLabel = mode === "stack" ? "Pop" : "Dequeue";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
      {/* Input + Push/Enqueue */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded w-32"
          disabled={isAnimating}
        />
        <Button
          onClick={() => {
            if (inputValue.trim()) {
              onPushOrEnqueue(inputValue.trim());
              setInputValue("");
            }
          }}
          disabled={isAnimating || inputValue.trim() === ""}
        >
          {pushLabel}
        </Button>
      </div>

      {/* Pop/Dequeue and Reset */}
      <div className="flex items-center gap-4">
        <Button onClick={onPopOrDequeue} disabled={isAnimating || isDisabledPop}>
          {popLabel}
        </Button>
        <Button onClick={onReset} variant="outline" disabled={isAnimating}>
          Reset
        </Button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Speed:</span>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isAnimating}
        />
        <span className="text-sm">{speed}ms</span>
      </div>
    </div>
  );
}
