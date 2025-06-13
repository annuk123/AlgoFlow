import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, RotateCw } from "lucide-react";

interface StepControllerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onRestart: () => void;
}

export const StepController: React.FC<StepControllerProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onRestart,
}) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      {/* Restart Button */}
      <Button variant="outline" onClick={onRestart}>
        <RotateCw className="w-4 h-4 mr-2" />
        Restart
      </Button>

      {/* Previous Step Button */}
      <Button variant="outline" onClick={onPrevious}>
        <SkipBack className="w-4 h-4 mr-2" />
        Previous
      </Button>

      {/* Play / Pause Toggle */}
      <Button onClick={onPlayPause}>
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Play
          </>
        )}
      </Button>

      {/* Next Step Button */}
      <Button variant="outline" onClick={onNext}>
        <SkipForward className="w-4 h-4 mr-2" />
        Next
      </Button>
    </div>
  );
};

export default StepController;
