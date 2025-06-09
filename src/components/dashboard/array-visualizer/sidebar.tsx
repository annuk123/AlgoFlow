"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sidebarItems = [
  {
    title: "What is an Array?",
    content:
      "An Array is a linear data structure where elements are stored in contiguous memory locations. Each element can be accessed directly using its index.",
  },
  {
    title: "Types of Arrays",
    content:
      "🔹 1D Array: A simple list of elements.\n🔹 2D Array: A matrix or grid of rows and columns.\n🔹 3D Array: A cube-like structure, useful in simulations and games.",
  },
  {
    title: "Basic Operations",
    content:
      "🔹 Access: O(1) - Direct access by index.\n🔹 Insertion:\n- At end: O(1)\n- At beginning/middle: O(n)\n\n🔹 Deletion:\n- From end: O(1)\n- From beginning/middle: O(n)\n\n🔹 Traversal: O(n)\n🔹 Search: O(n) or O(log n) if sorted.",
  },
  {
    title: "Time Complexity",
    content: `🔹 Access: O(1)\n🔹 Search: O(n) (unsorted), O(log n) (sorted)\n🔹 Insertion: O(1) at end, O(n) at beginning/middle\n🔹 Deletion: O(1) from end, O(n) from beginning/middle\n🔹 Traversal: O(n)`,
  },
  {
    title: "When to Use Arrays",
    content:
      "✅ When you need fast random access to elements.\n✅ When the size of data is known and relatively fixed.\n✅ When memory efficiency is important (contiguous storage).",
  },
  {
    title: "Real-World Examples",
    content: `🔹 Storing leaderboard scores\n🔹 Image pixel grids (2D Arrays)\n🔹 Time series data (1D Array)\n🔹 Multidimensional simulations (3D Arrays)\n🔹 Matrices in mathematical computations`,
  },
  {
    title: "Advantages & Disadvantages",
    content: `Advantages:\n✔️ Fast access (O(1))\n✔️ Simple structure\n✔️ Easy to traverse\n\nDisadvantages:\n❌ Fixed size (in static arrays)\n❌ Expensive insertions/deletions at arbitrary positions\n❌ Memory can be wasted if array is oversized`,
  },
  {
    title: "Additional Notes",
    content:
      "🔹 Dynamic Arrays (like JavaScript Arrays or Python Lists) automatically resize.\n🔹 Arrays are the foundation of other data structures like matrices, heaps, and hash tables.",
  },
];

export default function ArraySidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <aside className="p-4 w-full md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4 sticky top-6 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Array Concepts</h2>
      {sidebarItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            className={`w-full text-left px-4 py-2 rounded-md font-medium transition ${
              activeIndex === index
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-indigo-500 hover:text-white"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </button>
          {activeIndex === index && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-md whitespace-pre-line"
            >
              {item.content}
            </motion.p>
          )}
        </motion.div>
      ))}
    </aside>
  );
}
