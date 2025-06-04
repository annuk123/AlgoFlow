import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import a2zProblems from "../../../seed/a2zProblems.json";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Define the type for each problem item
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

export async function GET() {
  try {
    for (const [index, problem] of (a2zProblems as A2ZProblem[]).entries()) {
      await convex.mutation(api.a2zProblems.insertA2ZProblem, {
        title: problem.title,
        link: "",
        slug: problem.slug,
        topic: problem.topic,
        difficulty: (["Easy", "Medium", "Hard"].includes(problem.difficulty)
          ? problem.difficulty
          : "Easy") as "Easy" | "Medium" | "Hard",
        description: problem.description,
        constraints: Array.isArray(problem.constraints) ? problem.constraints : [],
        sampleInput: problem.sampleInput ?? "",
        sampleOutput: problem.sampleOutput ?? "",
        createdAt: Date.now(),
        order: index,
      });

      // Optional delay to avoid rate limiting
      // await new Promise((res) => setTimeout(res, 50));
    }

    return new Response("A2Z Sheet seeded.", { status: 200 });
  } catch (error) {
    console.error("Seeding failed:", error);
    return new Response("Failed to seed A2Z Sheet.", { status: 500 });
  }
}
