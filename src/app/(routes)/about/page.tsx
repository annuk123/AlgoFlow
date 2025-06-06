"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/nav/nav";

export default function IntroductionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white px-6 py-16 lg:px-32">
      <Navbar />
      {/* Hero Section */}
      <section className="text-center py-6 space-y-6">
        {/* <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-6xl font-bold"
        >
          Master DSA Visually. Intuitively. Intelligently.
        </motion.h1> */}
          <motion.h1 
    initial={{ opacity: 0, y: -60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient"
  >
    Master Your
     <br />
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
      DSA Visually.
    </span> 
    Intuitively. Intelligently.
  </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          AlgoFlow revolutionizes how you learn Data Structures and Algorithms
          by combining visual simulations, AI guidance, and curated paths.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center gap-4"
        >
          <Link href="/problems">
            <Button className="text-base">Explore Problems</Button>
          </Link>
          <Link href="/dashboard/visualizer">
            <Button variant="outline" className="text-base">
              <PlayCircle className="mr-2 h-5 w-5" /> Visualize Now
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Why AlgoFlow */}
      <section className="mt-32">
        {/* <h2 className="text-3xl font-semibold text-center mb-12">Why AlgoFlow?</h2> */}
                <h2 className="relative text-4xl font-extrabold text-center tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient mb-6 z-10">
          Why AlgoFlow?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Visual Learning",
              description: "Understand algorithms with dynamic, interactive animations.",
              icon: "🧠",
            },
            {
              title: "AI-Powered Help",
              description: "Get hints and insights from an intelligent assistant.",
              icon: "🤖",
            },
            {
              title: "Structured Paths",
              description: "Follow curated learning journeys like LeetCode & Striver A2Z.",
              icon: "🗺️",
            },
            {
              title: "Practice-First Approach",
              description: "Solve real-world interview problems with built-in feedback.",
              icon: "🎯",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#121212] rounded-2xl p-6 border border-neutral-800 shadow-md hover:shadow-purple-500/20 transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-32 text-center">
        {/* <h2 className="text-3xl font-semibold mb-12">How It Works</h2> */}
        <h2 className="relative text-4xl font-extrabold text-center tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient mb-6 z-10">
          How It Works
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Pick a Problem",
              description: "Choose from categorized problem sets tailored for your level.",
            },
            {
              step: "2",
              title: "Visualize It",
              description: "Watch the algorithm come to life with step-by-step animations.",
            },
            {
              step: "3",
              title: "Solve & Learn",
              description: "Write, run, and analyze code with instant feedback and AI help.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.3 }}
              viewport={{ once: true }}
              className="bg-[#121212] rounded-xl p-6 border border-neutral-800 shadow"
            >
              <div className="text-purple-500 text-2xl font-bold mb-2">
                Step {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient "
        >
          Ready to visualize your way to DSA mastery?
        </motion.h2>
        <motion.div
          className="mt-6 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/problems">
            <Button className="text-base">Start Solving</Button>
          </Link>
          <Link href="/visualizer">
            <Button variant="outline" className="text-base">
              <CheckCircle className="mr-2 h-5 w-5" /> Try Visualizer
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}