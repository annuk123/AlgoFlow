'use client';

import { useParams } from "next/navigation";
import BubbleSortVisualizer from "@/components/dashboard/bubble-sort/page";

export default function VisualizerPage() {
  const { slug } = useParams();
  
  if (!slug) return null;

  const slugStr = slug.toString();

  if (slugStr === "bubble-sort") {
    
    return (
      <BubbleSortVisualizer />
    );
  }
  // return <BubbleSortVisualizer />;
  // return <VisualizerPlayer />;
}
