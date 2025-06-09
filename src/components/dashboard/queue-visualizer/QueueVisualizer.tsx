"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QueueControls from "./QueueControls";
import QueueSidebar from "./QueueSidebar";

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([]);

  const enqueue = (value: number) => setQueue([...queue, value]);
  const dequeue = () => setQueue(queue.slice(1));
  const clearQueue = () => setQueue([]);

  return (
    <div className="flex gap-6">
      <QueueSidebar />
      <div className="flex-1 space-y-6">
        <QueueControls enqueue={enqueue} dequeue={dequeue} clearQueue={clearQueue} />
        <div className="flex items-center gap-4 overflow-x-auto p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <AnimatePresence>
            {queue.map((item) => (
              <motion.div
                key={item}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-indigo-500 text-white p-4 rounded shadow min-w-[60px] text-center"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
