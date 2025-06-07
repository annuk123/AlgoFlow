const fs = require("fs");
const path = require("path")

// Define a type for each problem
type A2ZProblem = {
  title: string;
  slug: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  description: string;
  constraints?: string[];
  sampleInput?: string;
  sampleOutput?: string;
};

const stepsDir = path.join(__dirname, "../seed/steps");
const outputFile = path.join(__dirname, "../seed/a2zProblems.json");

function combineStepFiles(): void {
  const allFiles = fs.readdirSync(stepsDir).filter((file: string) => file.endsWith(".json"));

  const allProblems: A2ZProblem[] = [];

  for (const file of allFiles) {
    const filePath = path.join(stepsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8")) as A2ZProblem[];

    if (!Array.isArray(content)) {
      console.warn(`⚠️ Skipped ${file} because it doesn't export an array`);
      continue;
    }

    allProblems.push(...content);
  }

  fs.writeFileSync(outputFile, JSON.stringify(allProblems, null, 2));
  console.log("✅ Combined all step files into a2zProblems.json");
}

combineStepFiles();
