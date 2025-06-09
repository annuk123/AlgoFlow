"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sidebarItems = [
  {
    title: "What is a String?",
    content:
      "A string is a sequence of characters used to represent text. It can include letters, numbers, symbols, and whitespace. In most languages, strings are immutable (cannot be changed after creation).",
  },
  {
    title: "String Representation",
    content:
      "In memory, strings are stored as arrays of characters with a terminating null character in languages like C, or as objects in higher-level languages like JavaScript, Python, or Java.",
  },
  {
    title: "String Operations",
    content: `✅ Access individual characters by index.
✅ Concatenation: Joining two or more strings.
✅ Substrings: Extract parts of a string.
✅ Search: Find if a string contains another string.
✅ Replace: Change part of a string.
✅ Split: Divide a string based on a delimiter.`,
  },
  {
    title: "Common String Algorithms",
    content: `🔹 Palindrome Check
🔹 String Reversal
🔹 Pattern Matching (KMP, Rabin-Karp)
🔹 Anagram Detection
🔹 Longest Common Substring
🔹 Longest Palindromic Subsequence`,
  },
  {
    title: "When to Use Strings",
    content: `✅ When storing text data (names, sentences, etc.).
✅ When performing text processing (parsing, searching, formatting).
✅ When handling user input, logs, files, URLs, etc.`,
  },
  {
    title: "Real-World Examples",
    content: `🔹 Processing user input in web forms.
🔹 Validating email addresses and passwords.
🔹 URL parsing and routing.
🔹 Search engines use string pattern matching.
🔹 DNA sequence matching in bioinformatics.`,
  },
  {
    title: "Advantages & Disadvantages",
    content: `Advantages:
✔️ Easy to use and manipulate with built-in methods.
✔️ Essential for user-facing applications.

Disadvantages:
❌ Can be memory-heavy for large text processing.
❌ Immutable strings (in some languages) can create performance overhead for repeated modifications.`,
  },
  {
    title: "String Types (Based on Structure)",
    content: `🔸 Mutable Strings: Can be changed (e.g., StringBuilder in Java).
🔸 Immutable Strings: Cannot be changed (e.g., JavaScript, Python strings).
🔸 Unicode Strings: Can store characters from all languages (UTF-8, UTF-16).`,
  },
];

export default function StringSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <aside className="p-4 w-full md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4 sticky top-6 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">String Concepts</h2>
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
              className="mt-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-md whitespace-pre-wrap"
            >
              {item.content}
            </motion.p>
          )}
        </motion.div>
      ))}
    </aside>
  );
}
