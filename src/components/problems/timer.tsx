"use client";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

export function TimerDialog() {
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSeconds = minutes * 60 + seconds;

  // Countdown logic
useEffect(() => {
  if (active && !isPaused) {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSec) => {
        if (prevSec === 0) {
          if (minutes === 0) {
            clearInterval(intervalRef.current!);
            setActive(false);
            setTimeUp(true);
            return 0;
          } else {
            setMinutes((m) => m - 1);
            return 59;
          }
        } else {
          return prevSec - 1;
        }
      });
    }, 1000);
  }

  return () => clearInterval(intervalRef.current!);
}, [active, isPaused, minutes]);

  // Reset timer
  const handleReset = () => {
    setActive(false);
    setIsPaused(false);
    clearInterval(intervalRef.current!);
    setMinutes(0);
    setSeconds(0);
    setTimeUp(false);
  };

  // Start timer
  const handleStart = () => {
    if (totalSeconds > 0) {
      setActive(true);
      setIsPaused(false);
      setTimeUp(false);
      setOpen(false); // auto-close dialog
    }
  };

  // Pause or Resume
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
    <div className="flex items-center gap-6 justify-center mt-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1 ml-20">
            <Timer size={16} />
            Set Timer
          </Button>
          
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                ⏱ Set Timer
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              Enter the time and start the countdown.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium mb-1">Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => {
                  const val = Math.min(59, parseInt(e.target.value) || 0);
                  setSeconds(val);
                }}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={59}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button onClick={handleStart} disabled={totalSeconds === 0}>
              Start Timer
            </Button>
            <Button
              variant="secondary"
              onClick={handlePauseResume}
              disabled={!active}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Timer display outside Dialog */}
    <div className="text-2xl font-mono">
    {timeUp ? (
      <p className="text-red-600 font-bold animate-pulse">⏰ Time&apos;s Up!</p>
    ) : (
      <p>
        ⏳ {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
    )}
  </div>
  </div>
    </>
  );
}
