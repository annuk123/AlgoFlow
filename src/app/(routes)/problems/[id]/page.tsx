"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { TimerDialog } from "@/components/problems/timer";
import SolutionPage from "@/components/solution/page";
import Navbar from "@/components/nav/nav";

const getAutoEstimatedTime = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "10 min";
    case "medium":
      return "20 min";
    case "hard":
      return "30 min";
    default:
      return "15 min";
  }
};

export default function ProblemPage() {
  const params = useParams();
  const slug = params.id as string;

  const problem = useQuery(api.problems.getProblemBySlug, { slug });

  if (problem === undefined) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center text-lg sm:text-xl">
        Loading...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center text-lg sm:text-xl text-red-600">
        ❌ Problem not found.
      </div>
    );
  }

  const estimatedTime = getAutoEstimatedTime(problem.difficulty);

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-26 sm:py-20 space-y-8">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
  {/* Left Section: Title + Meta Info */}
<div className="flex flex-col sm:items-start w-full sm:w-auto">
  <h1 className="text-2xl sm:text-3xl font-bold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
    {problem.title}
  </h1>

  {/* Difficulty + Time */}
  <div className="flex flex-wrap items-start gap-2 mt-2 text-muted-foreground text-sm">
    <Badge
      className={`text-xs px-2 py-1 rounded-full ${
        problem.difficulty === "Easy"
          ? "border-green-600 text-green-700"
          : problem.difficulty === "Medium"
          ? "border-yellow-600 text-yellow-700"
          : "border-red-600 text-red-700"
      }`}
      variant="outline"
    >
      {problem.difficulty}
    </Badge>
    <span className="flex items-center gap-1">
      <Clock size={16} /> {estimatedTime}
    </span>
  </div>
</div>


  {/* Right Section: Timer */}
  <div className="flex items-center">
    <TimerDialog />
  </div>
</div>


      {/* Description */}
      <div className="prose prose-sm sm:prose-base max-w-none mb-6">
        <p>{problem.description}</p>
      </div>

      {/* Constraints */}
      <div className="prose prose-sm sm:prose-base max-w-none mb-6">
        <h3 className="font-semibold mb-2">Constraints:</h3>
        <ul className="list-disc list-inside space-y-1">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {problem.tags?.map((tag: string) => (
          <Badge key={tag} variant="secondary" className="rounded-full text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Solutions */}
      <SolutionPage />
    </div>
  );
}
