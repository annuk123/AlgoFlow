"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface QueueControlsProps {
  enqueue: (value: number) => void;
  dequeue: () => void;
  clearQueue: () => void;
}

export default function QueueControls({ enqueue, dequeue, clearQueue }: QueueControlsProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter element"
        className="border px-3 py-2 rounded"
      />
      <Button onClick={() => { enqueue(Number(inputValue)); setInputValue(""); }}>Enqueue</Button>
      <Button onClick={dequeue} variant="outline">Dequeue</Button>
      <Button onClick={clearQueue} variant="destructive">Clear</Button>
    </div>
  );
}
