"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VisualizerPlayer() {
  const { slug } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const algoName = decodeURIComponent(slug as string).replace("-", " ");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-6 text-center capitalize"
      >
        {algoName}
      </motion.h1>

      {/* Canvas / Visualization Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-4xl h-[400px] bg-muted rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg mb-10"
      >
        {/* Here, you'll animate bars, elements, trees, graphs based on algorithm */}
        <p className="text-muted-foreground">
          {isPlaying ? "Visualizing..." : "Press Play to start visualization"}
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex gap-6">
        <Button size="lg" onClick={() => setIsPlaying(true)} className="rounded-full px-8">
          Play
        </Button>
        <Button size="lg" variant="outline" onClick={() => setIsPlaying(false)} className="rounded-full px-8">
          Reset
        </Button>
      </div>
    </section>
  );
}
