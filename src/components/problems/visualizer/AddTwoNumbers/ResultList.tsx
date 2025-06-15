import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ResultListProps {
  result: number[];
  currentIndex: number;
}

const ResultList: React.FC<ResultListProps> = ({ result, currentIndex }) => {
  return (
    <div className=" flex flex-col items-center">
      <span className="text-gray-500 text-lg mb-2">Result Linked List</span>

      <div className="flex items-center gap-4">
        {result.map((val, index) => (
          <AnimatePresence key={index}>
            <motion.div
              key={val + '-' + index}
              initial={{ scale: 0.5, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                index === currentIndex ? "bg-green-500" : "bg-indigo-500"
              }`}
            >
              {val}
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default ResultList;
