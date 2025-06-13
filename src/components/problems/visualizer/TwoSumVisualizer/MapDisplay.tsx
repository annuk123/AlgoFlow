import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MapDisplayProps {
  map: { [key: number]: number };
  currentSearch?: number | null;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({ map, currentSearch = null }) => {
  return (
    <div className="p-6 border rounded-2xl shadow-lg bg-white max-w-4xl mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">HashMap (num ➜ index)</h3>

      <motion.div
        className="flex flex-wrap gap-6 justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {Object.entries(map).map(([key, index]) => {
          const isBeingSearched = currentSearch !== null && Number(key) === currentSearch;

          return (
            <motion.div
              key={key}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial={{ scale: 1 }}
              animate={{
                scale: isBeingSearched ? 1.2 : 1,
                boxShadow: isBeingSearched
                  ? "0 0 20px 5px rgba(251, 191, 36, 0.7)" // Yellow glow for search
                  : "0 0 8px rgba(0,0,0,0.1)",
                backgroundColor: isBeingSearched ? "#facc15" : "#f3f4f6",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative w-28 h-20 rounded-xl flex flex-col items-center justify-center text-base font-semibold border shadow bg-gray-100",
                isBeingSearched && "text-white"
              )}
            >
              {/* Animated 'Searching' indicator */}
              {isBeingSearched && (
                <motion.div
                  className="absolute -top-4 -right-4 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Searching...
                </motion.div>
              )}

              {/* Pulsing border */}
              {isBeingSearched && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-4 border-yellow-400 pointer-events-none"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              )}

              {/* Display Key and Index */}
              <span className="text-lg">{key}</span>
              <span className="text-gray-700">Index: {index}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MapDisplay;
