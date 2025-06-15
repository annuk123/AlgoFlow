import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

import problems from "@/seed/problems.json";
type SampleInputType = Record<string, unknown>; // Allows flexible keys
type SampleOutputType = unknown; // Allows any JSON-safe structure


export async function GET() {
  for (const problem of problems) {
    // Flexible Sample Input Parsing (Supports Any JSON)
    let sampleInput: SampleInputType = {};
    try {
      sampleInput = JSON.parse(problem.sampleInput);
    } catch (err) {
      console.warn(`sampleInput parsing failed for problem: ${problem.title}`, err);
      sampleInput = {}; // Assign an empty object if JSON parsing fails
    }

    // Safer Sample Output Parsing
    let sampleOutput: SampleOutputType = problem.sampleOutput;
    try {
      sampleOutput = JSON.parse(problem.sampleOutput);
    } catch (err) {
      console.warn(`sampleOutput parsing failed for problem: ${problem.title}`, err);
      sampleOutput = problem.sampleOutput; // Save original if JSON parsing fails
    }

    const { explanation = "", ...rest } = problem;

    // Safer Seeding with Normalized Data
    await convex.mutation(api.problems.insertProblem, {
      ...rest,
      explanation: typeof explanation === "string" ? explanation : "",
      slug: problem.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
      createdAt: Date.now(),
      difficulty: (["Easy", "Medium", "Hard"].includes(problem.difficulty) ? problem.difficulty : "Easy") as "Easy" | "Medium" | "Hard",
      topic: Array.isArray(problem.topic) ? problem.topic : [problem.topic],
      sampleInput,
      sampleOutput,
    });
  }

  return new Response("Seeding complete", { status: 200 });
}
