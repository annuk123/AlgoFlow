"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sidebarItems = [
  {
    title: "What is a Linked List?",
    content:
      "A Linked List is a linear data structure where elements (nodes) are connected using pointers. Unlike arrays, elements are not stored in contiguous memory locations.",
  },
  {
    title: "Node Structure",
    content:
      "Each node typically contains:\n1. Data (value)\n2. Pointer (reference) to the next node\nFor Doubly Linked List: Pointer to both next and previous nodes.",
  },
  {
    title: "Basic Operations",
    content:
      "🔹 Insertion:\n- At head: O(1)\n- At tail: O(n)\n- At position: O(n)\n\n🔹 Deletion:\n- From head: O(1)\n- From tail: O(n)\n- At position: O(n)\n\n🔹 Traversal: O(n)\n🔹 Search: O(n)",
  },
  {
    title: "Singly Linked List",
    content:
      "Each node points to the next node. Traversal is possible in one direction only. Efficient for stack-like operations (insertion/deletion at the head).",
  },
  {
    title: "Doubly Linked List",
    content:
      "Each node points to both the next and previous nodes. Allows traversal in both directions. Useful when backward traversal or deletion from the end is frequently needed.",
  },
  {
    title: "Circular Linked List",
    content:
      "The last node points back to the first node forming a circular loop. Can be singly or doubly linked. Useful in applications like round-robin scheduling or continuous looping.",
  },
  {
    title: "When to Use Each Type",
    content: `> Singly: When memory is tight, and you mostly insert/delete at the head.\n> Doubly: When you need fast traversal in both directions.\n> Circular: For continuous data flow like buffering or cycling through items.`,
  },
  {
    title: "Time Complexity",
    content: `🔹 Insertion: O(1) at head, O(n) at tail/position\n🔹 Deletion: O(1) at head, O(n) at tail/position\n🔹 Search: O(n)\n🔹 Traversal: O(n)`,
  },
  {
    title: "Real-World Examples",
    content: `🔹 Singly: Stack (back button history), undo functionality\n🔹 Doubly: Browser tab navigation, music playlist navigation\n🔹 Circular: Multiplayer games, CPU task scheduling, carousel sliders`,
  },
  {
    title: "Advantages & Disadvantages",
    content: `Advantages:\n✔️ Dynamic size\n✔️ Efficient insertion/deletion (compared to arrays)\n\nDisadvantages:\n❌ No random access\n❌ Requires extra memory for pointers\n❌ Traversal can be slow for large lists`,
  },
];

export default function LinkedListSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <aside className="p-4 w-full md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4 sticky top-6 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Linked List Concepts</h2>
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
