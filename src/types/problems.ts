export type Problem = {
  id: string; 
  title: string;
  topic: string;
  difficulty: string;
  description: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  tags?: string[];
};
