import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type ControlPanelProps = {
  onStart: () => void;
  onReset: () => void;
  speed: number;
  setSpeed: (speed: number) => void;
  isPlaying: boolean;
  setOperation: (operation: string) => void;
};

export default function ControlPanel({
  onStart,
  onReset,
  speed,
  setSpeed,
  isPlaying,
  setOperation,
}: ControlPanelProps) {
  const [selectedOperation, setSelectedOperation] = useState<string>("traverse");

  const handleOperationChange = (operation: string) => {
    setSelectedOperation(operation);
    setOperation(operation);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button onClick={onStart} disabled={isPlaying}>
          {isPlaying ? "Running..." : "Start"}
        </Button>
        <Button onClick={onReset} variant="outline">
          Reset
        </Button>
      </div>

      {/* Speed Control */}
      <div className="w-full">
        <span className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Animation Speed: {speed}ms</span>
        <Slider
          min={100}
          max={1000}
          step={100}
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
        />
      </div>

      {/* Operation Selection */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => handleOperationChange("traverse")}
          variant={selectedOperation === "traverse" ? "default" : "outline"}
        >
          Traverse
        </Button>
        <Button
          onClick={() => handleOperationChange("reverse")}
          variant={selectedOperation === "reverse" ? "default" : "outline"}
        >
          Reverse
        </Button>
      </div>
    </div>
  );
}
