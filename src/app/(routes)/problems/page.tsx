"use client";

import { useState } from "react";
import { ProblemCard } from "@/components/problems/problemCard";
import problems from "@/seed/rawProblems.json";
import { Sidebar } from "@/components/problems/sidebar";
import { topicGroups } from "@/data/page";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/nav/nav";
import { SlidersHorizontal, X } from "lucide-react";

// Define the Problem type
type Problem = {
  slug: string;
  id?: string;
  title: string;
  description: string;
  topic: string;
  difficulty: string;
  tags?: string[];
};

export default function ProblemsPage() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 sidebar visibility

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
      (selectedTopics.size === 0 || selectedTopics.has(p.topic)) &&
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  return (
    <section className="py-20">
      <Navbar />

      <div className="flex md:h-screen relative">
        {/* Mobile Filter Button */}
{/* Mobile Filter Button */}
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="md:hidden fixed top-20 left-4 z-50 bg-white dark:bg-black p-2 rounded-md shadow-md"
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
    topicsGroups={topicGroups}
    selectedTopics={selectedTopics}
    toggleTopic={toggleTopic}
  />
</aside>


        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
            Explore Leetcode Problems
          </h1>

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
                }))}
              />
            </TabsContent>
            <TabsContent value="easy">
              <ProblemGrid
                problems={filteredProblems
                  .filter((p) => p.difficulty.toLowerCase() === "easy")
                  .map((p) => ({ ...p, id: p.id?.toString() }))}
              />
            </TabsContent>
            <TabsContent value="medium">
              <ProblemGrid
                problems={filteredProblems
                  .filter((p) => p.difficulty.toLowerCase() === "medium")
                  .map((p) => ({ ...p, id: p.id?.toString() }))}
              />
            </TabsContent>
            <TabsContent value="hard">
              <ProblemGrid
                problems={filteredProblems
                  .filter((p) => p.difficulty.toLowerCase() === "hard")
                  .map((p) => ({ ...p, id: p.id?.toString() }))}
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
