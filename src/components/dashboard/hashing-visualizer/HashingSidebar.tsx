

  "use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sidebarItems = [
  {
    title: "What is Hashing?",
    content: `Hashing is a process of converting a key (like a string or number) into a fixed-size index value using a hash function. It helps in fast data storage and retrieval, especially in data structures like hash tables.`,
  },
  {
    title: "Hash Functions Overview",
    content: `A hash function transforms input data (keys) into a number (hash code), which is used as an index in the hash table. A good hash function distributes keys uniformly to minimize collisions.`,
  },
  {
    title: "Modulo Hashing",
    content: `This is the simplest hashing method.

Formula: index = key % tableSize

It's fast but can lead to clustering if table size is not a prime number. Example: key = 27, tableSize = 10 → 27 % 10 = 7.`,
  },
  {
    title: "Multiplicative Hashing",
    content: `This method uses a constant fractional value A (0 < A < 1) to multiply with the key.

Formula: index = floor(tableSize * ((key * A) % 1))

This method helps in better distribution. Common A = 0.618 (golden ratio conjugate).`,
  },
  {
    title: "Mid-Square Method",
    content: `The key is squared, and the middle digits are extracted.

Example:
key = 123 → 123² = 15129 → extract middle digits (512) → index = 512 % tableSize

It’s less common but useful when keys are not well-distributed.`,
  },
  {
    title: "Folding Method",
    content: `The key is divided into equal parts, and those parts are added.

Example:
key = 123456 → split into [12, 34, 56] → 12 + 34 + 56 = 102 → index = 102 % tableSize

Useful when keys have predictable patterns (like phone numbers).`,
  },
  {
    title: "What is a Collision?",
    content: `A collision occurs when two different keys hash to the same index. Efficient collision resolution is essential for a performant hash table.`,
  },
  {
    title: "Linear Probing",
    content: `When a collision occurs, we check the next available slot sequentially.

Formula: (hash + i) % tableSize

i starts at 1 and increases linearly. It’s simple but can cause clustering.`,
  },
  {
    title: "Quadratic Probing",
    content: `Instead of checking linearly, we skip quadratically.

Formula: (hash + i²) % tableSize

Reduces clustering but can still fail to find an empty slot if table is too full.`,
  },
  {
    title: "Double Hashing",
    content: `Uses two hash functions.

Formula: (hash1 + i * hash2) % tableSize

Less clustering and more efficient probing. hash2 should not be 0.`,
  },
  {
    title: "Chaining",
    content: `Instead of finding another slot, we store multiple keys in a list at the same index.

Example: table[5] = [15, 25, 35]

Very flexible, but extra memory is needed for lists.`,
  },
  {
    title: "Load Factor",
    content: `Load Factor = number of keys / table size

It tells how full your hash table is. A higher load factor means more collisions. Keep it below 0.75 for best performance.`,
  },

  {
  title: "Understanding the Hash Table",
  content: `A hash table is like a drawer with many slots. Each key is put in a specific slot (index) based on its hash. If another key wants the same slot, we resolve the clash using techniques like probing or chaining.`,
}
,
  {
    title: "Hash Table Operations",
    content: `Common operations in a hash table include:
- Insert: Add a key-value pair
- Search: Find a value by its key
- Delete: Remove a key-value pair
- Resize: Increase or decrease the size of the table when needed`,
  },
  {
  title: "How Probing Works",
  content: `When a collision happens, probing helps find the next available slot.

- Linear: move one step forward.
- Quadratic: move i² steps (1, 4, 9, ...).
- Double Hashing: use another hash function to decide steps.

Think of it like trying next seats in a row until one is free.`,
}
,
  {
    title: "Hash Table vs Other Data Structures",
    content: `Hash tables are faster for lookups compared to arrays and linked lists. They provide average O(1) time complexity for search, insert, and delete operations, while arrays and linked lists can take O(n) in the worst case.`,
  },
{
  title: "When to Rehash?",
  content: `If too many slots are filled (load factor > 0.75), it's time to rehash.

Rehashing means:
1. Making a bigger table
2. Moving all keys to new positions using the hash function

This reduces collisions and keeps things fast.`,
}
,
  {
    title: "Hashing vs Encryption",
    content: `Hashing is not encryption. Hashing is one-way and irreversible, while encryption can be reversed with a key. Hashing is used for data integrity, while encryption is for data confidentiality.`,
  },
{
  title: "Hashing Analogy",
  content: `Imagine you’re at a movie theater.

- You have a seat number (key)
- You look at the seat map (hash table)
- You go directly to your seat (hash index)
If someone’s sitting there (collision), you check nearby seats (probing/chaining).`,
},
  {
    title: "Real-World Applications",
    content: `Hashing is used in:
- Password storage (with secure hash functions like SHA-256)
- Caching (like in browsers)
- Indexing in databases
- Blockchain and cryptography`,
  },
  {
    title: "Advantages of Hashing",
    content: `Hashing provides:
- Fast data retrieval
- Efficient memory usage
- Simple implementation
- Flexibility in handling collisions`,
  },

  {
  title: "Why Hashing is Fast",
  content: `Unlike linear search which checks items one-by-one, hashing directly jumps to the index using a formula (hash function). This makes search, insert, and delete operations almost instant in ideal cases.`,
}
,
  {
    title: "Disadvantages of Hashing",
    content: `Hashing can lead to:
- Collisions, which require extra handling
- Clustering, where many keys hash to the same index
- Complexity in choosing a good hash function
- Memory overhead for collision resolution methods like chaining`,    
  },
  {
    title: "Choosing a Good Hash Function",
    content: `A good hash function should:
- Distribute keys uniformly across the table
- Minimize collisions
- Be fast to compute
- Handle different types of keys (strings, numbers, etc.)`,
  },


  {
    title: "Best Practices",
    content: `> Use a good hash function to avoid clustering.\n> Keep load factor low.\n> Use prime numbers for table size.\n> Handle collisions smartly.\n> Resize the table when load factor exceeds threshold.`,
  },
    {
    title: "Applications of Hashing",
    content: `Hashing is widely used in various applications such as database indexing, password storage, and data integrity verification.`,
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
  {
    title: "Conclusion",
    content: `Hashing is a fundamental concept in computer science that enables efficient data storage and retrieval. Understanding its principles and applications is crucial for building performant systems.`,
  },
];

export default function HashingSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <aside className="p-4 w-full md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4 sticky top-6 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Hashing Concepts
      </h2>
      {sidebarItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
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
