"use client";

import { useState } from "react";
import HashingSidebar from "./HashingSidebar";
import HashingControlPanel from "./HashingControlPanel";
import HashTableSlot from "./HashTableSlot";

type CollisionMethod = 'linear' | 'quadratic' | 'doubleHashing';
type HashMethod = "modulo" | "multiplicative" | "midSquare" | "folding";


const TABLE_SIZE = 10;
// const MIN_TABLE_SIZE = 7;

export default function HashingVisualizer() {
  const [table, setTable] = useState<(string | number | null)[]>(Array(TABLE_SIZE).fill(null));
  const [message, setMessage] = useState("");
  const [probingIndices, setProbingIndices] = useState<number[]>([]);
  const [collisionMethod, setCollisionMethod] = useState<CollisionMethod>('linear');
  const [hashMethod, setHashMethod] = useState<'modulo' | 'multiplicative' | 'midSquare' | 'folding'>('modulo');
const [elementCount, setElementCount] = useState(0);
const [loadFactor, setLoadFactor] = useState(0);


const hash = (key: string | number, size: number = table.length): number => {
  const str = key.toString();
  const keyNum = typeof key === 'number' ? key : Array.from(str).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  switch (hashMethod) {
    case 'modulo':
      return keyNum % size;

    case 'multiplicative':
      const A = 0.6180339887;
      return Math.floor(size * ((keyNum * A) % 1));

    case 'midSquare':
      const squared = keyNum * keyNum;
      return Math.floor((squared / 100)) % size;

    case 'folding':
      let sum = 0;
      const parts = str.match(/.{1,2}/g) || [];
      for (const part of parts) {
        sum += part.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      }
      return sum % size;

    default:
      return keyNum % size;
  }
};



const secondaryHash = (key: string | number, size: number = table.length): number => {
  const str = key.toString();
  const keySum = Array.from(str).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  // Use a smaller prime less than table size for better double hashing
  const primeBelowSize = (n: number) => {
    const isPrime = (num: number) =>
      num > 1 && Array.from({ length: num - 2 }, (_, i) => i + 2).every(x => num % x !== 0);

    for (let p = n - 1; p > 1; p--) {
      if (isPrime(p)) return p;
    }
    return 3;
  };

  const prime = primeBelowSize(size);
  return prime - (keySum % prime);
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
  while (i < table.length) {
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

        setElementCount(prev => {
          const updated = prev + 1;
          const newLoad = updated / table.length;
          setLoadFactor(newLoad);

          if (newLoad > 0.75) {
            setTimeout(() => rehashTable(table.length * 2), 800);
          }

          return updated;
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
  while (i < table.length) {
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

        setElementCount(prev => {
          const updated = prev - 1;
          const newLoad = updated / table.length;
          setLoadFactor(newLoad);

          if (newLoad < 0.25 && table.length > TABLE_SIZE) {
            setTimeout(() => rehashTable(Math.max(TABLE_SIZE, Math.floor(table.length / 2))), 800);
          }

          return updated;
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

function rehashTable(newSize: number): void {
  const oldTable = [...table];
  const newTable: (string | number | null)[] = Array(newSize).fill(null);

  const newSecondaryHash = (key: string | number) => {
    let hashVal = 0;
    for (const ch of key.toString()) {
      hashVal += ch.charCodeAt(0);
    }
    const prime = 7; // optionally compute dynamic prime below newSize
    return prime - (hashVal % prime);
  };

  const getNewNextIndex = (key: string | number, i: number) => {
    const baseHash = hash(key, newSize);
    if (collisionMethod === "linear") return (baseHash + i) % newSize;
    if (collisionMethod === "quadratic") return (baseHash + i * i) % newSize;
    if (collisionMethod === "doubleHashing") return (baseHash + i * newSecondaryHash(key)) % newSize;
    return baseHash;
  };

  let count = 0;
  for (const key of oldTable) {
    if (key !== null) {
      let i = 0;
      while (i < newSize) {
        const idx = getNewNextIndex(key, i);
        if (newTable[idx] === null) {
          newTable[idx] = key;
          count++;
          break;
        }
        i++;
      }
    }
  }

  setTable(newTable);
  setElementCount(count);
  setLoadFactor(count / newSize);
  setMessage(`Rehashed table to new size ${newSize}.`);
  setProbingIndices([]);
}


  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden">
      {/* Main Visualizer */}
      <div className="w-full md:flex-1 overflow-x-auto p-4 sm:p-6 max-w-7xl mx-auto">
        
        {/* Control Panel */}

{(() => {
  const nonEmptyCount = table.filter((x) => x !== null).length;
  const loadFactor = nonEmptyCount / table.length;

  return (
    <HashingControlPanel
      onInsert={insertKey}
      onSearch={searchKey}
      onDelete={deleteKey}
      onClear={clearTable}
      loadFactor={loadFactor}
      onRehash={() => rehashTable(table.length * 2)} 
      setHashMethod={(method: string) => setHashMethod(method as HashMethod)}
      setCollisionMethod={(method: string) => setCollisionMethod(method as CollisionMethod)}
    />
  );
})()}


{/** Load Factor */}
{(() => {
  const filled = table.filter((x) => x !== null).length;
  const load = (filled / table.length).toFixed(2);

  return (
    <p className="mb-6 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
      📊 Load Factor: {filled} / {table.length} = <span className="text-blue-600 dark:text-blue-400">{load}</span>
    </p>
  );
})()}

  <p className="text-sm text-gray-400 mt-2">
     Load Factor: {(loadFactor * 100).toFixed(2)}% |  Table Size: {table.length} |  Elements: {elementCount}
  </p>

    {/* Hash Table Display */}
<div className="flex flex-col md:flex-row w-full min-h-screen">
  {/* Main Visualizer Section */}
  <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto">
    {/* Your control panel, grid, and message here */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
  {table.map((value, i) => (
    <HashTableSlot
      key={i}
      index={i}
      keys={value !== null ? [value] : []}
      highlight={probingIndices.includes(i)}
      probing={false} // You can manage currentProbing state if needed
      collisionMethod={collisionMethod}
      onKeyClick={(key) => deleteKey(key)}
    />
  ))}
</div>
    {/* Message */}
    {message && (
      <p className="mt-6 text-center text-indigo-800 dark:text-indigo-200 font-semibold text-sm sm:text-base">
        {message}
      </p>
    )}
  </div>

  {/* Sidebar */}
  <div className="w-full md:w-72 lg:w-100 bg-gray-200 dark:bg-gray-900 p-4 overflow-y-auto md:h-screen md:sticky md:top-0 lg:top-0  ">
    <HashingSidebar />
  </div>
</div>
</div>
</div>

  );
}