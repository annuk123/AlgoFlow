"use client";
import { useState } from "react";
import { ProblemCard } from "@/components/problems/problemCard";
import problems from "@/seed/rawProblems.json";
import { Sidebar } from "@/components/problems/sidebar";
import { topicGroups } from "@/data/page";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/nav/nav";
import { SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

// Define the Problem type
type Problem = {
  slug: string;
  id?: string;
  title: string;
  description: string;
  topic: string[];
  difficulty: string;
  tags?: string[];
};

export default function ProblemsPage() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); 

const topicCounts: Record<string, number> = {};


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


  const filteredProblems = problems.filter(
    (p) =>
      (selectedTopics.size === 0 ||
        (Array.isArray(p.topic)
          ? p.topic.some((t) => selectedTopics.has(t))
          : selectedTopics.has(p.topic))) &&
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

problems.forEach((problem) => {
  if (Array.isArray(problem.topic)) {
    problem.topic.forEach((t) => {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
  } else {
    topicCounts[problem.topic] = (topicCounts[problem.topic] || 0) + 1;
  }
});



  return (
    <section className="py-20">
      <Navbar />

      <div className="flex md:h-screen relative">
        {/* Mobile Filter Button */}
{/* Mobile Filter Button */}
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="md:hidden fixed top-20  z-50 bg-white dark:bg-black p-2 rounded-md shadow-md"
>
  <SlidersHorizontal className="h-5 w-5" />
</button>

{/* Mobile Backdrop (Only shows when sidebar is open) */}
{sidebarOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/30 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

{/* Sidebar */}
<aside
  className={`
    md:static fixed top-0 left-0 z-50 h-full w-64 p-4 border-r bg-background overflow-y-auto transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
>
  {/* Close Button - Only visible on mobile */}
  <div className="md:hidden flex justify-end mb-4">
    <button
      onClick={() => setSidebarOpen(false)}
      className="p-2 rounded-md bg-muted hover:bg-muted/70 transition"
    >
      <X className="h-5 w-5 text-muted-foreground" />
    </button>
  </div>

  {/* Actual Sidebar Content */}
<Sidebar
  topicsGroups={topicGroups.map(group => ({
    ...group,
    topics: group.topics.map(topic =>
      typeof topic === "string"
        ? { name: topic, count: topicCounts[topic] || 0 } 
        : topic
    ),
  }))}
  selectedTopics={selectedTopics}
  toggleTopic={toggleTopic}
/>

</aside>


        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 mt-4 md:mt-0 scrollbar-hide">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient"
          >
                Explore Leetcode
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                  Problems to Visualize
                </span>
             </motion.h1>

          <input
            type="text"
            placeholder="🔍 Search by title or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-6"
          />

          {/* Difficulty Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 flex flex-wrap gap-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="easy">🟢 Easy</TabsTrigger>
              <TabsTrigger value="medium">🟠 Medium</TabsTrigger>
              <TabsTrigger value="hard">🔴 Hard</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ProblemGrid
                problems={filteredProblems.map((p) => ({
                  ...p,
                  id: p.id?.toString(),
                  topic: Array.isArray(p.topic) ? p.topic : [p.topic],
                }))}
              />
            </TabsContent>
            <TabsContent value="easy">
              <ProblemGrid
                problems={filteredProblems
                  .filter((p) => p.difficulty.toLowerCase() === "easy")
                  .map((p) => ({
                    ...p,
                    id: p.id?.toString(),
                    topic: Array.isArray(p.topic) ? p.topic : [p.topic],
                  }))}
                 
              />
            </TabsContent>
            <TabsContent value="hard">
              <ProblemGrid
                problems={filteredProblems
                  .filter((p) => p.difficulty.toLowerCase() === "hard")
                  .map((p) => ({
                    ...p,
                    id: p.id?.toString(),
                    topic: Array.isArray(p.topic) ? p.topic : [p.topic],
                  }))}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </section>
  );
}

function ProblemGrid({ problems }: { problems: Problem[] }) {
  if (problems.length === 0) {
    return <p className="text-gray-500">No problems found.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {problems.map((problem) => (
        <ProblemCard
          key={problem.slug}
          id={problem.slug}
          title={problem.title}
          description={problem.description}
          difficulty={problem.difficulty}
          tags={problem.tags ?? []}
        />
      ))}
    </div>
  );
}
