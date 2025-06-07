"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import a2zProblems from "@/seed/a2zProblems.json";
import { A2ZProblemCard } from "@/components/a2zProblems/ProblemCardA2Z";
import Navbar from "@/components/nav/nav";
import { X } from "lucide-react";

// Extract unique steps
const steps = Array.from(
  new Map(a2zProblems.map(p => [p.step, { step: p.step, stepTitle: p.stepTitle }])).values()
);

export default function A2ZProblemScreen() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const topicsInStep = activeStep
    ? Array.from(
        new Map(
          a2zProblems
            .filter(p => p.step === activeStep)
            .map(p => [p.topic, { topic: p.topic, topicTitle: p.topicTitle }])
        ).values()
      )
    : [];

  const problemsToShow = a2zProblems.filter(
    p => p.step === activeStep && p.topic === activeTopic
  );

  return (
    <section className="min-h-screen py-20 ml-6 relative ">
      <Navbar />

      <div className="p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient ">Striver A2Z DSA Problems</h1>

        {/* Step Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
  {steps.map(({ step, stepTitle }, i) => (
    <motion.button
      key={step}
      onClick={() => setActiveStep(step)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.05, type: "spring", bounce: 0.3 }}
      className={`
        relative rounded-2xl p-6 text-left shadow-xl transition-all
        border-2 border-transparent
        hover:border-gray-900 hover:shadow-sky-900 
        overflow-hidden cursor-pointer 
        group
        ${
          activeStep === step
            ? "bg-gradient-to-br from-blue-700 to-purple-600 text-white shadow-2xl scale-[1.02]"
            : "bg-gradient-to-tr from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 text-gray-800 dark:text-white"
        }
      `}
    >
      {/* Glowing border */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-black via-sky-200 to-sky-700 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
          {step}
        </p>
        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{stepTitle}</p>
      </div>
    </motion.button>
  ))}
</div>
      </div>

      {/* Fullscreen Overlay with Topics and Problems */}
<AnimatePresence>
  {activeStep && (
    <motion.div
      key="overlay"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
      className="fixed top-0 left-0 w-full h-full z-50 p-6 overflow-y-auto backdrop-blur-2xl bg-white/70 dark:bg-black/70"
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/50  hover:bg-red-500 hover:text-white transition"
        onClick={() => {
          setActiveStep(null);
          setActiveTopic(null);
        }}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Step Title */}
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
        Topicwise Problems in {activeStep}
      </h2>

      {/* Topics */}
      <div className="flex flex-wrap gap-4 justify-center">
        {topicsInStep.map(({ topic, topicTitle }, i) => (
          <motion.button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`
              px-5 py-3 rounded-xl min-w-[180px] text-center shadow-md transition duration-300 border-2 font-semibold
              ${
                activeTopic === topic
                  ? "bg-gradient-to-r from-green-500 to-emerald-600  border-none text-gray-800 scale-105"
                  : "bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-sky-500"
              }
            `}
          >
            <p className="text-md">{topic}</p>
            <p className="text-xs text-gray-500 dark:text-gray-200">{topicTitle}</p>
          </motion.button>
        ))}
      </div>

      {/* Problems */}
      {activeTopic && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {problemsToShow.length > 0 ? (
            problemsToShow.map((p) => (
              <A2ZProblemCard
                key={p.slug}
                id={p.slug}
                title={p.title}
                description={p.description}
                difficulty={p.difficulty as "Easy" | "Medium" | "Hard"}
                tags={p.tags || []}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              No problems found for this topic.
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}
