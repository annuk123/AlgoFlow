// app/array-visualizer/page.tsx
import ArrayVisualizer from "@/components/dashboard/array-visualizer/ArrayVisualizer";
import Navbar from "@/components/nav/nav";

export default function ArrayVisualizerPage() {
  return (
    <main className="min-h-screen py-26 bg-gray-900 text-white p-6">
        <Navbar />
        <div className="flex">
          {/* <ArraySidebar /> */}
          <div className="flex-1">
            <h1 className="text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient font-bold mb-6 text-center">
              Array Visualizer (1D, 2D, 3D)
            </h1>

            <ArrayVisualizer />
          </div>
        </div>
    </main>
  );
}

