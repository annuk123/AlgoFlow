"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Play, RefreshCw } from "lucide-react";
import { Array3DElement } from "./types";
// type Array3DElement = {
//   value: string;
//   id: string;
//   active?: boolean;
//   error?: boolean;
// };

// 3D array is Array<Array<Array<Element>>>
// Structure: depth (layers) x rows x columns

interface Props {
  array3D: Array3DElement[][][];
  setArray3D: React.Dispatch<React.SetStateAction<Array3DElement[][][]>>;
}
export default function Array3D({ array3D, setArray3D }: Props) {
  const [depth, setDepth] = useState(0);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [traversalMode, setTraversalMode] = useState<"layer" | "row" | "col">("layer");
  const [bulkInput, setBulkInput] = useState("");

  // Add new layer
  const addLayer = () => {
    if (rows === 0 || cols === 0) {
      alert("Set rows and columns first!");
      return;
    }
    const newLayer: Array3DElement[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({ value: "", id: crypto.randomUUID() }))
      );
    setArray3D((prev) => [...prev, newLayer]);
    setDepth((d) => d + 1);
  };

  // Add row in each layer
  const addRow = () => {
    if (depth === 0 || cols === 0) {
      alert("Add layers and set columns first!");
      return;
    }
    setArray3D((prev) =>
      prev.map((layer) => [
        ...layer,
        Array(cols)
          .fill(null)
          .map(() => ({ value: "", id: crypto.randomUUID() })),
      ])
    );
    setRows((r) => r + 1);
  };

  // Add column in each layer and row
  const addCol = () => {
    if (depth === 0 || rows === 0) {
      alert("Add layers and rows first!");
      return;
    }
    setArray3D((prev) =>
      prev.map((layer) =>
        layer.map((row) => [...row, { value: "", id: crypto.randomUUID() }])
      )
    );
    setCols((c) => c + 1);
  };

  // Update value at [d][r][c] with validation (block commas)
  const updateValue = (d: number, r: number, c: number, val: string) => {
    const error = val.includes(",");
    setArray3D((prev) =>
      prev.map((layer, di) =>
        di === d
          ? layer.map((row, ri) =>
              ri === r
                ? row.map((el, ci) =>
                    ci === c ? { ...el, value: val, error } : el
                  )
                : row
            )
          : layer
      )
    );
  };

  // Bulk upload for 3D array
  // Format:
  // layer1row1col1,layer1row1col2,...
  // layer1row2col1,...
  //
  // layer2row1col1,...
  // layer2row2col1,...
  //
  // Layers separated by double new lines
  const handleBulkUpload = () => {
    if (!bulkInput.trim()) return;
    const layersInput = bulkInput.trim().split(/\n\s*\n/); // split layers by empty lines

    const parsedArray: Array3DElement[][][] = layersInput.map((layerStr) => {
      const rowsInput = layerStr.trim().split("\n");
      const layer = rowsInput.map((rowStr) => {
        const colsInput = rowStr.split(",").map((s) => s.trim());
        return colsInput.map((val) => ({ value: val, id: crypto.randomUUID() }));
      });
      return layer;
    });

    // Normalize rows and cols for all layers
    const maxRows = Math.max(...parsedArray.map((layer) => layer.length));
    const maxCols = Math.max(
      ...parsedArray.flatMap((layer) => layer.map((row) => row.length))
    );

    // Normalize shape for each layer
    parsedArray.forEach((layer) => {
      while (layer.length < maxRows) {
        layer.push(Array(maxCols).fill(null).map(() => ({ value: "", id: crypto.randomUUID() })));
      }
      layer.forEach((row) => {
        while (row.length < maxCols) {
          row.push({ value: "", id: crypto.randomUUID() });
        }
      });
    });

    setArray3D(parsedArray);
    setDepth(parsedArray.length);
    setRows(maxRows);
    setCols(maxCols);
    setBulkInput("");
  };

  // Reset values keeping shape
  const resetValues = () => {
    setArray3D((prev) =>
      prev.map((layer) =>
        layer.map((row) =>
          row.map((el) => ({ ...el, value: "", error: false, active: false }))
        )
      )
    );
  };

  // Clear entire 3D array
  const clearArray = () => {
    setArray3D([]);
    setDepth(0);
    setRows(0);
    setCols(0);
  };

  // Animate traversal based on traversalMode
  // layer => layer by layer (traverse all elements in each layer row-wise)
  // row => row by row (all layers for each row)
  // col => column by column (all layers & rows for each column)
  const traverse = async () => {
    setIsAnimating(true);

    if (traversalMode === "layer") {
      for (let d = 0; d < depth; d++) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            setArray3D((prev) =>
              prev.map((layer, di) =>
                layer.map((row, ri) =>
                  row.map((el, ci) => ({
                    ...el,
                    active: di === d && ri === r && ci === c,
                  }))
                )
              )
            );
            await new Promise((res) => setTimeout(res, 300));
          }
        }
      }
    } else if (traversalMode === "row") {
      for (let r = 0; r < rows; r++) {
        for (let d = 0; d < depth; d++) {
          for (let c = 0; c < cols; c++) {
            setArray3D((prev) =>
              prev.map((layer, di) =>
                layer.map((row, ri) =>
                  row.map((el, ci) => ({
                    ...el,
                    active: di === d && ri === r && ci === c,
                  }))
                )
              )
            );
            await new Promise((res) => setTimeout(res, 300));
          }
        }
      }
    } else {
      // col-wise
      for (let c = 0; c < cols; c++) {
        for (let d = 0; d < depth; d++) {
          for (let r = 0; r < rows; r++) {
            setArray3D((prev) =>
              prev.map((layer, di) =>
                layer.map((row, ri) =>
                  row.map((el, ci) => ({
                    ...el,
                    active: di === d && ri === r && ci === c,
                  }))
                )
              )
            );
            await new Promise((res) => setTimeout(res, 300));
          }
        }
      }
    }

    // Clear active
    setArray3D((prev) =>
      prev.map((layer) =>
        layer.map((row) => row.map((el) => ({ ...el, active: false })))
      )
    );

    setIsAnimating(false);
  };

  // Flatten 3D array in row-major order by layers for memory visualization
  const flattenedArray = array3D.flat(2);

  return (
    <section className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="number"
          placeholder="Set depth (layers)"
          value={depth === 0 ? "" : depth.toString()}
          onChange={(e) => {
            if (isAnimating) return;
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 0) setDepth(val);
          }}
          disabled={rows > 0 || cols > 0 || isAnimating}
          className="w-32"
        />
        <Input
          type="number"
          placeholder="Set rows"
          value={rows === 0 ? "" : rows.toString()}
          onChange={(e) => {
            if (isAnimating) return;
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 0) setRows(val);
          }}
          disabled={depth > 0 || cols > 0 || isAnimating}
          className="w-28"
        />
        <Input
          type="number"
          placeholder="Set columns"
          value={cols === 0 ? "" : cols.toString()}
          onChange={(e) => {
            if (isAnimating) return;
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 0) setCols(val);
          }}
          disabled={depth > 0 || rows > 0 || isAnimating}
          className="w-28"
        />

        <Button onClick={addLayer} disabled={rows === 0 || cols === 0 || isAnimating}>
          <Plus className="w-4 h-4 mr-1" /> Add Layer
        </Button>
        <Button onClick={addRow} disabled={depth === 0 || cols === 0 || isAnimating}>
          <Plus className="w-4 h-4 mr-1" /> Add Row
        </Button>
        <Button onClick={addCol} disabled={depth === 0 || rows === 0 || isAnimating}>
          <Plus className="w-4 h-4 mr-1" /> Add Col
        </Button>

        <Button onClick={traverse} disabled={isAnimating || depth === 0 || rows === 0 || cols === 0}>
          <Play className="w-4 h-4 mr-1" /> Traverse ({traversalMode})
        </Button>

        <Button
          onClick={() => {
            setTraversalMode((prev) =>
              prev === "layer" ? "row" : prev === "row" ? "col" : "layer"
            );
          }}
          disabled={isAnimating}
          variant="outline"
        >
          Toggle Traversal Mode
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
          Bulk Upload (Layers separated by empty line, rows by new line, columns by commas)
        </label>
        <textarea
          rows={6}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm dark:text-white font-mono resize-none"
          placeholder={`Layer 1:\n1,2,3\n4,5,6\n\nLayer 2:\n7,8,9\n10,11,12`}
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

      {/* Visualize layers */}
      {array3D.length === 0 ? (
        <p className="mt-6 text-center italic text-gray-500 dark:text-gray-400">
          Add layers, rows, and columns to create a 3D array.
        </p>
      ) : (
        <div className="space-y-8 mt-6">
          {array3D.map((layer, d) => (
            <section
              key={`layer-${d}`}
              className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900"
            >
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Layer {d}
              </h3>

              <div className="overflow-auto">
                <div className="flex pl-14 gap-4 text-gray-600 dark:text-gray-400 select-none">
                  {[...Array(cols)].map((_, i) => (
                    <div key={i} className="w-14 text-center font-mono text-sm">
                      {i}
                    </div>
                  ))}
                </div>

                {layer.map((row, r) => (
                  <div key={`row-${r}`} className="flex items-center gap-4 mt-2">
                    {/* Row Index */}
                    <div className="w-14 font-mono text-sm text-gray-600 dark:text-gray-400 select-none text-center">
                      {r}
                    </div>

                    {row.map((el, c) => (
                      <motion.input
                        key={el.id}
                        type="text"
                        value={el.value}
                        disabled={isAnimating}
                        onChange={(e) => updateValue(d, r, c, e.target.value)}
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
                        aria-label={`Layer ${d} Row ${r} Column ${c} value`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Memory Layout Visualization */}
      <section className="mt-10 p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow-inner max-w-6xl mx-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Memory Layout Visualization (Row-major order by layer)
        </h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300 max-w-3xl">
          The 3D array is stored as a contiguous block in memory in row-major
          order, layer by layer. Each layer stores its rows and columns
          sequentially.
        </p>

        <div className="flex gap-2 overflow-x-auto">
          {flattenedArray.length === 0 && (
            <p className="text-gray-500 italic">Add elements to see memory blocks here.</p>
          )}
          {flattenedArray.map((el, i) => {
            // Compute 3D indices from flat index
            const dIdx = Math.floor(i / (rows * cols));
            const rem = i % (rows * cols);
            const rIdx = Math.floor(rem / cols);
            const cIdx = rem % cols;
            return (
              <div
                key={el.id}
                className={`w-16 flex flex-col items-center rounded-md shadow-md p-2
                  ${el.active ? "bg-purple-500 text-white" : "bg-purple-200 dark:bg-purple-700 text-white"}`}
              >
                <div className="text-lg font-mono font-bold">{el.value || "∅"}</div>
                <div className="mt-1 text-xs font-mono">{`0x${(2000 + i * 4)
                  .toString(16)
                  .toUpperCase()}`}</div>
                <div className="text-xs mt-1">
                  [{dIdx}, {rIdx}, {cIdx}]
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
