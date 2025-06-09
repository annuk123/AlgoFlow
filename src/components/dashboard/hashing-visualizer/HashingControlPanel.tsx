"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface HashingControlPanelProps {
  onInsert: (key: number | string) => void;
  onSearch: (key: number | string) => void;
  onDelete: (key: number | string) => void;
  onClear: () => void;
  loadFactor: number;
  onRehash: () => void;
  setHashMethod: (method: string) => void;
  setCollisionMethod: (method: string) => void;
}

export default function HashingControlPanel({
  onInsert,
  onSearch,
  onDelete,
  onClear,
  loadFactor,
  onRehash,
  setHashMethod,
  setCollisionMethod,
}: HashingControlPanelProps) {
  const [inputKey, setInputKey] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKey(e.target.value);
  };

  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">Hashing Control Panel</h2>

      {/* Hash Function Selection */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-300">Hash Function</label>
        <Select onValueChange={setHashMethod} defaultValue="modulo">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Hash Function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modulo">Modulo Hashing</SelectItem>
            <SelectItem value="multiplicative">Multiplicative Hashing</SelectItem>
            <SelectItem value="midSquare">Mid-Square Method</SelectItem>
            <SelectItem value="folding">Folding Method</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Collision Resolution Selection */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-300">Collision Resolution</label>
        <Select onValueChange={setCollisionMethod} defaultValue="linear">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Collision Strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear Probing</SelectItem>
            <SelectItem value="quadratic">Quadratic Probing</SelectItem>
            <SelectItem value="doubleHashing">Double Hashing</SelectItem>
            <SelectItem value="chaining">Chaining</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Insert, Search, Delete */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          type="text"
          placeholder="Enter key (number or string)"
          value={inputKey}
          onChange={handleInputChange}
          className="flex-1"
        />
        <Button onClick={() => { onInsert(inputKey); setInputKey(""); }}>
          Insert
        </Button>
        <Button onClick={() => { onSearch(inputKey); setInputKey(""); }} variant="outline">
          Search
        </Button>
        <Button onClick={() => { onDelete(inputKey); setInputKey(""); }} variant="destructive">
          Delete
        </Button>
      </div>

      {/* Load Factor */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Load Factor</span>
          <span>{(loadFactor * 100).toFixed(0)}%</span>
        </div>
        <Progress value={loadFactor * 100} className="h-2" />
      </div>

      {/* Rehash and Clear */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={onRehash} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
          Rehash Table
        </Button>
        <Button onClick={onClear} className="w-full bg-red-500 hover:bg-red-600 text-white">
          Clear Hash Table
        </Button>
      </div>
    </motion.div>
  );
}
