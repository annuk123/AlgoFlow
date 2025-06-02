"use client";

import { useState } from "react";
import { ProblemCard } from "@/components/problems/problemCard";
import problems from "@/seed/rawProblems.json";
import { Sidebar } from "@/components/problems/sidebar";
import { topicGroups } from "@/data/page";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/nav/nav";

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

  // Filter problems by selected topic

const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());

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

const [searchQuery, setSearchQuery] = useState("");

const filteredProblems = problems.filter(
  (p) =>
    (selectedTopics.size === 0 || selectedTopics.has(p.topic)) &&
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ))
);


  return (
    <section className=" py-20 ml-6 ">
      <Navbar />
    <div className="flex h-screen overflow-hidden scrollbar-hide">
      
      {/* Sidebar */}
      <aside className="w-64 p-4 border-r bg-background sticky top-0 h-screen overflow-y-auto scrollbar-hide">
    <Sidebar topicsGroups={topicGroups} selectedTopics={selectedTopics} toggleTopic={toggleTopic} />

      </aside>

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <h1 className="text-3xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">Explore Leetcode Problems</h1>

<input
  type="text"
  placeholder="🔍 Search by title or tag..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full px-4 py-2 border rounded-md mb-6"
/>

        {/* Difficulty Tabs */}
        <Tabs defaultValue="all" className="w-full scrollbar-hide">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="easy">🟢 Easy</TabsTrigger>
            <TabsTrigger value="medium">🟠 Medium</TabsTrigger>
            <TabsTrigger value="hard">🔴 Hard</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ProblemGrid problems={filteredProblems.map(p => ({ ...p, id: p.id?.toString() }))} />
          </TabsContent>
          <TabsContent value="easy">
            <ProblemGrid problems={filteredProblems.filter(p => p.difficulty.toLowerCase() === "easy").map(p => ({ ...p, id: p.id?.toString() }))} />
          </TabsContent>
          <TabsContent value="medium">
            <ProblemGrid problems={filteredProblems.filter(p => p.difficulty.toLowerCase() === "medium").map(p => ({ ...p, id: p.id?.toString() }))} />
          </TabsContent>
          <TabsContent value="hard">
            <ProblemGrid problems={filteredProblems.filter(p => p.difficulty.toLowerCase() === "hard").map(p => ({ ...p, id: p.id?.toString() }))} />
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
