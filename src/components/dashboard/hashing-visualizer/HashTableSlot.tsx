"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HashTableSlotProps {
  index: number;
  keys: (string | number)[];
  highlight?: boolean;
  probing?: boolean;
  collisionMethod: "chaining" | "linear" | "quadratic" | "doubleHashing";
  onKeyClick?: (key: string | number, index: number) => void;
}

export default function HashTableSlot({
  index,
  keys,
  highlight = false,
  probing = false,
  collisionMethod,
  onKeyClick,
}: HashTableSlotProps) {
  return (
    <motion.div
      className={`border sm:p-3 md:p-4 rounded-2xl min-h-[80px] flex flex-col items-center justify-start gap-2 text-center 
        transition-all duration-300
        ${
          highlight
            ? "bg-green-200 border-green-500"
            : probing
            ? "bg-yellow-200 border-yellow-500"
            : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        }`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Slot Index */}
      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
        Index: {index}
      </span>

      {/* Render Keys */}
      {keys.length === 0 ? (
        <span className="text-xs sm:text-sm text-gray-400 italic border border-dashed rounded px-2 py-1">
          Empty
        </span>
      ) : (
        <div
          role="list"
          className={`flex ${
            collisionMethod === "chaining" ? "flex-col" : "flex-wrap justify-center"
          } gap-1 w-full items-center`}
        >
          {keys.map((key, idx) => (
            <TooltipProvider key={idx}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    role="listitem"
                    onClick={() => onKeyClick?.(key, index)}
                    className={`cursor-pointer px-2 py-1 text-white text-[10px] sm:text-xs rounded shadow w-fit max-w-full break-words hover:opacity-90 transition
                      ${collisionMethod === "chaining" ? "bg-indigo-500" : "bg-purple-500"}`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {key}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="text-xs">Click to delete &quot;{key}&quot;</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </motion.div>
  );
}
