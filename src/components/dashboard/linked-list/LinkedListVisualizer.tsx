"use client";

import { useState } from "react";
import ControlPanel from "./ControlPanel";
import MemoryView from "./MemoryView";
import LinkedListDisplay from "./LinkedListDisplay";
import OperationLog from "./OperationLog";
import LinkedListSidebar from "./sidebar"; // Sidebar Component

type NodeType = {
  id: number;
  value: string;
  prevId?: number | null;
  nextId?: number | null;
};

type ListType = "singly" | "doubly" | "circular";

export default function LinkedListVisualizerPage() {
  const [linkedList, setLinkedList] = useState<NodeType[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [listType, setListType] = useState<ListType>("singly");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(500); // Default speed in ms


  return (
    <main className="flex flex-col md:flex-row gap-6 p-4 min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <div className="w-full md:w-80 ml-7">
        <LinkedListSidebar />
      </div>

      {/* Visualizer Content */}
      <div className="flex-1 space-y-8">

        <p className="text-center text-gray-500 dark:text-gray-400">
          Visualize and interact with different types of linked lists.
        </p>

        {/* Control Panel */}
        <ControlPanel
          linkedList={linkedList}
          setLinkedList={setLinkedList}
          setLog={setLog}
          listType={listType}
          setListType={setListType}
          setActiveIndex={setActiveIndex}
          speed={speed}
          setSpeed={setSpeed}
        />

        {/* Visual display with arrows */}
        <LinkedListDisplay
          linkedList={linkedList}
          activeIndex={activeIndex ?? -1}
          type={listType}
        />

        {/* Memory view with prev/next */}
        <MemoryView linkedList={linkedList} listType={listType} type={listType} />

        {/* Operation logs */}
        <OperationLog log={log} />

        {/* Instructions */}
        <div className="space-y-2">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Use the control panel to add, remove, and manipulate nodes in the linked list.
          </p>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Select the type of linked list you want to visualize and interact with it using the controls.
          </p>
        </div>
        
      </div>
    </main>
  );
}
