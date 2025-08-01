"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const nodes = [
  { id: 1, x: 0, y: 80 },
  { id: 2, x: 120, y: 40 },
  { id: 3, x: 120, y: 120 },
  { id: 4, x: 240, y: 20 },
  { id: 5, x: 240, y: 60 },
  { id: 6, x: 240, y: 100 },
  { id: 7, x: 240, y: 140 },
  { id: 8, x: 360, y: 8 },
  { id: 9, x: 360, y: 28 },
  { id: 10, x: 360, y: 48 },
  { id: 11, x: 360, y: 68 },
  { id: 12, x: 360, y: 88 },
  { id: 13, x: 360, y: 108 },
  { id: 14, x: 360, y: 128 },
  { id: 15, x: 360, y: 148 },
  { id: 16, x: 480, y: 4 },
  { id: 17, x: 480, y: 20 },
  { id: 18, x: 480, y: 36 },
  { id: 19, x: 480, y: 52 },
  { id: 20, x: 480, y: 68 },
  { id: 21, x: 480, y: 84 },
  { id: 22, x: 480, y: 100 },
  { id: 23, x: 480, y: 116 },
  { id: 24, x: 480, y: 132 },
  { id: 25, x: 480, y: 148 },
  { id: 26, x: 600, y: 16 },
  { id: 27, x: 600, y: 48 },
  { id: 28, x: 600, y: 80 },
  { id: 29, x: 600, y: 112 },
];

const edges = [
  [1, 2], [1, 3],
  [2, 4], [2, 5],
  [3, 6], [3, 7],
  [4, 8], [4, 9],
  [5, 10], [5, 11],
  [6, 12], [6, 13],
  [7, 14], [7, 15],
  [8, 16], [8, 17],
  [9, 18], [9, 19],
  [10, 20], [10, 21],
  [11, 22], [11, 23],
  [12, 24], [12, 25],
  [16, 26], [18, 27],
  [21, 28], [23, 29],
];

const getNodeById = (id: number) => nodes.find((n) => n.id === id)!;


export default function TreeAnimation() {
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const numberOfSparks = 4;

  return (
    <div className="absolute top-0 left-0 w-full h-screen -z-10 overflow-hidden">
     <svg
        viewBox="0 0 640 160"
        preserveAspectRatio="none"
        className="w-full h-full"
      > 
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map(([from, to], i) => {
          const a = getNodeById(from);
          const b = getNodeById(to);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="white"
              strokeWidth="0.3"
              filter="url(#glow)"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={highlightedNode === node.id ? 4 : 2}
            fill={highlightedNode === node.id ? "#00ffff" : "#00cccc"}
            filter="url(#glow)"
            animate={{
              scale: highlightedNode === node.id ? [1, 1.5, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          />
        ))}

        {/* Sparks */}
        {Array.from({ length: numberOfSparks }).map((_, i) => (
          <Spark key={i} delay={i * 500} setHighlight={setHighlightedNode} />
        ))}
      </svg>
    </div>
  );
}

function Spark({
  delay,
  setHighlight,
}: {
  delay: number;
  setHighlight: (id: number) => void;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    const animateSpark = async () => {
      await new Promise((r) => setTimeout(r, delay));
      setVisible(true);

      while (mounted) {
        for (const [from, to] of edges) {
          const start = getNodeById(from);
          const end = getNodeById(to);

          for (let t = 0; t <= 1; t += 0.02) {
            if (!mounted) return;

            const x = start.x + (end.x - start.x) * t;
            const y = start.y + (end.y - start.y) * t;
            setPos({ x, y });

            if (t >= 0.9) {
              setHighlight(to);
            }

            await new Promise((r) => setTimeout(r, 16)); // ~60fps
          }

          await new Promise((r) => setTimeout(r, 150));
        }
      }
    };

    animateSpark();
    return () => {
      mounted = false;
    };
  }, [delay, setHighlight]);

  return visible ? (
    <motion.circle
      r={2.5}
      cx={pos.x}
      cy={pos.y}
      fill="#00ffff"
      filter="url(#glow)"
    />
  ) : null;
}
