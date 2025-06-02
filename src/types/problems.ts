// types/problem.ts
export type Problem = {
  id: string; // This should be a slugified version of the title or
  title: string;
  topic: string;
  difficulty: string;
  description: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  tags?: string[];
};
