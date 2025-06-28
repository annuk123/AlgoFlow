"use client";

import { useParams, useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ExplanationDrawer from "@/components/problems/ExplanationDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import ApproachesPage from "./components/page";

export default function SolutionPage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params.id as string;

  const problem = useQuery(api.problems.getProblemBySlug, { slug: problemId });
  const solutions = useQuery(
    api.solutions.getSolutionsByProblemId,
    problem?._id ? { problemId: problem._id } : "skip"
  );

  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (solutions && solutions.length > 0 && !selectedLanguage) {
      setSelectedLanguage(solutions[0].language);
    }
  }, [solutions, selectedLanguage]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const handleEdit = (solutionId: string) => {
    router.push(`/problems/${problem?.slug}/editor?solutionId=${solutionId}`);
  };

  if (problem === undefined) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl text-red-600">
        ❌ Problem not found.
      </div>
    );
  }

  if (solutions === undefined) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl">
        Loading solutions...
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl">
        No solutions found for this problem.
      </div>
    );
  }

  const languages = Array.from(new Set(solutions.map((s) => s.language)));
  const currentSolution = solutions.find(
    (s) => s.language === selectedLanguage
  );

  return (
<div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
  {/* <Navbar /> */}
  <h1 className="text-center text-2xl sm:text-3xl font-bold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent mb-4">
    {problem?.title} - Solutions
  </h1>

  <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {selectedLanguage || "Select Language"} <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem key={lang} onClick={() => setSelectedLanguage(lang)}>
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    {currentSolution && (
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => handleCopy(currentSolution.code)}>
          <Copy size={16} className="mr-1" /> Copy
        </Button>
        <Button variant="default" size="sm" onClick={() => handleEdit(currentSolution._id)}>
          <Edit size={16} className="mr-1" /> Edit/Practice
        </Button>
        <Button variant="default" size="sm" onClick={() => setShowExplanation(true)}>
          Explanation
        </Button>
      </div>
    )}
  </div>

  {currentSolution ? (
    <div className="border p-4 rounded-lg bg-muted/50 overflow-x-auto">
      <h4 className="font-medium mb-4">{currentSolution.language}</h4>
      <SyntaxHighlighter
        language={currentSolution.language.toLowerCase()}
        style={dracula}
        showLineNumbers
        wrapLongLines
      >
        {currentSolution.code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <p className="text-muted-foreground">No solution available for the selected language.</p>
  )}

<ApproachesPage />
 

  <ExplanationDrawer
    isOpen={showExplanation}
    explanation={currentSolution?.explanation ?? ""}
    onClose={() => setShowExplanation(false)}
  />
</div>

  );
}
