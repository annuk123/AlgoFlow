"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCode,
  FaRobot,
  FaProjectDiagram,
  FaChartLine,
} from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";

const features = [
  {
    icon: <MdOutlineVisibility className="icon-style text-indigo-500" />,
    title: "Visual Algorithm Walkthroughs",
    desc: "Break down complex DSA logic into clear, step-by-step animations that make learning intuitive.",
  },
  {
    icon: <FaCode className="icon-style text-green-500" />,
    title: "LeetCode Problem Visualizer",
    desc: "Understand popular LeetCode problems through real-time, structured code execution flows.",
  },
  {
    icon: <FaProjectDiagram className="icon-style text-purple-500" />,
    title: "Striver A2Z Roadmap Support",
    desc: "Follow Striver's roadmap with categorized topics, guided visual explanations, and curated practice.",
  },
  {
    icon: <FaRobot className="icon-style text-pink-500" />,
    title: "AI Learning Assistant (Coming Soon)",
    desc: "Get smart hints, automated debugging, and AI-generated insights personalized to your journey.",
  },
  {
    icon: <FaChartLine className="icon-style text-yellow-500" />,
    title: "Designed for Every Learner",
    desc: "Whether you're just starting out or revising for interviews, AlgoFlow grows with your learning pace.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      aria-labelledby="why-choose-us"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          id="why-choose-us"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800 mb-6 leading-tight"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose{" "}
          <Link href="/" className="inline-block">
            <span className="font-extrabold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
              Algo<span className="text-gray-800">Flow</span>
            </span>
          </Link>
          ?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Built by learners, for learners — AlgoFlow brings DSA to life with
          stunning visuals, structured guidance, and a roadmap-backed approach.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex justify-center items-center mb-4 transform transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>

              {/* Hover Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 rounded-b-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
