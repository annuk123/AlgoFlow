import problems from "../seed/rawProblems.json";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

// Define the Problem type
type Problem = {
  title: string;
  topic: string[];
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  constraints: string[];
  sampleInput: any;
  sampleOutput: any;
  slug: string;
  explanation: string;
};

const CONVEX_DEPLOYMENT = process.env.CONVEX_DEPLOYMENT_URL || "https://bold-barracuda-592.convex.cloud";
const convex = new ConvexHttpClient(CONVEX_DEPLOYMENT);

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function seedProblems() {
  const typedProblems: Problem[] = (problems as Array<any>).map((problem) => ({
    slug: slugify(problem.title),
    title: problem.title,
    topic: problem.topic,
    tags: Array.isArray(problem.tags) ? problem.tags : [],
    difficulty: ["Easy", "Medium", "Hard"].includes(problem.difficulty)
      ? problem.difficulty
      : "Easy",
    description: problem.description,
    constraints: Array.isArray(problem.constraints)
      ? problem.constraints
      : typeof problem.constraints === "string"
        ? problem.constraints.split('\n')
        : [],
    sampleInput: problem.sampleInput,
    sampleOutput: problem.sampleOutput,
    explanation: problem.explanation || "No explanation provided yet.",
  }));

  for (const problem of typedProblems) {
    try {
      const existing = await convex.query(api.problems.getProblemBySlug, { slug: problem.slug });

      if (existing) {
        console.log(`⚠️ Problem already exists: ${problem.title} (${problem.slug})`);
        continue;
      }

      await convex.mutation(api.problems.insertProblem, {
        slug: problem.slug,
        title: problem.title,
        topic: problem.topic,
        tags: problem.tags,
        difficulty: problem.difficulty,
        description: problem.description,
        constraints: problem.constraints,
        sampleInput: problem.sampleInput,
        sampleOutput: problem.sampleOutput,
        explanation: problem.explanation,
        createdAt: Date.now(),
      });

      console.log(`✅ Seeded: ${problem.title}`);
    } catch (error) {
      console.error(`❌ Failed to seed problem: ${problem.title}`, error);
    }
  }
}

seedProblems()
  .then(() => console.log("🚀 All problems seeded!"))
  .catch((err) => console.error("❌ Seeding process failed:", err));
