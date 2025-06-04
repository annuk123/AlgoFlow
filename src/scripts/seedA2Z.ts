import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import a2zProblems from "../seed/a2zProblems.json"; // adjust path if needed

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

type RawProblem = {
  title: string;
  topic: string;
  difficulty?: string;
  description: string;
  constraints?: string[] | string;
  sampleInput?: string;
  sampleOutput?: string;
};

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


async function seed() {
  console.log("⏳ Seeding A2Z problems...");

//   for (const [index, problem] of a2zProblems.entries()) {
//     await convex.mutation(api.a2zProblems.insertA2ZProblem, {
//       ...problem,
//       link: "",
//       createdAt: Date.now(),
//       order: index,
//       difficulty: (["Easy", "Medium", "Hard"].includes(problem.difficulty)
//         ? problem.difficulty
//         : "Easy") as "Easy" | "Medium" | "Hard",
//     });
 const typedProblems: Problem[] = (a2zProblems as RawProblem[]).map((problem) => ({
    slug: slugify(problem.title),
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
        : problem.constraints !== undefined
          ? [String(problem.constraints)]
          : [],
    sampleInput: problem.sampleInput ?? "",
    sampleOutput: problem.sampleOutput ?? "",
  }));
    // Optional: await new Promise(res => setTimeout(res, 50));
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
  
  seed()
    .then(() => console.log("🚀 All problems seeded!"))
    .catch((err) => console.error("❌ Seeding failed:", err));
  


