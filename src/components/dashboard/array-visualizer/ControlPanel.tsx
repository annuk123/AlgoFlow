"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCcw, Trash2, Shuffle } from "lucide-react";

interface ControlPanelProps {
  depth: number;
  rows: number;
  cols: number;
  isAnimating: boolean;

  onSetDepth: (val: number) => void;
  onSetRows: (val: number) => void;
  onSetCols: (val: number) => void;

  onAddLayer?: () => void;
  onAddRow: () => void;
  onAddCol: () => void;

  onReset: () => void;
  onClear: () => void;

  onToggleTraversalMode: () => void;
  traversalMode: "layer" | "row" | "col";

  onBulkUpload: (data: string) => void;
  disableDepthInput?: boolean;
  disableRowInput?: boolean;
  disableColInput?: boolean;
  disableAddLayerBtn?: boolean;
  disableAddRowBtn?: boolean;
  disableAddColBtn?: boolean;
}

export function ControlPanel({
  depth,
  rows,
  cols,
  isAnimating,

  onSetDepth,
  onSetRows,
  onSetCols,

  onAddLayer,
  onAddRow,
  onAddCol,

  onReset,
  onClear,

  onToggleTraversalMode,
  traversalMode,

  onBulkUpload,

  disableDepthInput,
  disableRowInput,
  disableColInput,
  disableAddLayerBtn,
  disableAddRowBtn,
  disableAddColBtn,
}: ControlPanelProps) {
  const [bulkText, setBulkText] = useState("");

  // handle bulk upload input change
  const handleBulkChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBulkText(e.target.value);
  };

  // trigger bulk upload parse on button click
  const handleBulkUpload = () => {
    if (bulkText.trim() !== "") {
      onBulkUpload(bulkText.trim());
      setBulkText("");
    }
  };

  return (
    <section className="p-4 bg-background rounded-md shadow-md max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Array Visualizer&apos;s Control Panel</h1>
      <p className="text-sm text-gray-500 mb-4">
        Use this control panel to manage the dimensions of your array, add new
        layers, rows, or columns, and upload bulk data.
      </p>
      {/* Dimension Selector */}
      {/* Dimension Inputs and Add Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">Array Dimensions</h2>
        {onSetDepth !== undefined && (
          <Input
            type="number"
            placeholder="Depth (layers)"
            value={depth === 0 ? "" : depth.toString()}
            min={0}
            disabled={disableDepthInput || isAnimating}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val) && val >= 0) onSetDepth(val);
            }}
            className="w-32"
            aria-label="Set depth (layers)"
          />
        )}

        <Input
          type="number"
          placeholder="Rows"
          value={rows === 0 ? "" : rows.toString()}
          min={0}
          disabled={disableRowInput || isAnimating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val) && val >= 0) onSetRows(val);
          }}
          className="w-28"
          aria-label="Set rows"
        />

        <Input
          type="number"
          placeholder="Columns"
          value={cols === 0 ? "" : cols.toString()}
          min={0}
          disabled={disableColInput || isAnimating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val) && val >= 0) onSetCols(val);
          }}
          className="w-28"
          aria-label="Set columns"
        />

        {/* Add buttons */}
        {onAddLayer && (
          <Button
            onClick={onAddLayer}
            disabled={disableAddLayerBtn || isAnimating}
            className="flex items-center"
            aria-label="Add Layer"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Layer
          </Button>
        )}

        <Button
          onClick={onAddRow}
          disabled={disableAddRowBtn || isAnimating}
          className="flex items-center"
          aria-label="Add Row"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Row
        </Button>

        <Button
          onClick={onAddCol}
          disabled={disableAddColBtn || isAnimating}
          className="flex items-center"
          aria-label="Add Column"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Column
        </Button>
      </div>

      {/* Reset, Clear, and Traversal Mode Toggle Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onReset}
          disabled={isAnimating}
          aria-label="Reset Array"
          className="flex items-center"
        >
          <RefreshCcw className="w-4 h-4 mr-1" /> Reset
        </Button>

        <Button
          variant="destructive"
          onClick={onClear}
          disabled={isAnimating}
          aria-label="Clear Array"
          className="flex items-center"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Clear
        </Button>

        <Button
          variant="secondary"
          onClick={onToggleTraversalMode}
          disabled={isAnimating}
          aria-label="Toggle Traversal Mode"
          className="flex items-center"
        >
          <Shuffle className="w-4 h-4 mr-1" /> Traversal: {traversalMode}
        </Button>
      </div>

      {/* Bulk Upload Input */}
      <div>
        <label
          htmlFor="bulk-upload-text"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Bulk Upload Array Data (comma or space separated)
        </label>
        <textarea
          id="bulk-upload-text"
          value={bulkText}
          onChange={handleBulkChange}
          rows={3}
          disabled={isAnimating}
          placeholder={`Example:\n1 2 3 4\n5 6 7 8\n9 10 11 12`}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
          aria-label="Bulk Upload Array Data"
        />
        <Button
          onClick={handleBulkUpload}
          disabled={isAnimating || bulkText.trim() === ""}
          className="mt-2"
          aria-label="Upload Bulk Data"
        >
          Upload Data
        </Button>
      </div>
    </section>
  );
}
