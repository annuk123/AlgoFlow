"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CornerUpRight } from "lucide-react";

interface ArrowComponentProps {
  type: "next" | "prev" | "loop";
  isActive?: boolean;
  size?: number;
  className?: string;
}

export default function ArrowComponent({
  type,
  isActive = false,
  size = 32,
  className = "",
}: ArrowComponentProps) {
  let Icon;

  switch (type) {
    case "next":
      Icon = ArrowRight;
      break;
    case "prev":
      Icon = ArrowLeft;
      break;
    case "loop":
      Icon = CornerUpRight;
      break;
    default:
      Icon = ArrowRight;
  }

  return (
    <motion.div
      className={`flex items-center justify-center ${
        isActive ? "text-purple-600" : "text-gray-400"
      } ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}
      aria-label={`${type} pointer arrow`}
    >
      <Icon size={size} />
    </motion.div>
  );
}
