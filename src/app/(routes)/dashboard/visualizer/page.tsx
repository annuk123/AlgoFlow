"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/page";
import algorithms from "@/seed/algorithms.json";
import { Sidebar } from "@/components/dashboard/sidebar";
import { SlidersHorizontal, X } from "lucide-react";
import { topicGroups } from "@/data/algo";

export default function VisualizerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

// Toggle selected topic
const toggleTopic = (topic: string) => {
  setSelectedTopics((prev) => {
    const newSet = new Set(prev);
    if (newSet.has(topic)) {
      newSet.delete(topic);
    } else {
      newSet.add(topic);
    }
    return newSet;
  });
};

const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  handleResize(); // set initially
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


const filteredAlgorithms = algorithms.filter((algo) => {
  const topic = algo.topic?.trim(); // Trim whitespace just in case
  const matchesTopic =
    selectedTopics.size === 0 || (topic && selectedTopics.has(topic));

  const matchesSearch = algo.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  return matchesTopic && matchesSearch;
});


  return (

<section className="relative flex flex-col md:flex-row bg-background min-h-screen overflow-hidden">
  {/* Navbar */}
  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

  {/* Mobile Sidebar Toggle Button */}
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="md:hidden fixed top-20 left-4 z-50 bg-white dark:bg-black p-2 rounded-md shadow-md"
  >
    <SlidersHorizontal className="h-5 w-5" />
  </button>

  {/* Mobile Backdrop */}
  {sidebarOpen && (
    <div
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  )}

  {/* Sidebar */}
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: sidebarOpen || !isMobile ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
      className={`md:static fixed top-0 left-0 z-50 h-full max-h-screen w-64 p-4 border-r bg-background shadow-md transition-transform duration-300 overflow-y-auto custom-scroll scrollbar-hide`}
    >
    {/* Close Button (Mobile) */}
    <div className="md:hidden flex justify-end mb-4">
      <button
        onClick={() => setSidebarOpen(false)}
        className="p-2 rounded-md bg-muted hover:bg-muted/70 transition"
      >
        <X className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>

    <Sidebar
      topicsGroups={topicGroups}
      selectedTopics={selectedTopics}
      toggleTopic={toggleTopic}
    />
  </motion.aside>

  {/* Main Content */}
  <main className="flex-1 px-4 sm:px-6 md:px-8 py-24 flex flex-col items-center relative z-10">
    {/* Hero Heading */}
    <motion.h1
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient"
    >
      Choose Your
      <br />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
        Algorithm to Visualize
      </span>
    </motion.h1>

    {/* Grid of Algorithms */}
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full"
    >
      {filteredAlgorithms.map((algorithm) => (
        <motion.div
          key={`${algorithm.slug}-${algorithm.name}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/visualizer/${algorithm.slug}`}>
            <div className="relative border border-border rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer flex flex-col items-center text-center bg-card/40 backdrop-blur-md">
              {algorithm.isNew && (
                <div className="absolute -top-2 -right-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 text-transparent bg-clip-text text-xs font-semibold py-1 px-2 rounded-lg animate-pulse">
                  New
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">{algorithm.name}</h2>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {algorithm.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </main>
</section>

  );
}
