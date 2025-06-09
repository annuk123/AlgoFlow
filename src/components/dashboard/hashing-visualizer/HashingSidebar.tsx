"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sidebarItems = [
  {
    title: "What is Hashing?",
    content: `Hashing is a technique used to uniquely identify a specific object from a group of similar objects. It is commonly used in data structures like hash tables, where it allows for fast data retrieval.`,
  },
  {
    title: "Hash Functions",
    content: `A hash function takes an input (or 'key') and returns a fixed-size string of bytes. The output is typically a 'hash code' that is used to index data in hash tables.`,
  },
  {
    title: "Collision Resolution",
    content: `When two keys hash to the same index, a collision occurs. Common methods to resolve collisions include chaining, linear probing, quadratic probing, and double hashing.`,
  },
  {
    title: "Load Factor",
    content: `The load factor is the ratio of the number of entries in a hash table to the number of slots in the table. A higher load factor can lead to more collisions.`,
  },
  {
    title: "Applications of Hashing",
    content: `Hashing is widely used in various applications such as database indexing, password storage, and data integrity verification.`,
  },
  {
    title: "Best Practices",
    content: `When implementing hashing, consider the choice of hash function, collision resolution strategy, and maintaining a balanced load factor to ensure efficient performance.`,
  },
  {
    title: "Common Hashing Algorithms",
    content: `Some common hashing algorithms include MD5, SHA-1, and SHA-256. These algorithms are used for data integrity checks and cryptographic applications.`,
  },
  {
    title: "Hashing in Programming Languages",
    content: `Most programming languages provide built-in support for hashing. For example, Python has dictionaries, Java has HashMap, and JavaScript has objects that use hashing internally.`,
  },
  {
    title: "Challenges in Hashing",
    content: `Challenges in hashing include choosing an effective hash function, managing collisions efficiently, and ensuring that the hash table can grow dynamically as needed.`,
  },

  {
    title: "Future of Hashing",
    content: `The future of hashing is likely to involve more advanced techniques for collision resolution, better hash functions that minimize collisions, and increased use of hashing in distributed systems and blockchain technology.`,
  },
];

export default function HashingSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <aside className="p-4 w-full md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4 sticky top-6 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Hashing Concepts</h2>
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
