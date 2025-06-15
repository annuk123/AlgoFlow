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


// "use client";

// import { useParams, useSearchParams } from "next/navigation";
// import { useQuery } from "convex/react";
// import { api } from "../../../../../../convex/_generated/api";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import Editor from "@monaco-editor/react";
// import { Badge } from "@/components/ui/badge";
// import { Copy, Edit } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// export default function ProblemEditorPage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const initialSolutionId = searchParams.get("solutionId");

//   const problemSlug = params.id as string;

//   const problem = useQuery(api.problems.getBySlug, { slug: problemSlug });
//   const solutions = useQuery(api.solutions.getSolutionsByProblemId, problem ? { problemId: problem._id } : "skip");

//   const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(initialSolutionId);
//   const [code, setCode] = useState<string>("");
//   const [language, setLanguage] = useState<string>("javascript");
//   const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

//   const selectedSolution = solutions?.find((sol) => sol._id === selectedSolutionId) || solutions?.[0];

//   useEffect(() => {
//     if (selectedSolution) {
//       setCode(selectedSolution.code);
//       setLanguage(mapLanguage(selectedSolution.language));
//     }
//   }, [selectedSolution]);

//   const mapLanguage = (lang: string) => {
//     switch (lang.toLowerCase()) {
//       case "javascript":
//         return "javascript";
//       case "python":
//         return "python";
//       case "c++":
//         return "cpp";
//       case "java":
//         return "java";
//       default:
//         return "javascript";
//     }
//   };

//   const handleRun = () => {
//     try {
//       if (language === "javascript") {
//         eval(code);
//         setConsoleOutput("✅ Code ran successfully!");
//       } else {
//         setConsoleOutput("⚠️ Running is only supported for JavaScript currently.");
//       }
//     } catch (error: any) {
//       setConsoleOutput(`❌ Error: ${error.message}`);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(code);
//     toast.success("Code copied to clipboard!");
//   };

//   const handleEdit = () => {
//     toast.success("You are now editing the solution!");
//   };

//   if (problem === undefined || solutions === undefined) {
//     return (
//       <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl">
//         Loading editor...
//       </div>
//     );
//   }

//   if (!selectedSolution) {
//     return (
//       <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl text-red-600">
//         ❌ No solution found for this problem.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">{problem?.title} - Code Editor</h1>
//         <Badge variant="secondary">{selectedSolution.language}</Badge>
//       </div>

//       {/* Solution Selector */}
//       <div className="flex items-center gap-4 mb-4">
//         <Select
//           defaultValue={selectedSolution._id}
//           onValueChange={(value) => setSelectedSolutionId(value)}
//         >
//           <SelectTrigger className="w-60">
//             <SelectValue placeholder="Select a language" />
//           </SelectTrigger>
//           <SelectContent>
//             {solutions.map((sol) => (
//               <SelectItem key={sol._id} value={sol._id}>
//                 {sol.language}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button size="sm" variant="outline" onClick={handleCopy}>
//             <Copy className="w-4 h-4 mr-2" /> Copy Code
//           </Button>
//           <Button size="sm" variant="default" onClick={handleEdit}>
//             <Edit className="w-4 h-4 mr-2" /> Edit Code
//           </Button>
//         </div>
//       </div>

//       {/* Monaco Editor */}
//       <Editor
//         height="500px"
//         language={language}
//         value={code}
//         theme="vs-light"
//         onChange={(value) => setCode(value || "")}
//         options={{
//           fontSize: 14,
//           minimap: { enabled: false },
//         }}
//       />

//       {/* Run Button */}
//       <Button onClick={handleRun} variant="default" className="mt-4">
//         Run Code
//       </Button>

//       {/* Console Output */}
//       {consoleOutput && (
//         <div className="mt-6 border rounded p-4 bg-gray-100">
//           <h2 className="font-semibold mb-2">Console Output:</h2>
//           <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
//         </div>
//       )}
//     </div>
//   );
// }
