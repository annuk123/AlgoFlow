import problems from "../seed/rawProblems.json";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

// Define the Problem type
type Problem = {
  title: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  slug: string; // ✅ Add slug here for seeding
};

// Replace this with your actual deployment URL
const CONVEX_DEPLOYMENT = process.env.CONVEX_DEPLOYMENT_URL || "https://bold-barracuda-592.convex.cloud";
const convex = new ConvexHttpClient(CONVEX_DEPLOYMENT);

// Slugify helper for generating unique slug from title
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start
    .replace(/-+$/, '');      // Trim - from end
}

async function seedProblems() {
  const typedProblems: Problem[] = (problems as Problem[]).map((problem) => ({
    slug: slugify(problem.title), // ✅ Add slug to the object
    title: problem.title,
    topic: problem.topic,
    difficulty:
      problem.difficulty === "Easy" ||
      problem.difficulty === "Medium" ||
      problem.difficulty === "Hard"
        ? problem.difficulty
        : "Easy",
    description: problem.description,
    constraints: Array.isArray(problem.constraints)
      ? problem.constraints
      : typeof problem.constraints === "string"
        ? (problem.constraints as string).split('\n')
        : [],
    sampleInput: problem.sampleInput,
    sampleOutput: problem.sampleOutput,
  }));

  for (const problem of typedProblems) {
    await convex.mutation(api.problems.insertProblem, {
      slug: problem.slug, // ✅ use slug here, not id
      title: problem.title,
      topic: problem.topic,
      difficulty: problem.difficulty,
      description: problem.description,
      constraints: problem.constraints,
      sampleInput: problem.sampleInput,
      sampleOutput: problem.sampleOutput,
      createdAt: Date.now(),
    });

    console.log(`✅ Seeded: ${problem.title}`);
  }
}

seedProblems()
  .then(() => console.log("🚀 All problems seeded!"))
  .catch((err) => console.error("❌ Seeding failed:", err));
