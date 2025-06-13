import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArrayDisplayProps {
  array: number[];
  currentIndex: number;
  complementIndex?: number | null;
}

export const ArrayDisplay: React.FC<ArrayDisplayProps> = ({
  array,
  currentIndex,
  complementIndex = null,
}) => {
  return (
    <div className="flex flex-col items-center p-4">
      <motion.div
        className="flex flex-wrap justify-center items-center gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {array.map((num, index) => {
          const isCurrent = index === currentIndex;
          const isComplement = index === complementIndex && complementIndex !== null;

          return (
            <motion.div
              key={index}
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              initial={{ scale: 1 }}
              animate={{
                scale: isCurrent ? 1.2 : 1,
                boxShadow: isComplement
                  ? "0 0 15px 5px rgba(16, 185, 129, 0.7)" // Emerald glow for complement
                  : isCurrent
                  ? "0 0 15px 5px rgba(59, 130, 246, 0.7)" // Sky glow for current
                  : "none",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold shadow-lg border relative transition-colors",
                // Backgrounds with gradients for light and dark modes
                isCurrent
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                  : isComplement
                  ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              )}
            >
              {num}

              {/* Index label */}
              <span className="absolute -bottom-6 text-sm text-gray-600 dark:text-gray-400">{index}</span>

              {/* Pulsing border for current index */}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-4 border-blue-400 pointer-events-none"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ArrayDisplay;
