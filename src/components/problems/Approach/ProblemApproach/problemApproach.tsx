"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

type Step = {
  title: string;
  description: string;
  code?: string;
};

type Approach = {
  title: string;
  overview: string[];
  steps: Step[];
  dryRun?: string;
  complexities: { time: string; space: string };
  comparisons?: { title: string; time: string; space: string; notes: string[] }[];
  notes?: string[];
};

export default function ProblemApproach({ approach }: { approach: Approach }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-10">
      <h1 className="text-5xl font-bold mb-4 text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
        {approach.title}
      </h1>

      {/* Overview Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
          Why this Approach?
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {approach.overview.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Step-by-Step Solution */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
          Step-by-Step Solution
        </h3>
        <ol className="list-decimal list-inside space-y-4">
          {approach.steps.map((step, index) => (
            <li key={index}>
              <strong>{step.title}:</strong> {step.description}
              {step.code && (
                <SyntaxHighlighter
                  language="javascript"
                  style={dracula}
                  showLineNumbers={false}
                >
                  {step.code}
                </SyntaxHighlighter>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Dry Run Example */}
      {approach.dryRun && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
            Dry Run Example
          </h2>
          <SyntaxHighlighter
            language="javascript"
            style={dracula}
            showLineNumbers={false}
          >
            {approach.dryRun}
          </SyntaxHighlighter>
        </section>
      )}

      {/* Complexity Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
          Complexity Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold">Time Complexity</h3>
            <p>
              <strong>{approach.complexities.time}</strong>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Space Complexity</h3>
            <p>
              <strong>{approach.complexities.space}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Comparisons Section */}
      {approach.comparisons && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
            Comparison with Other Approaches
          </h2>
          {approach.comparisons.map((comparison, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
                {comparison.title}
              </h3>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>
                  <strong>Time:</strong> {comparison.time}
                </li>
                <li>
                  <strong>Space:</strong> {comparison.space}
                </li>
                {comparison.notes.map((note, noteIndex) => (
                  <li key={noteIndex}>{note}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Key Notes */}
      {approach.notes && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
            Key Notes
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {approach.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
