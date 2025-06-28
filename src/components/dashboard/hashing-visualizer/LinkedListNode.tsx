"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LinkedListNodeProps {
  value: number | string;
  isHead?: boolean;
  isTail?: boolean;
  isCurrent?: boolean;
  horizontal?: boolean;
}

export default function LinkedListNode({
  value,
  isHead = false,
  isTail = false,
  isCurrent = false,
  horizontal = true,
}: LinkedListNodeProps) {
  return (
    <div className={`flex ${horizontal ? "flex-row items-center" : "flex-col items-center"} gap-3`}>
      {/* Node */}
      <motion.div
        className={`p-4 rounded-xl border-2 relative transition-all duration-300
          ${isCurrent ? "border-yellow-400 bg-yellow-100" : "border-indigo-500 bg-indigo-100 dark:bg-indigo-700"}
        `}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="min-w-[50px] min-h-[50px] flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border border-gray-400 text-base sm:text-lg font-semibold">
          {value}
        </div>

        {/* Tooltip Labels */}
        <TooltipProvider>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            {isHead && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-green-600 dark:text-green-400 font-semibold">H</span>
                </TooltipTrigger>
                <TooltipContent>Head</TooltipContent>
              </Tooltip>
            )}
            {isTail && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">T</span>
                </TooltipTrigger>
                <TooltipContent>Tail</TooltipContent>
              </Tooltip>
            )}
            {isCurrent && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">C</span>
                </TooltipTrigger>
                <TooltipContent>Current</TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      </motion.div>

      {/* Animated Arrow */}
      <motion.div
        initial={{ opacity: 0, x: horizontal ? -10 : 0, y: horizontal ? 0 : -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-300" />
      </motion.div>
    </div>
  );
}
