"use client";

import { motion } from "framer-motion";

interface HashTableSlotProps {
  index: number;
  keys: (string | number)[];
  highlight?: boolean; 
  probing?: boolean; 
  collisionMethod: "chaining" | "linear" | "quadratic" | "doubleHashing"; 
}

export default function HashTableSlot({
  index,
  keys,
  highlight = false,
  probing = false,
  collisionMethod,
}: HashTableSlotProps) {
  return (
    <motion.div
      className={`border p-2 rounded-2xl min-h-[80px] flex flex-col items-center justify-start gap-2 transition-all duration-300
        ${highlight ? "bg-green-200 border-green-500" : probing ? "bg-yellow-200 border-yellow-500" : "bg-gray-100 dark:bg-gray-700"}`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Slot Index */}
      <span className="text-xs text-gray-500 dark:text-gray-400">Index: {index}</span>

      {/* Render Keys */}
      {keys.length === 0 ? (
        <span className="text-sm text-gray-400">Empty</span>
      ) : collisionMethod === "chaining" ? (
        // Chaining: Show keys in a vertical stack
        <div className="flex flex-col gap-1">
          {keys.map((key, idx) => (
            <motion.div
              key={idx}
              className="px-2 py-1 bg-indigo-500 text-white text-xs rounded shadow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {key}
            </motion.div>
          ))}
        </div>
      ) : (
        // Probing: Show one key per slot
        <div className="flex flex-wrap gap-1">
          {keys.map((key, idx) => (
            <motion.div
              key={idx}
              className="px-2 py-1 bg-purple-500 text-white text-xs rounded shadow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {key}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
