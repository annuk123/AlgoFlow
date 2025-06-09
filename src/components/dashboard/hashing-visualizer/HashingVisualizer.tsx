"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HashingSidebar from "./HashingSidebar";

type CollisionMethod = 'linear' | 'quadratic' | 'doubleHashing';

const TABLE_SIZE = 10;

export default function HashingVisualizer() {
  const [table, setTable] = useState<(string | number | null)[]>(Array(TABLE_SIZE).fill(null));
  const [inputKey, setInputKey] = useState("");
  const [message, setMessage] = useState("");
  const [probingIndices, setProbingIndices] = useState<number[]>([]);
  const [collisionMethod, setCollisionMethod] = useState<CollisionMethod>('linear');



  const hash = (key: string | number) => {
    if (typeof key === "number") return key % TABLE_SIZE;
    let hashVal = 0;
    for (const ch of key.toString()) {
      hashVal += ch.charCodeAt(0);
    }
    return hashVal % TABLE_SIZE;
  };

  const secondaryHash = (key: string | number) => {
    if (typeof key === "number") return 7 - (key % 7);
    let hashVal = 0;
    for (const ch of key.toString()) {
      hashVal += ch.charCodeAt(0);
    }
    return 7 - (hashVal % 7);
  };

  const getNextIndex = (key: string | number, i: number) => {
    if (collisionMethod === "linear") return (hash(key) + i) % TABLE_SIZE;
    if (collisionMethod === "quadratic") return (hash(key) + i * i) % TABLE_SIZE;
    if (collisionMethod === "doubleHashing") return (hash(key) + i * secondaryHash(key)) % TABLE_SIZE;
    return hash(key);
  };

  const insertKey = (key: string | number) => {
    let i = 0;
    const indices: number[] = [];
    while (i < TABLE_SIZE) {
      const index = getNextIndex(key, i);
      indices.push(index);
      if (table[index] === null) {
        setProbingIndices(indices);
        setTimeout(() => {
          setTable((prev) => {
            const newTable = [...prev];
            newTable[index] = key;
            return newTable;
          });
          setMessage(`Key "${key}" inserted at index ${index}.`);
          setProbingIndices([]);
        }, 1000);
        return;
      }
      i++;
    }
    setMessage("Hash table is full.");
  };

  const searchKey = (key: string | number) => {
    let i = 0;
    const indices: number[] = [];
    while (i < TABLE_SIZE) {
      const index = getNextIndex(key, i);
      indices.push(index);
      if (table[index] === key) {
        setProbingIndices(indices);
        setTimeout(() => {
          setMessage(`Key "${key}" found at index ${index}.`);
          setProbingIndices([]);
        }, 1000);
        return;
      } else if (table[index] === null) break;
      i++;
    }
    setProbingIndices(indices);
    setTimeout(() => {
      setMessage(`Key "${key}" not found.`);
      setProbingIndices([]);
    }, 1000);
  };

  const deleteKey = (key: string | number) => {
    let i = 0;
    const indices: number[] = [];
    while (i < TABLE_SIZE) {
      const index = getNextIndex(key, i);
      indices.push(index);
      if (table[index] === key) {
        setProbingIndices(indices);
        setTimeout(() => {
          setTable((prev) => {
            const newTable = [...prev];
            newTable[index] = null;
            return newTable;
          });
          setMessage(`Key "${key}" deleted from index ${index}.`);
          setProbingIndices([]);
        }, 1000);
        return;
      } else if (table[index] === null) break;
      i++;
    }
    setProbingIndices(indices);
    setTimeout(() => {
      setMessage(`Key "${key}" not found.`);
      setProbingIndices([]);
    }, 1000);
  };

  const clearTable = () => {
    setTable(Array(TABLE_SIZE).fill(null));
    setMessage("Hash table cleared.");
    setProbingIndices([]);
  };

  return (
   <div className="flex min-h-screen">
  {/* Sidebar */}
  <div className="w-64 p-2 bg-gray-200 dark:bg-gray-900">
    <HashingSidebar />
  </div>

  {/* Visualizer */}
  <div className="flex-1 px-26 max-w-6xl mx-auto">
    {/* Control Panel */}
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <input
        type="text"
        placeholder="Enter key"
        value={inputKey}
        onChange={(e) => setInputKey(e.target.value)}
        className="border p-2 rounded w-48 text-center"
      />
<select
  value={collisionMethod}
  onChange={(e) => setCollisionMethod(e.target.value as CollisionMethod)}
  className="border p-2 rounded"
>
  <option value="linear">Linear Probing</option>
  <option value="quadratic">Quadratic Probing</option>
  <option value="doubleHashing">Double Hashing</option>
</select>

      <button
        onClick={() => { if (inputKey.trim()) { insertKey(inputKey.trim()); setInputKey(""); } }}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Insert
      </button>
      <button
        onClick={() => { if (inputKey.trim()) { searchKey(inputKey.trim()); } }}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Search
      </button>
      <button
        onClick={() => { if (inputKey.trim()) { deleteKey(inputKey.trim()); setInputKey(""); } }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>
      <button
        onClick={clearTable}
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Clear
      </button>
    </div>

    {/* Load Factor */}
    <p className="mb-6 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
      Load Factor: {table.filter(x => x !== null).length} / {TABLE_SIZE} = {(table.filter(x => x !== null).length / TABLE_SIZE).toFixed(2)}
    </p>

    {/* Hash Table */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {table.map((slot, i) => {
        const isProbing = probingIndices.includes(i);
        return (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1, borderColor: isProbing ? "#f59e0b" : "#ddd" }}
            transition={{ duration: 0.5 }}
            className={`border-2 rounded p-3 min-h-[5rem] flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-800 relative`}
            style={{ borderColor: isProbing ? "#f59e0b" : undefined, boxShadow: isProbing ? "0 0 10px #f59e0b" : undefined }}
          >
            <div className="font-bold mb-1 text-indigo-700">Index {i}</div>
            <div className="flex flex-col gap-1 w-full">
              {slot === null ? (
                <p className="text-gray-400 italic text-sm text-center">Empty</p>
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-indigo-600 text-white rounded px-2 py-1 text-center"
                >
                  {slot}
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Message */}
    {message && (
      <p className="mt-6 text-center text-indigo-800 dark:text-indigo-200 font-semibold">
        {message}
      </p>
    )}
  </div>
</div>

  );
}
