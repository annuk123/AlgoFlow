"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import problems from "@/seed/rawProblems.json";
import Link from "next/link";

// Dynamically import Monaco Editor
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function ProblemEditorPage() {
  const params = useParams();
  const problemId = params.id as string;

  const problem = problems.find(
    (p) =>
      p.title === problemId ||
      (Array.isArray(p.topic) ? p.topic.includes(problemId) : p.topic === problemId) ||
      p.slug === problemId
  );

  const [code, setCode] = useState<string>(
    "// Write your solution here\n"
  );

  if (!problem) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl text-red-600">
        ❌ Problem not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
            {problem.title} - Editor
          </h1>
          <Badge variant="outline" className="mt-2">
            {problem.difficulty}
          </Badge>
        </div>
        <Link href={`/problems/${problem.slug}/solution`}>
          <Button variant="outline">View Solution</Button>
        </Link>
      </div>

      {/* Monaco Code Editor */}
      <div className="h-[500px] border rounded-md overflow-hidden">
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>

      {/* Run Button Placeholder */}
      <div className="flex justify-end">
        <Button onClick={() => alert("Run functionality coming soon!")}>Run Code</Button>
      </div>
    </div>
  );
}
