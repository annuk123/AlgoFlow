import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import algorithms from "../seed/algorithms.json";

const CONVEX_DEPLOYMENT = process.env.CONVEX_DEPLOYMENT_URL || "https://bold-barracuda-592.convex.cloud";
const convex = new ConvexHttpClient(CONVEX_DEPLOYMENT);

async function seedAlgorithms() {
  console.log("⏳ Seeding algorithms...");

  for (const algo of algorithms) {
    await convex.mutation(api.algorithms.insertAlgorithm, {
      name: algo.name,
        topic: algo.topic,
      slug: algo.slug,
      description: algo.description,
      isNew: algo.isNew,
    });

    console.log(`✅ Seeded: ${algo.name}`);
  }
}

seedAlgorithms()
  .then(() => console.log("🚀 All algorithms seeded!"))
  .catch((err) => console.error("❌ Seeding failed:", err));
