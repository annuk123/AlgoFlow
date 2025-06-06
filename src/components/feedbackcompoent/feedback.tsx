'use client';

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
export interface Feedback {
  _id?: string; // Optional unique identifier
  name: string;
  message: string;
  rating: number; // Rating from 1 to 5
  createdAt: string; // or Date
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const starColors = [
  "#f59e0b", // amber-500 for filled stars
  "#d1d5db", // gray-300 for empty stars
];

// Component to render stars based on rating (1-5)
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: star * 0.05, type: "spring", stiffness: 260, damping: 20 }}
          aria-label={star <= rating ? "Filled star" : "Empty star"}
          role="img"
          className="text-xl select-none"
          style={{ color: star <= rating ? starColors[0] : starColors[1] }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function FeedbackSection({ feedback }: { feedback: Feedback[] }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 space-y-12 ">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient"
      >
        What People Are Saying
      </motion.h2>

      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-48 rounded-3xl bg-gray-300/40 dark:bg-gray-700/40 backdrop-blur-sm shadow-md animate-pulse"
            />
          ))}
        </div>
      ) : feedback?.length === 0 ? (
        <div className="flex flex-col items-center text-center space-y-4 text-gray-400 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-20 w-20 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75M12 6v6m0 0l3-3m-3 3l-3-3" />
          </svg>
          <p className="text-lg font-semibold">No feedback yet.</p>
          <p className="max-w-md">Be the first to share your thoughts and help us improve!</p>
        </div>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {feedback.map((f, i) => (
            <motion.div
              key={f._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-purple-500/20 transition bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg p-7 flex flex-col justify-between hover:shadow-2xl duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=random&bold=true&size=64`}
                    width={48}
                    height={48}
                    alt={f.name}
                    className="rounded-full shadow-md"
                    priority={true}
                  />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">{f.name}</h3>
                    <StarRating rating={f.rating || 0} />
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line">{f.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
