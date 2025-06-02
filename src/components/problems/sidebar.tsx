"use client";

import React from "react";
import type { JSX } from "react";
import { cn } from "@/lib/utils";
import {
  LucideList,
  LucideBraces,
  LucideBrain,
  LucideActivity,
  LucideLink,
} from "lucide-react";

interface SidebarProps {
  topicsGroups: { title: string; topics: string[] }[];
  selectedTopics: Set<string>;
  toggleTopic: (topic: string) => void;
}

const topicIcons: Record<string, JSX.Element> = {
  Array: <LucideList className="w-4 h-4" />,
  Strings: <LucideBraces className="w-4 h-4" />,
  DP: <LucideBrain className="w-4 h-4" />,
  Graphs: <LucideActivity className="w-4 h-4" />,
  "Linked List": <LucideLink className="w-4 h-4" />,
};

export const Sidebar = ({
  topicsGroups,
  selectedTopics,
  toggleTopic,
}: SidebarProps) => {
  return (
    <div className="space-y-4">
      {/* <h2 className="text-lg font-semibold text-foreground">📚 Topics</h2> */}


      {topicsGroups.map(
        ({ title, topics }: { title: string; topics: string[] }) => (
          <div key={title}>
            <h3 className="mb-2 text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">{title}</h3>
            <div className="space-y-2">
              {topics.map((topic: string) => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={cn(
                    "flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition hover:bg-muted",
                    selectedTopics.has(topic)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {topicIcons[topic] ?? " "} {topic}
                </button>
              ))}
            </div>
          </div>
        )
      )}

     
    </div>
  );
};
