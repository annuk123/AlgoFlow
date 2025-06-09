"use client";

import NodeComponent from "./NodeComponent";
import ArrowComponent from "./ArrowComponent";

interface NodeType {
  id: number;
  value: string;
  prevId?: number | null;
  nextId?: number | null;
}

interface LinkedListDisplayProps {
  linkedList: NodeType[];
  activeIndex?: number; // node to highlight
  type: "singly" | "doubly" | "circular";
}

export default function LinkedListDisplay({
  linkedList,
  activeIndex = -1,
  type,
}: LinkedListDisplayProps) {
  if (linkedList.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic p-4 border rounded-md bg-gray-50 dark:bg-gray-800 text-center">
        The list is empty.
      </p>
    );
  }

  return (
    <div className="flex items-center space-x-4 overflow-x-auto p-4 border rounded-md bg-gray-50 dark:bg-gray-800 relative">
      {linkedList.map((node, index) => {
        const isActive = index === activeIndex;
        const isLast = index === linkedList.length - 1;

        return (
          <div key={node.id} className="flex items-center relative">
            {/* Node */}
            {/* <NodeComponent value={node.value} isActive={isActive} /> */}
<NodeComponent value={node.value} isActive={index === activeIndex} type={type} />

            {/* Next arrow (except after last for singly/doubly, but for circular show after last too) */}
            {(type !== "circular" && !isLast) || (type === "circular") ? (
              <ArrowComponent isActive={isActive} type="next" />
            ) : null}

            {/* For doubly linked list, show prev arrow backward except for first */}
            {type === "doubly" && index > 0 && (
              <div
                className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-180"
                style={{ pointerEvents: "none" }}
              >
                <ArrowComponent isActive={false} type="prev" />
              </div>
            )}
          </div>
        );
      })}

      {/* Circular backward arrow from first to last node (for doubly circular) */}
      {type === "circular" && linkedList.length > 1 && (
        <>
          {/* Next arrow from last to first */}
          <svg
            className="absolute text-gray-400 dark:text-gray-600"
            style={{
              width: 50,
              height: 50,
              bottom: 20,
              right: 20,
              overflow: "visible",
            }}
            viewBox="0 0 50 50"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
                fill="currentColor"
              >
                <polygon points="0 0, 10 3.5, 0 7" />
              </marker>
            </defs>
            <path
              d="M 40 40 Q 25 55 10 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* Prev arrow from first to last (for doubly circular) */}
          {type === "circular" && linkedList.length > 1 && (
            <svg
              className="absolute text-green-500 dark:text-green-400"
              style={{
                width: 50,
                height: 50,
                bottom: 70,
                right: 20,
                overflow: "visible",
              }}
              viewBox="0 0 50 50"
            >
              <defs>
                <marker
                  id="arrowhead-prev"
                  markerWidth="10"
                  markerHeight="7"
                  refX="0"
                  refY="3.5"
                  orient="auto"
                  fill="currentColor"
                >
                  <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
              </defs>
              <path
                d="M 10 40 Q 25 25 40 40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-prev)"
              />
            </svg>
          )}
        </>
      )}
    </div>
  );
}
