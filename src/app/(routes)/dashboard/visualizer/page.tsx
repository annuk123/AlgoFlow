"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/page";

const algorithms = [
  { name: "Bubble Sort", slug: "../dashboard/visualizer/bubble-sort", description: "Visualize Bubble Sort step by step" },
  { name: "Insertion Sort", slug: "../dashboard/visualizer/insertion-sort", description: "Learn how Insertion Sort works" },
  { name: "Selection Sort", slug: "../dashboard/visualizer/selection-sort", description: "Watch Selection Sort find the minimum element" },
  { name: "Merge Sort", slug: "../../comingSoon", description: "Visualize the divide and conquer approach of Merge Sort" },
  { name: "Quick Sort", slug: "../../comingSoon", description: "Watch Quick Sort in action" },
  { name: "Heap Sort", slug: "../../comingSoon", description: "Learn how Heap Sort builds a heap and sorts" },
  { name: "Radix Sort", slug: "../../comingSoon", description: "Visualize sorting by individual digit positions" },
  { name: "Counting Sort", slug: "../../comingSoon", description: "Learn how Counting Sort works with integers" },
  { name: "Bucket Sort", slug: "../../comingSoon", description: "Visualize Bucket Sort for efficient sorting" },
  { name: "Binary Search", slug: "../../comingSoon", description: "Visualize efficient searching" },
  { name: "Linear Search", slug: "../../comingSoon", description: "Simple search through an array" },
  { name: "Ternary Search", slug: "../../comingSoon", description: "Efficient search with three-way splitting" },
  { name: "Fibonacci Search", slug: "../../comingSoon", description: "Search using Fibonacci numbers" },
  { name: "BFS (Breadth-First Search)", slug: "../../comingSoon", description: "Explore BFS traversal in graphs" },
  { name: "DFS (Depth-First Search)", slug: "../../comingSoon", description: "Explore DFS traversal in graphs" },
  { name: "Dijkstra's Algorithm", slug: "../../comingSoon", description: "Visualize the shortest path algorithm" },
  { name: "Bellman-Ford Algorithm", slug: "../../comingSoon", description: "Visualize Bellman-Ford for single-source shortest path" },
  { name: "Floyd-Warshall Algorithm", slug: "../../comingSoon", description: "Learn the all-pairs shortest path algorithm" },
  { name: "Topological Sort", slug: "../../comingSoon", description: "Order tasks in a directed acyclic graph" },
  { name: "Kruskal's Algorithm", slug: "../../comingSoon", description: "Find minimum spanning tree in a graph" },
  { name: "Prim's Algorithm", slug: "../../comingSoon", description: "Find minimum spanning tree using Prim’s algorithm" },
  { name: "KMP Algorithm (Knuth-Morris-Pratt)", slug: "../../comingSoon", description: "Efficient substring search" },
  { name: "Rabin-Karp Algorithm", slug: "../../comingSoon", description: "String search using hashing" },
  { name: "Knapsack Problem", slug: "../../comingSoon", description: "Visualize the dynamic programming solution for the Knapsack Problem" },
  { name: "Longest Common Subsequence (LCS)", slug: "../../comingSoon", description: "Find the longest common subsequence in two strings" },
  { name: "Longest Increasing Subsequence (LIS)", slug: "../../comingSoon", description: "Find the longest increasing subsequence in an array" },
  { name: "Greedy Algorithm", slug: "../../comingSoon", description: "Solve optimization problems with a greedy approach" },
  { name: "Backtracking", slug: "../../comingSoon", description: "Solve problems by exploring all possible solutions" },
  { name: "Dynamic Programming", slug: "../../comingSoon", description: "Learn about solving problems through dynamic programming" },
  { name: "Towers of Hanoi", slug: "../../comingSoon", description: "Watch the classic Towers of Hanoi puzzle solved step by step" },
  { name: "Matrix Chain Multiplication", slug: "../../comingSoon", description: "Optimize matrix chain multiplication order" },
  { name: "Binary Indexed Tree (Fenwick Tree)", slug: "../../comingSoon", description: "Efficient data structure for range queries" },
  { name: "Segment Tree", slug: "../../comingSoon", description: "Efficient data structure for range queries and updates" },
  { name: "Disjoint Set (Union-Find)", slug: "../../comingSoon", description: "Efficiently solve connectivity problems" },
  { name: "Tries", slug: "../../comingSoon", description: "Efficient data structure for string matching and autocomplete" },
  { name: "AVL Tree", slug: "../../comingSoon", description: "Self-balancing binary search tree" },
  { name: "Red-Black Tree", slug: "../../comingSoon", description: "Self-balancing binary search tree" },
  { name: "B-Trees", slug: "../../comingSoon", description: "Efficient data structure for databases and file systems" },
  { name: "Splay Tree", slug: "../../comingSoon", description: "Self-adjusting binary search tree" },
  { name: "Heap (Priority Queue)", slug: "../../comingSoon", description: "Efficiently manage a priority queue" },
  { name: "Trie Search", slug: "../../comingSoon", description: "Efficient string search and prefix matching" },
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
            // key={algorithm.slug}
            key={`${algorithm.slug}-${algorithm.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/visualizer/${algorithm.slug}`} >
              <div className="border border-border rounded-2xl p-6 hover:shadow-xl hover:scale-[1.03] transition cursor-pointer flex flex-col items-center text-center">
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
