export type Approach = {
  title: string;
  concept?: string[];
  overview: string[];
  steps?: {
    title: string;
    description: string;
    code?: string;
  }[];
  easyExample: string;
  dryRun: string;
  complexities: {
    time: string;
    space: string;
  };
  comparisons: {
    title: string;
    time: string;
    space: string;
    notes: string[];
  }[];
  whyUseful: string[];
  notes: string[];
};

// Step Type
export type Step = {
  title: string;
  description: string;
  code?: string; // Good, you already made this optional
};