import StackVisualizerPage from "@/components/dashboard/stack-visualizer/StackVisualizerPage";
import Navbar from "@/components/nav/nav";
export default function LinkedListVisualizer() {
  return (
   <main className="min-h-screen py-26 bg-gray-900 text-white p-6">
  <Navbar />
  <h1 className="text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient font-bold mb-6 text-center">
    Linked List Visualizer
  </h1>

  <div className="flex flex-col lg:flex-row gap-6">
    {/* <LinkedListSidebar /> */}
    <StackVisualizerPage />
  </div>
</main>

  );
}