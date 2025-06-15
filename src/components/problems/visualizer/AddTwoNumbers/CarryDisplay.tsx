import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface CarryDisplayProps {
  carry: number;
}

const CarryDisplay: React.FC<CarryDisplayProps> = ({ carry }) => {
  return (
    <div className="flex flex-col items-center ">
      <span className="text-gray-500 text-lg">Carry</span>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={carry} // Important for animation to trigger on change
          initial={{ scale: 0.5, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-white shadow-lg"
        >
          {carry}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CarryDisplay;
