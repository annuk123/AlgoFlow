"use client";
import { useParams } from "next/navigation";
import a2zProblems from "@/seed/a2zProblems.json";

// import CodeEditor from "@/components/CodeEditor";
// import CodeVisualizer from "@/components/CodeVisualizer";

export default function A2ZProblemPage() {
const params = useParams();
const problemId = params.id as string;
const problem = a2zProblems.find((p) => p.title === problemId || p.topic === problemId || p.slug === problemId);
// const problem = problems.find((p) => p.slug === problemId);

  if (!problem) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-xl text-red-600">
        ❌ Problem not found.
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{problem.description}</p>
      </section>
      {/* <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Constraints</h2>
        <ul className="list-disc ml-5">
          {problem.constraints.map((c: string, i: number) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section> */}
      {/* <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Sample Input</h2>
        <pre className="bg-gray-100 p-3 rounded">{problem.sampleInput}</pre>
      </section> */}
      {/* <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Sample Output</h2>
        <pre className="bg-gray-100 p-3 rounded">{problem.sampleOutput}</pre>
      </section> */}

      {/* <Suspense fallback={<p>Loading editor...</p>}>
        <CodeEditor problemSlug={params.slug} />
      </Suspense>

      <Suspense fallback={<p>Loading visualizer...</p>}>
        <CodeVisualizer problemSlug={params.slug} />
      </Suspense> */}
    </main>
  );
}
