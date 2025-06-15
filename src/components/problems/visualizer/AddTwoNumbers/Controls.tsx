import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, RotateCw } from "lucide-react";

interface ControlsProps {
  isPlaying: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (newSpeed: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onNext,
  onPrevious,
  onPlayPause,
  onReset,
  speed,
  onSpeedChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Control Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        <Button variant="outline" onClick={onPrevious}>
          <SkipBack className="w-5 h-5 mr-2" />
          Previous
        </Button>

        <Button variant="default" onClick={onPlayPause}>
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Play
            </>
          )}
        </Button>

        <Button variant="outline" onClick={onNext}>
          <SkipForward className="w-5 h-5 mr-2" />
          Next
        </Button>

        <Button variant="destructive" onClick={onReset}>
          <RotateCw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>

      {/* Speed Control */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-gray-700 dark:text-gray-300 font-medium">
          Speed: {speed} ms
        </label>
        <input
          type="range"
          min={200}
          max={2000}
          step={100}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-64 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Controls;
