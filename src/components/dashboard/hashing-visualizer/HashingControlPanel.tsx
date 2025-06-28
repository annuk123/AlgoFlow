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

  const trimmedKey = inputKey.trim();

  const handleInsert = () => {
    if (!trimmedKey) return;
    onInsert(trimmedKey);
    setInputKey("");
  };

  const handleSearch = () => {
    if (!trimmedKey) return;
    onSearch(trimmedKey);
    setInputKey("");
  };

  const handleDelete = () => {
    if (!trimmedKey) return;
    onDelete(trimmedKey);
    setInputKey("");
  };

  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
        Hashing Control Panel
      </h2>

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

      {/* Input + Action Buttons */}
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Enter key (number or string)"
          value={inputKey}
          onChange={handleInputChange}
          className="w-full"
        />

        <div className="flex flex-col w-full gap-4">
          {/* First Row: Insert + Search */}
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <Button className="w-full sm:w-1/2" onClick={handleInsert}>
              Insert
            </Button>
            <Button className="w-full sm:w-1/2" onClick={handleSearch} variant="outline">
              Search
            </Button>
          </div>

          {/* Second Row: Delete + Clear */}
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <Button className="w-full sm:w-1/2" onClick={handleDelete} variant="destructive">
              Delete
            </Button>
            <Button className="w-full sm:w-1/2" onClick={onClear} variant="secondary">
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Load Factor */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Load Factor</span>
          <span>{(loadFactor * 100).toFixed(0)}%</span>
        </div>
        <Progress value={loadFactor * 100} className="h-2" />
      </div>

      {/* Rehash Button */}
      <Button
        onClick={onRehash}
        disabled={loadFactor === 0}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50"
      >
        Rehash Table
      </Button>
    </motion.div>
  );
}
