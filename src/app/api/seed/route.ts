import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

import problems from "@/seed/problems.json";

export async function GET() {
  for (const problem of problems) {
    await convex.mutation(api.problems.insertProblem, {
      ...problem,
      slug: problem.title.toLowerCase().replace(/\s+/g, '-'),
      createdAt: Date.now(),
      difficulty: (["Easy", "Medium", "Hard"].includes(problem.difficulty) ? problem.difficulty : "Easy") as "Easy" | "Medium" | "Hard"
    }); // ✅ Use API reference here
  }
  return new Response("Seeding complete", { status: 200 });
}
