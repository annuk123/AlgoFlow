"use client";
import { Suspense } from "react";
import StringVisualizerPage from "@/components/dashboard/string-visualizer/stringpage";
import Navbar from "@/components/nav/nav";


export default function StringVisualizers() {
  return (
    <main className="min-h-screen py-26 bg-gray-900 text-white p-6">
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient font-bold mb-6 text-center">
              String Visualizer
            </h1>
             <Suspense fallback={<div>Loading...</div>}><StringVisualizerPage /></Suspense>
          </div>
        </div>
    </main>
  );
}
