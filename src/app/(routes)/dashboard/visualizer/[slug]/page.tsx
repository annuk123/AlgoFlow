'use client';

import { useParams } from "next/navigation";
import BubbleSortVisualizer from "@/components/dashboard/bubble-sort/page";
import InsertionSortPage from "@/components/dashboard/insertion-sort/page";
import SelectionSortVisualizer from "@/components/dashboard/selection-sort/page";
import MergeSortVisualizer from "@/components/dashboard/merge-sort/page";
import QuickSortVisualizer from "@/components/dashboard/quick-sort/page";
import HeapSortVisualizer from "@/components/dashboard/heap-sort/page";
import RadixSortVisualizer from "@/components/dashboard/radix-sort/page";
import CountingSortVisualizer from "@/components/dashboard/counting-sort/page";
import BucketSortVisualizer from "@/components/dashboard/bucket-sort/page";

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

  if (slugStr === "merge-sort") {
    return (
      <MergeSortVisualizer />
    );
  }

  if (slugStr === "quick-sort") {
    return (
      <QuickSortVisualizer />
    );
  }

  // if (slugStr === "merge-sort") {
  //   return (
  //     <SelectionSortVisualizer />
  //   );
  // }

  if (slugStr === "heap-sort") {
    return (
      <HeapSortVisualizer />
    );
  }

  if (slugStr === "radix-sort") {
    return (
      <RadixSortVisualizer />
    );
  }

  if (slugStr === "counting-sort") {
    return (
      <CountingSortVisualizer />
    );
  }

  if (slugStr === "bucket-sort") {
    return (
      <BucketSortVisualizer />
    );
  }
  return <div className="text-center mt-10 text-xl">Invalid visualizer selected.</div>;
}
