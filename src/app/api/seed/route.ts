import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

import problems from "@/seed/problems.json";

export async function GET() {
  for (const problem of problems) {
    // Parse sampleInput
    let sampleInput: { nums: number[]; target: number } = { nums: [], target: 0 };
    try {
      const numsMatch = problem.sampleInput.match(/nums\s*=\s*\[([^\]]+)\]/);
      const targetMatch = problem.sampleInput.match(/target\s*=\s*(\d+)/);

      if (numsMatch && targetMatch) {
        const nums = numsMatch[1].split(",").map((n) => parseInt(n.trim(), 10));
        const target = parseInt(targetMatch[1], 10);
        sampleInput = { nums, target };
      } else {
        console.warn(`sampleInput parsing failed for problem: ${problem.title}`);
      }
    } catch (err) {
      console.error(`Error parsing sampleInput for problem: ${problem.title}`, err);
    }

    // Parse sampleOutput
    let sampleOutput: number[] = [];
    try {
      sampleOutput = JSON.parse(problem.sampleOutput);
    } catch (err) {
      console.error(`Error parsing sampleOutput for problem: ${problem.title}`, err);
    }

    const { explanation = "", ...rest } = problem;

    await convex.mutation(api.problems.insertProblem, {
      ...rest,
      explanation: typeof explanation === "string" ? explanation : "",
      slug: problem.title.toLowerCase().replace(/\s+/g, "-"),
      createdAt: Date.now(),
      difficulty: (["Easy", "Medium", "Hard"].includes(problem.difficulty) ? problem.difficulty : "Easy") as "Easy" | "Medium" | "Hard",
      sampleInput,
      sampleOutput,
    });
  }

  return new Response("Seeding complete", { status: 200 });
}
