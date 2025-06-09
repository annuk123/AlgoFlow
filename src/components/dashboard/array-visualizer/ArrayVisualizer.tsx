"use client";
// import type { ArrayElement as OneDArrayElement } from "./Array1D";
import React, { useState, useEffect } from "react";
import { ControlPanel } from "./ControlPanel";
import Array1D from "./Array1D";
import Array2D from "./Array2D";
import Array3D from "./Array3D";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
type DimensionType = "1D" | "2D" | "3D";
import type { ArrayElement, Array2DElement, Array3DElement  } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import ArraySidebar from "./sidebar"; // Your array concept sidebar
import { useCallback } from "react";


export default function ArrayVisualizer() {
  const [dimension, setDimension] = useState<DimensionType>("1D");

  const [depth, setDepth] = useState(1); // For 3D
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

//   const [array1D, setArray1D] = useState<ArrayElement[]>([]);
// 1D array: numbers
const [array1D, setArray1D] = useState<ArrayElement[]>(() =>
  Array(rows).fill(null).map(() => ({
    value: 0,
    id: crypto.randomUUID(),
    active: false,
  }))
);

// 2D array: strings
const [array2D, setArray2D] = useState<Array2DElement[][]>(() =>
  Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => ({
      value: "0",
      id: crypto.randomUUID(),
      active: false,
      error: false,
    }))
  )
);

// 3D array: strings
const [array3D, setArray3D] = useState<Array3DElement[][][]>(() =>
  Array(depth).fill(null).map(() =>
    Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        value: "0",
        id: crypto.randomUUID(),
        active: false,
        error: false,
      }))
    )
  )
);
  const createElement = (val: string | number = 0): ArrayElement => ({
    value: typeof val === "number" ? val : Number(val),
    id: crypto.randomUUID(),
  });

const updateArraySizes = useCallback(() => {
  if (dimension === "1D") {
    setArray1D(Array(rows).fill(null).map(() => createElement("0")));
  } else if (dimension === "2D") {
    setArray2D(
      Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(null).map(() => createElement("0")))
    );
  } else {
    setArray3D(
      Array(depth)
        .fill(null)
        .map(() =>
          Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(null).map(() => createElement("0")))
        )
    );
  }
}, [dimension, depth, rows, cols]);

useEffect(() => {
  updateArraySizes();
}, [updateArraySizes]);

  const handleBulkUpload = (data: string) => {
    if (dimension === "1D") {
      const arr = data
        .split(/[\s,]+/)
        .filter((el) => el !== "")
        .map(createElement);
      setArray1D(arr);
      setRows(arr.length);
    } else if (dimension === "2D") {
      const lines = data.split("\n").filter(Boolean);
      const arr2d = lines.map((line) =>
        line.trim().split(/[\s,]+/).filter(Boolean).map(createElement)
      );
      setRows(arr2d.length);
      setCols(arr2d[0]?.length || 0);
      setArray2D(arr2d);
    } else if (dimension === "3D") {
      const layersRaw = data.split(/\n\s*\n/).filter(Boolean);
      const arr3d = layersRaw.map((layer) =>
        layer
          .split("\n")
          .filter(Boolean)
          .map((line) =>
            line.trim().split(/[\s,]+/).filter(Boolean).map(createElement)
          )
      );
      setDepth(arr3d.length);
      setRows(arr3d[0]?.length || 0);
      setCols(arr3d[0]?.[0]?.length || 0);
      setArray3D(arr3d);
    }
  };

  return (
    <main className="flex flex-col md:flex-row gap-6 p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      
       <div className="w-full md:w-80">
        <ArraySidebar />
      </div>
       <div className="flex-1 space-y-8">
      {/* Dimension Selector */}
     <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Select Array Dimension:</h2>
        <RadioGroup
          value={dimension}
          onValueChange={(val) => setDimension(val as DimensionType)}
          className="flex space-x-4"
          aria-label="Select array dimension"
        >
          <RadioGroupItem value="1D" id="1d" />
          <label htmlFor="1d" className="cursor-pointer select-none">1D</label>

          <RadioGroupItem value="2D" id="2d" />
          <label htmlFor="2d" className="cursor-pointer select-none">2D</label>

          <RadioGroupItem value="3D" id="3d" />
          <label htmlFor="3d" className="cursor-pointer select-none">3D</label>
        </RadioGroup>
      </div>

      {/* Control Panel */}
      <ControlPanel
        depth={depth}
        rows={rows}
        cols={cols}
        isAnimating={false}
        onSetDepth={(val) => val >= 1 && setDepth(val)}
        onSetRows={(val) => val >= 1 && setRows(val)}
        onSetCols={(val) => val >= 1 && setCols(val)}
        onAddLayer={() => setDepth((d) => d + 1)}
        onAddRow={() => setRows((r) => r + 1)}
        onAddCol={() => setCols((c) => c + 1)}
        onReset={updateArraySizes}
        onClear={() => {
          if (dimension === "1D") {
            setArray1D(Array(rows).fill(null).map(() => createElement("0")));
          } else if (dimension === "2D") {
            setArray2D(
              Array(rows)
                .fill(null)
                .map(() => Array(cols).fill(null).map(() => createElement("0")))
            );
          } else {
            setArray3D(
              Array(depth)
                .fill(null)
                .map(() =>
                  Array(rows)
                    .fill(null)
                    .map(() =>
                      Array(cols)
                        .fill(null)
                        .map(() => createElement("0"))
                    )
                )
            );
          }
        }}
        onToggleTraversalMode={() => {}}
        traversalMode="row"
        onBulkUpload={handleBulkUpload}
        disableDepthInput={dimension !== "3D"}
        disableAddLayerBtn={dimension !== "3D"}
        disableAddColBtn={dimension === "1D"}
      />
      </div>

      {/* Visualizer Section */}

      <AnimatePresence mode="wait">
  <motion.section
    key={dimension}
    className="border rounded-md p-4 bg-white dark:bg-gray-800"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-xl font-semibold mb-4">
      {dimension} Array Visualizer
    </h2>
    <p className="text-sm text-gray-500 mb-4">
      Visualize and interact with {dimension} arrays using the controls above.
    </p>
    {dimension === "1D" && <Array1D array={array1D} setArray={setArray1D} />}
    {dimension === "2D" && <Array2D array2D={array2D} setArray2D={setArray2D} />}
    {dimension === "3D" && <Array3D array3D={array3D} setArray3D={setArray3D} />}
  </motion.section>
</AnimatePresence>
      </div>

    </main>
  );
}
