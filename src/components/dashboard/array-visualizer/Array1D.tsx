"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Play } from "lucide-react";
import type { ArrayElement } from "./types";


// export type ArrayElement = {
//   value: number;
//   id: string;
//   active?: boolean;
// };
interface Props {
  array: ArrayElement[];
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>;
}
export default function Array1D({ array, setArray }: Props) {
//   const [array, setArray] = useState<ArrayElement[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const addElement = () => {
    if (!inputValue) return;
    const newElement: ArrayElement = {
      value: parseInt(inputValue),
      id: crypto.randomUUID(),
    };
    setArray((prev) => [...prev, newElement]);
    setInputValue("");
  };

  const deleteLast = () => {
    setArray((prev) => prev.slice(0, -1));
  };

  const traverseArray = async () => {
    setIsAnimating(true);
    for (let i = 0; i < array.length; i++) {
      setArray((prev) =>
        prev.map((el, idx) => ({
          ...el,
          active: idx === i,
        }))
      );
      await new Promise((res) => setTimeout(res, 500));
    }
    setArray((prev) => prev.map((el) => ({ ...el, active: false })));
    setIsAnimating(false);
  };

  return (
    <section className="p-4 space-y-6">
      {/* Control Panel */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isAnimating}
          className="w-36"
        />
        <Button onClick={addElement} disabled={isAnimating}>
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
        <Button
          onClick={deleteLast}
          variant="destructive"
          disabled={isAnimating || array.length === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete Last
        </Button>
        <Button
          onClick={traverseArray}
          disabled={isAnimating || array.length === 0}
        >
          <Play className="w-4 h-4 mr-2" /> Traverse
        </Button>
      </div>

      {/* Array Blocks */}
      <div className="flex flex-wrap gap-4 mt-4">
        {array.map((el) => (
          <motion.div
            key={el.id}
            className={`w-14 h-14 rounded-md shadow-md flex items-center justify-center font-semibold text-lg transition-colors
              ${
                el.active
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
              }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {el.value}
          </motion.div>
        ))}
      </div>

      {/* Index Line */}
      <div className="flex gap-4 text-sm text-gray-500 mt-2 pl-[0.5rem]">
        {array.map((_, i) => (
          <div key={i} className="w-14 text-center">
            {i}
          </div>
        ))}
      </div>

      {/* Memory Visualization Block */}
      <section className="mt-10 p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow-inner max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          How 1D Arrays are Stored in Memory
        </h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A 1D array is stored as a <b>contiguous block of memory</b>. Each
          element occupies an index and is placed one after another in
          memory addresses. The address of each element can be calculated by
          adding the element&apos;s index multiplied by the size of each element.
        </p>

        {/* Memory Blocks */}
        <div className="flex gap-2 overflow-x-auto">
          {array.length === 0 && (
            <p className="text-gray-500 italic">
              Add elements to see memory blocks here.
            </p>
          )}
          {array.map((el, i) => (
            <div
              key={el.id}
              className="w-16 flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-purple-300 dark:bg-purple-700 rounded-md flex items-center justify-center text-lg font-mono font-bold text-white shadow-md">
                {el.value}
              </div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 font-mono">
                {/* Simulate a fake memory address */}
                {`0x${(1000 + i * 4).toString(16).toUpperCase()}`}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
