"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Play, RefreshCw } from "lucide-react";
import { Array2DElement } from "./types";
// type Array2DElement = {
//   value: string; // Now string to allow floats & strings
//   id: string;
//   active?: boolean;
//   error?: boolean;
// };

interface Props {
  array2D: Array2DElement[][];
  setArray2D: React.Dispatch<React.SetStateAction<Array2DElement[][]>>;
}

export default function Array2D({ array2D, setArray2D }: Props) {
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [traversalMode, setTraversalMode] = useState<"row" | "col">("row");
  const [bulkInput, setBulkInput] = useState("");

  // Add row of empty cells
  const addRow = () => {
    if (cols === 0) {
      alert("Set columns first!");
      return;
    }
    const newRow: Array2DElement[] = Array(cols)
      .fill(null)
      .map(() => ({ value: "", id: crypto.randomUUID() }));
    setArray2D((prev) => [...prev, newRow]);
    setRows((r) => r + 1);
  };

  // Add a column
  const addCol = () => {
    if (rows === 0) {
      alert("Add rows first!");
      return;
    }
    setArray2D((prev) =>
      prev.map((row) => [...row, { value: "", id: crypto.randomUUID() }])
    );
    setCols((c) => c + 1);
  };

  // Update cell value with validation (allow numbers, floats, strings)
  const updateValue = (r: number, c: number, val: string) => {
    // Simple validation: non-empty and no commas (to avoid CSV conflict)
    const error = val.includes(",");
    setArray2D((prev) =>
      prev.map((row, ri) =>
        ri === r
          ? row.map((el, ci) =>
              ci === c ? { ...el, value: val, error } : el
            )
          : row
      )
    );
  };

  // Bulk upload parsing CSV-like input (comma or newline separated)
  const handleBulkUpload = () => {
    if (!bulkInput.trim()) return;
    const rowsInput = bulkInput.trim().split("\n");
    const parsedArray: Array2DElement[][] = rowsInput.map((rowStr) => {
      const cells = rowStr.split(",").map((s) => s.trim());
      return cells.map((val) => ({ value: val, id: crypto.randomUUID() }));
    });

    // Determine max cols (normalize all rows)
    const maxCols = Math.max(...parsedArray.map((r) => r.length));
    parsedArray.forEach((r) => {
      while (r.length < maxCols) {
        r.push({ value: "", id: crypto.randomUUID() });
      }
    });

    setArray2D(parsedArray);
    setRows(parsedArray.length);
    setCols(maxCols);
    setBulkInput("");
  };

  // Reset values to empty string but keep shape
  const resetValues = () => {
    setArray2D((prev) =>
      prev.map((row) => row.map((el) => ({ ...el, value: "", error: false, active: false })))
    );
  };

  // Clear entire array
  const clearArray = () => {
    setArray2D([]);
    setRows(0);
    setCols(0);
  };

  // Traverse row-wise or column-wise with animation
  const traverse = async () => {
    setIsAnimating(true);

    if (traversalMode === "row") {
      for (let r = 0; r < array2D.length; r++) {
        for (let c = 0; c < array2D[r].length; c++) {
          setArray2D((prev) =>
            prev.map((row, ri) =>
              row.map((el, ci) => ({ ...el, active: ri === r && ci === c }))
            )
          );
          await new Promise((res) => setTimeout(res, 400));
        }
      }
    } else {
      // column-wise
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          setArray2D((prev) =>
            prev.map((row, ri) =>
              row.map((el, ci) => ({ ...el, active: ri === r && ci === c }))
            )
          );
          await new Promise((res) => setTimeout(res, 400));
        }
      }
    }

    setArray2D((prev) =>
      prev.map((row) =>
        row.map((el) => ({ ...el, active: false }))
      )
    );

    setIsAnimating(false);
  };

  // Flatten 2D array in row-major order for memory visualization
  const flattenedArray = array2D.flat();

  return (
    <section className="p-4 space-y-6 max-w-5xl mx-auto">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="number"
          placeholder="Set columns"
          value={cols === 0 ? "" : cols.toString()}
          onChange={(e) => {
            if (isAnimating) return;
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 0) setCols(val);
          }}
          disabled={rows > 0 || isAnimating}
          className="w-28"
        />
        <Button onClick={addRow} disabled={cols === 0 || isAnimating}>
          <Plus className="w-4 h-4 mr-1" /> Add Row
        </Button>
        <Button onClick={addCol} disabled={rows === 0 || isAnimating}>
          <Plus className="w-4 h-4 mr-1" /> Add Col
        </Button>

        <Button
          onClick={traverse}
          disabled={isAnimating || rows === 0 || cols === 0}
        >
          <Play className="w-4 h-4 mr-1" /> Traverse {traversalMode === "row" ? "Row-wise" : "Column-wise"}
        </Button>

        <Button
          onClick={() =>
            setTraversalMode(traversalMode === "row" ? "col" : "row")
          }
          disabled={isAnimating}
          variant="outline"
        >
          Toggle {traversalMode === "row" ? "Column-wise" : "Row-wise"}
        </Button>

        <Button onClick={resetValues} disabled={isAnimating} variant="secondary">
          <RefreshCw className="w-4 h-4 mr-1" /> Reset Values
        </Button>

        <Button onClick={clearArray} disabled={isAnimating} variant="destructive">
          <Trash2 className="w-4 h-4 mr-1" /> Clear Array
        </Button>
      </div>

      {/* Bulk Upload */}
      <div className="mt-4">
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
          Bulk Upload (CSV style - rows separated by new line, cols by commas)
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm dark:text-white font-mono resize-none"
          placeholder={`e.g.\n1, 2, 3\n4, 5, 6\n7, 8, 9`}
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          disabled={isAnimating}
        />
        <Button
          className="mt-2"
          onClick={handleBulkUpload}
          disabled={isAnimating || !bulkInput.trim()}
        >
          Upload
        </Button>
      </div>

      {/* Array Grid */}
      <div className="overflow-auto mt-6 border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
        {/* Column Index */}
        <div className="flex pl-14 gap-4 text-gray-600 dark:text-gray-400 select-none">
          {[...Array(cols)].map((_, i) => (
            <div key={i} className="w-14 text-center font-mono text-sm">
              {i}
            </div>
          ))}
        </div>

        {array2D.length === 0 && (
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-center italic">
            Add columns and rows to create the 2D array.
          </p>
        )}

        {/* Rows */}
        {array2D.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-4 mt-2">
            {/* Row Index */}
            <div className="w-14 font-mono text-sm text-gray-600 dark:text-gray-400 select-none text-center">
              {rIdx}
            </div>

            {/* Cells */}
            {row.map((el, cIdx) => (
              <motion.input
                key={el.id}
                type="text"
                value={el.value}
                disabled={isAnimating}
                onChange={(e) => updateValue(rIdx, cIdx, e.target.value)}
                className={`w-14 h-14 text-center rounded-md border
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  dark:bg-gray-800 dark:text-white
                  ${
                    el.active
                      ? "bg-purple-600 text-white border-purple-600"
                      : el.error
                      ? "border-red-500 bg-red-100 text-red-700"
                      : "bg-gray-100 border-gray-300 dark:border-gray-700"
                  }
                `}
                whileFocus={{ scale: 1.05 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                spellCheck={false}
                aria-label={`Row ${rIdx} Column ${cIdx} value`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Memory Layout Visualization */}
      <section className="mt-10 p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow-inner max-w-5xl mx-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Memory Layout Visualization (Row-major order)
        </h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300 max-w-3xl">
          The 2D array is stored in memory as a contiguous block in{" "}
          <b>row-major order</b>. That means elements are stored row by row,
          flattening the 2D structure into a 1D sequence.
        </p>

        <div className="flex gap-2 overflow-x-auto">
          {flattenedArray.length === 0 && (
            <p className="text-gray-500 italic">
              Add elements to see memory blocks here.
            </p>
          )}
          {flattenedArray.map((el, i) => (
            <div
              key={el.id}
              className={`w-16 flex flex-col items-center rounded-md shadow-md p-2
              ${el.active ? "bg-purple-500 text-white" : "bg-purple-200 dark:bg-purple-700 text-white"}`}
            >
              <div className="text-lg font-mono font-bold">{el.value || "∅"}</div>
              <div className="mt-1 text-xs font-mono">
                {/* Fake hex memory address */}
                {`0x${(1000 + i * 4).toString(16).toUpperCase()}`}
              </div>
              <div className="text-xs mt-1">[{Math.floor(i / cols)}, {i % cols}]</div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
