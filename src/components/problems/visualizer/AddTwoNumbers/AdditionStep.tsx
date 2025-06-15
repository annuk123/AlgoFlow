import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface AdditionStepProps {
  l1Val: number | null;
  l2Val: number | null;
  carry: number;
}

const AdditionStep: React.FC<AdditionStepProps> = ({ l1Val, l2Val, carry }) => {
  // Calculate sum for display
  const sum = (l1Val ?? 0) + (l2Val ?? 0) + carry;

  return (
    <div className=" flex flex-col items-center">
      <span className="text-gray-500 text-lg mb-2">Current Addition</span>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${l1Val}-${l2Val}-${carry}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-blue-600"
        >
          {`${l1Val ?? 0} + ${l2Val ?? 0} + ${carry} = ${sum}`}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdditionStep;
