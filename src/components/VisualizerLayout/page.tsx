'use client';

import { ReactNode } from "react";

interface VisualizerLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  concepts: ReactNode;
}

export const VisualizerLayout = ({ title, description, children, concepts }: VisualizerLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-6 gap-10 bg-background">

      {/* Visualizer Side */}
      <div className="flex flex-col flex-1">
        <h1 className="text-4xl font-bold mb-2 text-center">{title}</h1>
        <p className="text-muted-foreground text-center mb-6">{description}</p>
        
        {children}
      </div>

      {/* Concepts / Approach Side */}
      <div className="flex flex-col gap-4 w-full lg:w-[400px] p-6 rounded-xl bg-muted shadow-md">
        {concepts}
      </div>

    </div>
  );
};
