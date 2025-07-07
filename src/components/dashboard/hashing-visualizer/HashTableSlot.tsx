"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HashTableSlotProps {
  // value: string | number | symbol | null;
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
  const isActive = highlight || probing;
  const isFilled = keys.length > 0;

  const slotClasses = `
    border-2 rounded-xl px-4 py-3 min-h-[90px] flex flex-col items-center justify-start gap-2 text-center
    bg-gradient-to-b from-[#111827] to-[#1f2937] text-white
    transition-all duration-300 ease-in-out transform
    ${
      isActive
        ? "border-yellow-400 shadow-[0_0_12px_3px_rgba(250,204,21,0.4)] scale-[1.02]"
        : isFilled
        ? "border-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.4)]"
        : "border-gray-600 hover:shadow-[0_0_8px_1px_rgba(100,116,139,0.4)]"
    }
  `;

  return (
    <motion.div
      className={slotClasses}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Index Label */}
      <span className="text-[11px] text-blue-400 font-semibold tracking-wide">
        Index {index}
      </span>

      {/* Keys Display */}
      {keys.length === 0 ? (
        <span className="text-xs text-gray-400 italic border border-dashed px-3 py-1 rounded">
          Empty
        </span>
      ) : (
        <div
          className={`flex ${
            collisionMethod === "chaining"
              ? "flex-col items-center"
              : "flex-wrap justify-center"
          } gap-2 w-full`}
        >
          {keys.map((key, idx) => (
            <TooltipProvider key={idx}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    role="button"
                    onClick={() => onKeyClick?.(key, index)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className={`bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-sm px-4 py-2 rounded-lg font-semibold tracking-wide
                      shadow-md hover:brightness-110 hover:shadow-lg transition-all duration-200 cursor-pointer`}
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
