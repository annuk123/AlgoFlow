"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function QueueDisplay({ queue }: { queue: number[] }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center gap-4 overflow-x-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-[100px] w-full justify-center">
        <AnimatePresence initial={false}>
          {queue.map((item, index) => (
            <motion.div
              key={item}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-indigo-500 text-white px-5 py-3 rounded-xl shadow-lg text-center min-w-[60px] flex items-center justify-center"
            >
              {item}
              {/* Front Label */}
              {index === 0 && (
                <span className="absolute -top-6 text-xs text-green-600 font-bold">Front</span>
              )}
              {/* Rear Label */}
              {index === queue.length - 1 && (
                <span className="absolute -bottom-6 text-xs text-purple-600 font-bold">Rear</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty Queue State */}
      {queue.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">
          The queue is currently empty.
        </p>
      )}
    </div>
  );
}
