"use client";

import StringVisualizer from "@/components/dashboard/string-visualizer/StringVisualizer"; // Your visualizer
import StringSidebar from "@/components/dashboard/string-visualizer/sidebar"; // Sidebar you built

export default function StringVisualizerPage() {
  return (
    <main className="flex flex-col md:flex-row gap-6 p-4 min-h-screen bg-gray-100 dark:bg-gray-900 py-26">
      
      {/* Sidebar */}
      <div className="w-full md:w-80">
        <StringSidebar />
      </div>

      {/* Visualizer and Control Panel */}
      <div className="flex-1">
        <StringVisualizer />
      </div>
    </main>
  );
}
