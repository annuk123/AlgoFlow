"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  {
    title: "Core Concepts",
    content: `LIFO (Last In, First Out): Used in Stacks. The last element added is removed first.
FIFO (First In, First Out): Used in Queues. The first element added is removed first.
Stack: Think of a stack of plates. Push adds to the top, Pop removes from the top.
Queue: Like a queue at a counter. Enqueue adds to the rear, Dequeue removes from the front.
Peek/Top/Front: Access the next removable element without removing it.
Empty State: Critical edge case — check before Pop or Peek to avoid errors.`,
  },
  {
    title: "When to Use Stack vs Queue",
    content: `Use Stack (LIFO) when:
- You need to backtrack (e.g. undo operations, browser history).
- Implementing Depth-First Search (DFS) or recursive algorithms.
- Managing expression evaluation or function call stacks.

Use Queue (FIFO) when:
- Order matters (e.g. printing jobs, event queues).
- Implementing Breadth-First Search (BFS).
- Managing resources like CPU scheduling, asynchronous tasks.

Use Deque for:
- Bi-directional access, like palindromic checks, sliding window problems.`,
  },
  {
    title: "Supported Operations",
    content: `Push / Enqueue: Add element (top for Stack, rear for Queue).
Pop / Dequeue: Remove element (top for Stack, front for Queue).
Peek / Front / Top: Inspect next element to be removed.
IsEmpty: Check if the structure is empty.
Clear: Reset or empty the structure.
Traversal (optional): Iterate through elements for visualization or logic.`,
  },
  {
    title: " Advanced Tips & Best Practices",
    content: `- Use Stacks for recursive logic, expression parsing, and memory-efficient DFS.
- Use Queues for fair processing (round-robin, task queues).
- Handle empty state checks diligently to avoid runtime errors.
- Deques are versatile and often overlooked — great for sliding window algorithms.
- Prioritize readability in your data structure logic — name functions clearly (e.g., pushStack, enqueueTask).
- Visualize data flow to debug and optimize memory usage.`,
  },
];

export default function StackSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <aside className="p-5 w-full md:w-100 bg-white dark:bg-gray-800 rounded-xl shadow-lg sticky top-6 space-y-4 h-fit border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-2">
        Stack & Queue Concepts
      </h2>
      <Separator className="mb-3" />

      {sidebarItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-2"
        >
          <button
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeIndex === index
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            {item.title}
          </button>

          {activeIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-md text-sm text-gray-700 dark:text-gray-300 prose prose-sm max-w-none"
            >
              {item.content
                .split("\n")
                .map((line, i) => <p key={i} className="mb-1">{line}</p>)}
            </motion.div>
          )}
        </motion.div>
      ))}
    </aside>
  );
}
