"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // For arrow icons, you can use any icon library

interface LinkedListNodeProps {
  value: number | string;
  isHead?: boolean;
  isTail?: boolean;
  isCurrent?: boolean; // Optional: Highlight during traversal
}

export default function LinkedListNode({
  value,
  isHead = false,
  isTail = false,
  isCurrent = false,
}: LinkedListNodeProps) {
  return (
    <motion.div
      className={`flex items-center space-x-4 p-4 rounded-lg border-2 
        ${isCurrent ? "border-yellow-400 bg-yellow-100" : "border-indigo-500 bg-indigo-100 dark:bg-indigo-700"} 
        transition-all duration-300`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Node Box */}
      <div className="min-w-[50px] min-h-[50px] flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border border-gray-400 text-lg font-semibold">
        {value}
      </div>

      {/* Node Labels */}
      <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
        {isHead && <span className="font-semibold text-green-600 dark:text-green-400">Head</span>}
        {isTail && <span className="font-semibold text-blue-600 dark:text-blue-400">Tail</span>}
        {isCurrent && <span className="font-semibold text-yellow-600 dark:text-yellow-400">Current</span>}
      </div>

      {/* Arrow */}
      <ArrowRight className="text-gray-500 dark:text-gray-300" />
    </motion.div>
  );
}
