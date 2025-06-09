"use client";

interface NodeType {
  id: number;
  value: string;
  prevId?: number | null; // for doubly linked list
  nextId?: number | null;
}

type ListType = "singly" | "doubly" | "circular"; // Define ListType

interface MemoryViewProps {
  linkedList: NodeType[];
  listType: ListType; // add this
  type: "singly" | "doubly" | "circular";
}

export default function MemoryView({ linkedList, type }: MemoryViewProps) {
  // Helper to find address string by node id
  const getAddress = (id: number | null | undefined) => {
    if (id == null) return "NULL";
    const index = linkedList.findIndex((node) => node.id === id);
    return index === -1 ? "NULL" : `0x${(100 + index * 4).toString(16)}`;
  };

  return (
    <div className="mt-8 p-4 border rounded-md bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Memory View - {type.charAt(0).toUpperCase() + type.slice(1)} Linked List</h2>
      <div className="flex flex-wrap gap-6">
        {linkedList.map((node, index) => (
          <div
            key={node.id}
            className="flex flex-col items-center justify-center p-4 border rounded shadow-md w-28 bg-gray-50 dark:bg-gray-800"
          >
            <div className="text-sm text-gray-500 mb-1 select-text">
              Address: <code>0x{(100 + index * 4).toString(16)}</code>
            </div>

            <div className="text-lg font-bold">{node.value}</div>

            {/* Next pointer */}
            <div className="text-sm text-blue-600 mt-1 select-text">
              Next: <code>{getAddress(node.nextId)}</code>
            </div>

            {/* Prev pointer only for doubly and circular */}
            {(type === "doubly" || type === "circular") && (
              <div className="text-sm text-green-600 mt-1 select-text">
                Prev: <code>{getAddress(node.prevId)}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
