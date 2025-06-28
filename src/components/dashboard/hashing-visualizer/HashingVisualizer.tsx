"use client";

import { useState } from "react";
import HashingSidebar from "./HashingSidebar";
import HashingControlPanel from "./HashingControlPanel";
import HashTableSlot from "./HashTableSlot";

type CollisionMethod = 'linear' | 'quadratic' | 'doubleHashing' | 'chaining';
type HashMethod = "modulo" | "multiplicative" | "midSquare" | "folding";

const TABLE_SIZE = 10;

export default function HashingVisualizer() {
  const [table, setTable] = useState<(string | number)[][]>(
    () => Array.from({ length: TABLE_SIZE }, () => [])
  );
  const [message, setMessage] = useState("");
  const [probingIndices, setProbingIndices] = useState<number[]>([]);
  const [collisionMethod, setCollisionMethod] = useState<CollisionMethod>('linear');
  const [hashMethod, setHashMethod] = useState<HashMethod>('modulo');

  const hash = (key: string | number, size: number = TABLE_SIZE): number => {
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
        const parts = str.match(/.{1,2}/g) || [];
        const sum = parts.reduce((acc, part) => acc + part.split('').reduce((a, ch) => a + ch.charCodeAt(0), 0), 0);
        return sum % size;
      default:
        return keyNum % size;
    }
  };

  const secondaryHash = (key: string | number, size: number = TABLE_SIZE): number => {
    const str = key.toString();
    const keySum = Array.from(str).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const primeBelowSize = (n: number) => {
      const isPrime = (num: number) => num > 1 && Array.from({ length: num - 2 }, (_, i) => i + 2).every(x => num % x !== 0);
      for (let p = n - 1; p > 1; p--) if (isPrime(p)) return p;
      return 3;
    };
    const prime = primeBelowSize(size);
    return prime - (keySum % prime);
  };

  const getNextIndex = (key: string | number, i: number) => {
    const h = hash(key);
    if (collisionMethod === 'linear') return (h + i) % TABLE_SIZE;
    if (collisionMethod === 'quadratic') return (h + i * i) % TABLE_SIZE;
    if (collisionMethod === 'doubleHashing') return (h + i * secondaryHash(key)) % TABLE_SIZE;
    return h;
  };

  const insertKey = (key: string | number) => {
    if (collisionMethod === 'chaining') {
      const index = hash(key);
      setTable(prev => {
        const newTable = [...prev];
        newTable[index] = [...newTable[index], key];
        return newTable;
      });
      setMessage(`Key "${key}" chained at index ${index}.`);
      return;
    }

    let i = 0;
    const indices: number[] = [];
    const probe = () => {
      if (i >= TABLE_SIZE) {
        setMessage("Hash table is full.");
        setProbingIndices([]);
        return;
      }
      const index = getNextIndex(key, i);
      indices.push(index);
      setProbingIndices([...indices]);
      if (table[index].length === 0) {
        setTimeout(() => {
          setTable(prev => {
            const newTable = [...prev];
            newTable[index] = [key];
            return newTable;
          });
          setMessage(`Key "${key}" inserted at index ${index}.`);
          setProbingIndices([]);
        }, 500);
      } else {
        i++;
        setTimeout(probe, 500);
      }
    };
    probe();
  };

  const deleteKey = (key: string | number) => {
    const index = hash(key);
    if (collisionMethod === 'chaining') {
      setTable(prev => {
        const newTable = [...prev];
        newTable[index] = newTable[index].filter(k => k !== key);
        return newTable;
      });
      setMessage(`Key "${key}" deleted from chain at index ${index}.`);
      return;
    }

    let i = 0;
    const indices: number[] = [];
    const probe = () => {
      if (i >= TABLE_SIZE) {
        setMessage(`Key "${key}" not found.`);
        setProbingIndices([]);
        return;
      }
      const index = getNextIndex(key, i);
      indices.push(index);
      setProbingIndices([...indices]);
      if (table[index][0] === key) {
        setTimeout(() => {
          setTable(prev => {
            const newTable = [...prev];
            newTable[index] = [];
            return newTable;
          });
          setMessage(`Key "${key}" deleted from index ${index}.`);
          setProbingIndices([]);
        }, 500);
      } else if (table[index].length === 0) {
        setMessage(`Key "${key}" not found.`);
        setProbingIndices([]);
      } else {
        i++;
        setTimeout(probe, 500);
      }
    };
    probe();
  };

  const clearTable = () => {
    setTable(() => Array.from({ length: TABLE_SIZE }, () => []));
    setMessage("Hash table cleared.");
    setProbingIndices([]);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden">
      <div className="w-full md:flex-1 p-4 sm:p-6 max-w-7xl mx-auto">
        <HashingControlPanel
          onInsert={insertKey}
          onSearch={() => {}} // Add probing-based search later
          onDelete={deleteKey}
          onClear={clearTable}
          loadFactor={table.filter(x => x.length > 0).length / TABLE_SIZE}
          onRehash={() => {}}
          setHashMethod={method => setHashMethod(method as HashMethod)}
          setCollisionMethod={method => setCollisionMethod(method as CollisionMethod)}
        />

        <p className="mb-6 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
          Load Factor: {table.filter((x) => x.length > 0).length} / {TABLE_SIZE} = {" "}
          {(table.filter((x) => x.length > 0).length / TABLE_SIZE).toFixed(2)}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
          {table.map((keys, i) => (
            <HashTableSlot
              key={i}
              index={i}
              keys={keys}
              highlight={probingIndices.includes(i)}
              probing={false}
              collisionMethod={collisionMethod}
              onKeyClick={(key) => deleteKey(key)}
            />
          ))}
        </div>

        {message && (
          <p className="mt-6 text-center text-indigo-800 dark:text-indigo-200 font-semibold text-sm sm:text-base">
            {message}
          </p>
        )}
      </div>

      <div className="w-full md:w-72 bg-gray-200 dark:bg-gray-900 p-4 overflow-y-auto md:h-screen md:sticky md:top-0">
        <HashingSidebar />
      </div>
    </div>
  );
}
