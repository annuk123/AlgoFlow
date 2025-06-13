import solutions from "../seed/rawSolutions.json";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

const CONVEX_DEPLOYMENT = process.env.CONVEX_DEPLOYMENT_URL || "https://bold-barracuda-592.convex.cloud";
const convex = new ConvexHttpClient(CONVEX_DEPLOYMENT);

async function seedSolutions() {
  for (const item of solutions) {
    const { slug, solutions: languageSolutions } = item;

    const problem = await convex.query(api.problems.getBySlug, { slug });
    const problemId = problem?._id;

    if (!problemId) {
      console.error(`❌ Problem with slug "${slug}" not found. Skipping...`);
      continue;
    }

    // ✅ Optional: Clean old solutions
    await convex.mutation(api.solutions.deleteSolutionsByProblemId, { problemId });

    for (const solution of languageSolutions) {
      const { language, code, explanation } = solution;

      await convex.mutation(api.solutions.insertSolution, {
        problemId,
        language,
        code,
        explanation,
        createdAt: Date.now(),
      });

      console.log(`✅ Seeded ${language} solution for "${slug}"`);
    }
  }
}

seedSolutions()
  .then(() => console.log("🎉 All solutions seeded successfully!"))
  .catch((err) => console.error("❌ Solution seeding failed:", err));
