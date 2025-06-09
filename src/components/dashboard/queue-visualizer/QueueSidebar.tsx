"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sidebarItems = [
  {
    title: "Core Queue Concepts",
    content: `🔍 Core Concepts
- FIFO (First In, First Out): The earliest added element is the first to be removed.
- Queue: A linear data structure where insertion happens at the rear and deletion happens from the front.
- Front: The element to be dequeued next.
- Rear: The last element added to the queue.
- Operations:
  - Enqueue: Add element to the rear.
  - Dequeue: Remove element from the front.
  - Peek: View the front element without removing it.
  - IsEmpty: Check if the queue has elements.
- Empty State: Critical edge case, must be handled to prevent errors.`,
  },
  {
    title: "When to Use a Queue",
    content: `⚙️ When to Use a Queue
- Task Scheduling: CPU scheduling, printing jobs.
- Breadth-First Search (BFS): Level-wise traversal in trees and graphs.
- Asynchronous Data Processing: Queues for handling incoming requests.
- Order Preservation: Scenarios where order of processing is critical.
- Multi-threading: Thread-safe queues to manage shared resources.
- Streaming Systems: Processing real-time data efficiently.`,
  },
  {
    title: "Supported Operations",
    content: `🛠️ Supported Operations
- Enqueue: Add element to the rear.
- Dequeue: Remove element from the front.
- Peek: View the front element.
- IsEmpty: Check if queue is empty.
- Clear: Remove all elements.
- Traversal: (Optional) Visual walkthrough of the queue.`,
  },
  {
    title: "Advanced Tips & Best Practices",
    content: `💡 Advanced Tips & Best Practices
- Handle empty queue carefully to prevent underflow errors.
- Use queues when order matters and tasks must be processed sequentially.
- Consider a circular queue for efficient memory use in fixed-size queues.
- For high-concurrency applications, use thread-safe or lock-free queues.
- Visualizing helps to debug complex queue-based algorithms.
- Queues generally have O(1) enqueue and dequeue time complexity.`,
  },
];

export default function QueueSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <aside className="p-4 w-full md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4 sticky top-6 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Queue Concepts</h2>
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
