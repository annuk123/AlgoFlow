"use client";
import Link from "next/link";

import { FaCode, FaRobot, FaProjectDiagram, FaChartLine } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { motion } from "framer-motion";

const features = [
  {
    icon: <MdOutlineVisibility className="icon-style text-indigo-500" />,
    title: "Interactive Algorithm Visualizer",
    desc: "Master DSA with step-by-step animations that transform abstract logic into engaging visuals.",
  },
  {
    icon: <FaCode className="icon-style text-green-500" />,
    title: "LeetCode DSA Code Visualizer",
    desc: "Visualize top LeetCode problems with structured solution flows and real-time execution.",
  },
  {
    icon: <FaProjectDiagram className="icon-style text-purple-500" />,
    title: "Striver A2Z Sheet Support",
    desc: "Follow Striver’s roadmap with visual explanations and organized topic-wise practice.",
  },
  {
    icon: <FaRobot className="icon-style text-pink-500" />,
    title: "AI-Powered Learning (Coming Soon)",
    desc: "Get instant hints, auto-debugging, and AI-generated walkthroughs personalized to your pace.",
  },
  {
    icon: <FaChartLine className="icon-style text-yellow-500" />,
    title: "Scalable for Everyone",
    desc: "Whether you're a beginner or a pro — AlgoFlow adapts and grows with your DSA journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      aria-labelledby="why-choose-us"
    >
      {/* Decorative Blurs */}
      {/* <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 opacity-20 rounded-full blur-2xl animate-pulse" /> */}

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          id="why-choose-us"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800 mb-6 leading-tight"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose         <Link href="/" className="flex-shrink-0">
          <span className="font-extrabold text-6xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
            Algo<span className="text-gray-800">Flow</span>
          </span>
        </Link>?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Experience a revolutionary way to master Data Structures & Algorithms —
          blending visual learning, interactivity, and personalized AI support.
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
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>

              {/* Hover Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 rounded-b-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}