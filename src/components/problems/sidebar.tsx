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
  topicsGroups: { topics: { name: string; count: number }[] }[];
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
      <h2 className="text-lg font-semibold text-foreground">📚 Topics</h2>

      {topicsGroups.map(({ topics }, groupIdx) => (
        <div key={groupIdx}>
          <div className="space-y-2">
            {topics.map((topicObj) => (
              <button
                key={topicObj.name}
                onClick={() => toggleTopic(topicObj.name)}
                className={cn(
                  "flex items-center justify-between gap-2 w-full text-left px-3 py-2 rounded-md transition hover:bg-muted",
                  selectedTopics.has(topicObj.name)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  {topicIcons[topicObj.name] ?? " "} {topicObj.name}
                </div>
                <span className="text-xs bg-muted text-foreground px-2 py-0.5 rounded-full">
  {topicObj.count}
</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
