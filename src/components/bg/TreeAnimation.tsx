"use client";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

// Horizontal layout: swap x/y logic from vertical tree
const nodes = [
  { id: 1, x: 0, y: 50 },
  { id: 2, x: 100, y: 25 },
  { id: 3, x: 100, y: 75 },
  { id: 4, x: 200, y: 12 },
  { id: 5, x: 200, y: 38 },
  { id: 6, x: 200, y: 62 },
  { id: 7, x: 200, y: 88 },
  { id: 8, x: 300, y: 6 },
  { id: 9, x: 300, y: 18 },
  { id: 10, x: 300, y: 32 },
  { id: 11, x: 300, y: 44 },
  { id: 12, x: 300, y: 56 },
  { id: 13, x: 300, y: 68 },
  { id: 14, x: 300, y: 82 },
  { id: 15, x: 300, y: 94 },
];

const edges = [
  [1, 2],
  [1, 3],
  [2, 4],
  [2, 5],
  [3, 6],
  [3, 7],
  [4, 8],
  [4, 9],
  [5, 10],
  [5, 11],
  [6, 12],
  [6, 13],
  [7, 14],
  [7, 15],
];

const MotionLine = motion("line");

export default function TreeAnimation() {
  const sparkControls = useAnimation();

  useEffect(() => {
    const animateSpark = async () => {
      for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i];
        const fromNode = nodes.find(n => n.id === from)!;
        const toNode = nodes.find(n => n.id === to)!;

        await sparkControls.start({
          cx: [fromNode.x, toNode.x],
          cy: [fromNode.y, toNode.y],
          transition: { duration: 0.6, ease: "easeInOut" },
        });
        await new Promise(r => setTimeout(r, 200));
      }

      animateSpark(); // Loop
    };

    animateSpark();
  }, [sparkControls]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden px-10">
      <svg viewBox="0 0 320 90" className="w-full h-full">
        {/* Edges */}
        {edges.map(([from, to]) => {
          const fromNode = nodes.find(n => n.id === from);
          const toNode = nodes.find(n => n.id === to);
          if (!fromNode || !toNode) return null;

          return (
            <MotionLine
              key={`${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="white"
              strokeWidth="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, idx) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={2.5}
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
          />
        ))}

        {/* Spark */}
        <motion.circle
          r={1.5}
          fill="cyan"
          animate={sparkControls}
        />
      </svg>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-30" />
    </div>
  );
}
