"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import problems from "@/seed/rawProblems.json"; // 👈 Import local problems
import { TimerDialog } from "@/components/problems/timer";



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
const problemId = params.id as string;
const problem = problems.find((p) => p.title === problemId || p.topic === problemId || p.slug === problemId);
// const problem = problems.find((p) => p.slug === problemId);


  if (!problem) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl text-red-600">
        ❌ Problem not found.
      </div>
    );
  }

  const estimatedTime = getAutoEstimatedTime(problem.difficulty);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
            {problem.title}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-muted-foreground text-sm">
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

        {/* Timer Modal */}
 <TimerDialog />
      </div>

      {/* Description */}
      <div className="prose prose-sm prose-muted max-w-none mb-6">
        <p>{problem.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Placeholder */}
      <div className="mt-10 border rounded-md p-6 text-center text-muted-foreground">
        Code Editor + Visualizer Coming Soon 🚀
      </div>
    </div>
  );
}
