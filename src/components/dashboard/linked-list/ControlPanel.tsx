"use client";

import { useState } from "react";

type ListType = "singly" | "doubly" | "circular";

interface ControlPanelProps {
  linkedList: { id: number; value: string }[];
  setLinkedList: React.Dispatch<
    React.SetStateAction<{ id: number; value: string }[]>
  >;
  setLog: React.Dispatch<React.SetStateAction<string[]>>;
  listType: ListType; // add this
  setListType: React.Dispatch<React.SetStateAction<ListType>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;

}

const LIST_TYPES = ["singly", "doubly", "circular"];

export default function ControlPanel({
  linkedList,
  setLinkedList,
  setLog,
  listType,
  setListType,
  speed,
  setSpeed,
}: ControlPanelProps) {
  const [inputValue, setInputValue] = useState("");

  // Generate unique IDs for nodes
  const generateId = () => Date.now() + Math.random();

  const logAction = (msg: string) => {
    setLog((prev) => [...prev, msg]);
  };

  // Insert at Head
  const insertAtHead = () => {
    if (!inputValue) return;
    const newNode = { id: generateId(), value: inputValue };

    // For circular list, we may handle differently in main logic
    setLinkedList([newNode, ...linkedList]);
    logAction(`Inserted '${inputValue}' at head.`);
    setInputValue("");
  };

  // Insert at Tail
  const insertAtTail = () => {
    if (!inputValue) return;
    const newNode = { id: generateId(), value: inputValue };
    setLinkedList([...linkedList, newNode]);
    logAction(`Inserted '${inputValue}' at tail.`);
    setInputValue("");
  };

  // Delete by Value (first occurrence)
  const deleteByValue = () => {
    if (!inputValue) return;
    const index = linkedList.findIndex((node) => node.value === inputValue);
    if (index === -1) {
      logAction(`Value '${inputValue}' not found.`);
    } else {
      const updatedList = [...linkedList];
      updatedList.splice(index, 1);
      setLinkedList(updatedList);
      logAction(`Deleted '${inputValue}' from list.`);
    }
    setInputValue("");
  };

  // Search by Value
  const searchByValue = () => {
    if (!inputValue) return;
    const index = linkedList.findIndex((node) => node.value === inputValue);
    if (index === -1) {
      logAction(`Value '${inputValue}' not found.`);
    } else {
      logAction(`Value '${inputValue}' found at position ${index + 1}.`);
      // Optionally: trigger highlight or animation
    }
    setInputValue("");
  };

  // Clear entire list
  const clearList = () => {
    setLinkedList([]);
    logAction("Cleared the list.");
  };

  return (
    <div className="p-6 border rounded-md bg-white dark:bg-gray-900 shadow-md max-w-3xl mx-auto space-y-6">
      {/* Linked List Type Selector */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Select Linked List Type</h2>
        <div className="flex space-x-4">
          {LIST_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setListType(type as ListType)}
              className={`px-4 py-2 rounded-md font-medium transition
                ${
                  listType === type
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white"
                }`}
              aria-pressed={listType === type}
            >
              {type} Linked List
            </button>
          ))}
        </div>
      </div>

      {/* Input and action buttons */}
      <div>
        <input
          type="text"
          placeholder="Enter node value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={insertAtHead}
          disabled={!inputValue}
          className={`btn-primary px-5 py-2 rounded-md font-semibold ${
            !inputValue
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700"
          }`}
          title={`Insert node at head of the ${listType.toLowerCase()} linked list`}
        >
          Insert Head
        </button>

        <button
          onClick={insertAtTail}
          disabled={!inputValue}
          className={`btn-primary px-5 py-2 rounded-md font-semibold ${
            !inputValue
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700"
          }`}
          title={`Insert node at tail of the ${listType.toLowerCase()} linked list`}
        >
          Insert Tail
        </button>

        <button
          onClick={deleteByValue}
          disabled={!inputValue}
          className={`btn-danger px-5 py-2 rounded-md font-semibold ${
            !inputValue ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
          title={`Delete first occurrence of value from the list`}
        >
          Delete Value
        </button>

        <button
          onClick={searchByValue}
          disabled={!inputValue}
          className={`btn-secondary px-5 py-2 rounded-md font-semibold ${
            !inputValue ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
          }`}
          title={`Search for a value in the list`}
        >
          Search Value
        </button>

        <button
          onClick={clearList}
          className="btn-warning px-5 py-2 rounded-md font-semibold hover:bg-yellow-700"
          title="Clear the entire linked list"
        >
          Clear List
        </button>
      </div>

      {/* Animation speed slider */}
      <div>
        <label
          htmlFor="speed"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Animation Speed: <span className="font-bold">{speed} ms</span>
        </label>
        <input
          id="speed"
          type="range"
          min={100}
          max={2000}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-indigo-600"
          aria-valuemin={100}
          aria-valuemax={2000}
          aria-valuenow={speed}
          aria-label="Animation speed"
        />
      </div>
    </div>
  );
}
