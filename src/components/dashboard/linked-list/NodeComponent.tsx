"use client";

import { motion } from "framer-motion";

interface NodeComponentProps {
  value: string;
  isActive: boolean;
  type?: "singly" | "doubly" | "circular";
}

export default function NodeComponent({
  value,
  isActive,
  type = "singly",
}: NodeComponentProps) {
  // Optional label based on type
const typeLabel = {
  singly: "S",
  doubly: "D",
  circular: "C",
}[type.toLowerCase() as "singly" | "doubly" | "circular"];


  return (
    <motion.div
      className={`relative w-20 h-20 flex flex-col items-center justify-center rounded-full border-4 text-lg font-bold select-none
        ${isActive ? "border-purple-600 bg-purple-100" : "border-gray-400 bg-white dark:bg-gray-900"}
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={`${type} linked list node with value ${value}`}
    >
      <span>{value}</span>
      <span
        className={`absolute top-1 right-1 text-xs font-semibold px-1 rounded bg-purple-600 text-white select-none`}
        title={`${type.charAt(0).toUpperCase() + type.slice(1)} Linked List Node`}
      >
        {typeLabel}
      </span>
    </motion.div>
  );
}
