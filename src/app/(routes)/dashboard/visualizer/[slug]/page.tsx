'use client';

import { useParams } from "next/navigation";
import BubbleSortVisualizer from "@/components/dashboard/bubble-sort/page";
import InsertionSortPage from "@/components/dashboard/insertion-sort/page";
import SelectionSortVisualizer from "@/components/dashboard/selection-sort/page";

export default function VisualizerPage() {
  const { slug } = useParams();
  
  if (!slug) return null;

  const slugStr = slug.toString();

  if (slugStr === "bubble-sort") {
    
    return (
      <BubbleSortVisualizer />
    );
  }

  if (slugStr === "insertion-sort") {
    return (
      <InsertionSortPage />
    );
  }

  if (slugStr === "selection-sort") {
    return (
      <SelectionSortVisualizer />
    );
  }
  return <div className="text-center mt-10 text-xl">Invalid visualizer selected.</div>;
}
