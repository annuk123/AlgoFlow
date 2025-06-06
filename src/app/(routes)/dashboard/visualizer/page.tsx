"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/page";

const algorithms = [
  { name: "Bubble Sort", slug: "../dashboard/visualizer/bubble-sort", description: "Visualize Bubble Sort step by step", isNew: false },
  { name: "Insertion Sort", slug: "../dashboard/visualizer/insertion-sort", description: "Learn how Insertion Sort works", isNew: false },
  { name: "Selection Sort", slug: "../dashboard/visualizer/selection-sort", description: "Watch Selection Sort find the minimum element", isNew: false },
  { name: "Merge Sort", slug: "../dashboard/visualizer/merge-sort", description: "Visualize the divide and conquer approach of Merge Sort", isNew: true },
  { name: "Quick Sort", slug: "../dashboard/visualizer/quick-sort", description: "Watch Quick Sort in action", isNew: true },
  { name: "Heap Sort", slug: "../dashboard/visualizer/heap-sort", description: "Learn how Heap Sort builds a heap and sorts", isNew: true },
  { name: "Radix Sort", slug: "../dashboard/visualizer/radix-sort", description: "Visualize sorting by individual digit positions", isNew: true },
  { name: "Counting Sort", slug: "../dashboard/visualizer/counting-sort", description: "Learn how Counting Sort works with integers", isNew: true },
  { name: "Bucket Sort", slug: "../dashboard/visualizer/bucket-sort", description: "Visualize Bucket Sort for efficient sorting", isNew: true },
];

export default function VisualizerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProblems, setFilteredProblems] = useState(algorithms);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = algorithms.filter((algorithm) => {
        const matchesQuery = algorithm.name.toLowerCase().includes(query); // Filter only by name
        return matchesQuery ;
      });
      setFilteredProblems(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {/* Main Content */}
      <motion.h1 
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient"
      >
        <span className="block text-center">
          Choose Your
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
          Algorithm to Visualize
        </span>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {filteredProblems.map((algorithm, index) => (
          <motion.div
            key={`${algorithm.slug}-${algorithm.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/visualizer/${algorithm.slug}`} >
              <div className="relative border border-border rounded-2xl p-6 hover:shadow-xl hover:scale-[1.03] transition cursor-pointer flex flex-col items-center text-center">
                {/* New label */}
                {algorithm.isNew && (
                  <div className="absolute -top-2 -right-1 bg-gray-300 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient text-xs font-semibold py-1 px-2 rounded-lg">
                    New
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-2">{algorithm.name}</h2>
                <p className="text-muted-foreground">{algorithm.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
