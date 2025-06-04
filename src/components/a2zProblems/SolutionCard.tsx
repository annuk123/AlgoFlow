type Language = 'javascript' | 'java' | 'cpp';

export function SolutionCard({ language }: { language: Language }) {
  const solutions: Record<Language, string> = {
    javascript: `function add(a, b) { return a + b; }`,
    java: `public int add(int a, int b) { return a + b; }`,
    cpp: `int add(int a, int b) { return a + b; }`,
  };

  return (
    <div className="p-4 border rounded bg-muted font-mono whitespace-pre-wrap">
      {solutions[language] || "// No solution available"}
    </div>
  );
}
