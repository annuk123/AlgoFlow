import { motion } from "framer-motion";

interface StringDisplayProps {
  input: string;
  currentIndex: number;
}

export default function StringDisplay({ input, currentIndex }: StringDisplayProps) {
  return (
    <div className="flex justify-center space-x-4">
      {input.split("").map((char, index) => (
        <motion.div
          key={index}
          className={`w-12 h-12 flex items-center justify-center border rounded text-xl font-bold ${
            index === currentIndex ? "bg-purple-500 text-white scale-110" : "bg-gray-600"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.2 }}
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
}
