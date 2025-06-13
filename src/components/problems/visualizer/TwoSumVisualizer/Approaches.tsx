"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function TwoSumApproaches() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-10">
      <h1 className="text-5xl font-bold mb-4 text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
        Optimal Approach of the Two Sum Problem
      </h1>

      {/* Problem Statement */}
      {/* <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📖 Problem Statement</h2>
        <p>
          Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers such that they add up to the target.
        </p>
      </section> */}

      {/* Constraints */}
      {/* <section className="space-y-4">
        <h2 className="text-2xl font-semibold">⚙️ Constraints</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Each input will have exactly one solution.</li>
          <li>The same element cannot be used twice.</li>
        </ul>
      </section> */}

      {/* Approach Overview */}
      <section className="space-y-4">
        {/* <h2 className="text-2xl font-semibold">🚀 Optimal Approach of the problem: Hash Map</h2> */}

        <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">Why Hash Map is the Best?</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Single Pass:</strong> It solves the problem in one iteration over the array.</li>
          <li><strong>O(1) Lookups:</strong> Complements can be checked instantly using the hash map.</li>
          <li><strong>Space-Time Efficiency:</strong> Achieves O(n) time and O(n) space with minimal overhead.</li>
        </ul>
      </section>

      {/* Step-by-Step */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent"> Step-by-Step Solution</h3>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Initialize a Hash Map:</strong> Store each number and its index for quick future access.
            <SyntaxHighlighter
              language="javascript"
              style={dracula}
              showLineNumbers={false}
            >
              {`// Hash Map Structure\n{ number: index }`}
            </SyntaxHighlighter>
          </li>

          <li>
            <strong>Traverse the Array:</strong> For each element, compute the required complement.
<SyntaxHighlighter
  language="javascript"
  style={dracula}
  showLineNumbers={false}
>
  {`const complement = target - nums[i];`}
</SyntaxHighlighter>

          </li>

          <li>
            <strong>Check and Store:</strong>
            <SyntaxHighlighter
              language="javascript"
              style={dracula}
              showLineNumbers={false}
            >
              {`const complement = target - nums[i];`}
            </SyntaxHighlighter>

          </li>

          <li>
            <strong>Check and Store:</strong>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>If the complement exists in the map, return both indices.</li>
              <li>Otherwise, store the current number and its index in the map for future lookups.</li>
            </ul>
          </li>

          <li>
            <strong>Guaranteed Solution:</strong> The problem ensures that a valid pair exists, so the process will always succeed.
          </li>
        </ol>
      </section>

      {/* Dry Run */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent"> Dry Run Example</h2>
<SyntaxHighlighter
  language="javascript"
  style={dracula}
  showLineNumbers={false}
>
  {`Input: nums = [2, 7, 11, 15], target = 9

Step 1: Initialize map: {}

Step 2: i = 0, nums[i] = 2
    complement = 9 - 2 = 7
    7 not in map -> add {2: 0}

Step 3: i = 1, nums[i] = 7
    complement = 9 - 7 = 2
    2 is in map -> return [0, 1]

//  Answer: Indices [0, 1]`}
</SyntaxHighlighter>
      </section>

      {/* Time and Space Complexity */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent"> Complexity Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold"> Time Complexity</h3>
            <p><strong>O(n)</strong> — Single pass through the array.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold"> Space Complexity</h3>
            <p><strong>O(n)</strong> — At most, all elements are stored in the map.</p>
          </div>
        </div>
      </section>

      {/* Comparison with Other Approaches */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">Comparison with Other Approaches</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">1. Brute Force (Nested Loops)</h3>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li><strong>Time:</strong> O(n²)</li>
            <li><strong>Space:</strong> O(1)</li>
            <li><strong>Drawback:</strong> Inefficient for large arrays due to double iteration.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">2. Two-Pointer (Sorted Array)</h3>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li><strong>Time:</strong> O(n log n) (due to sorting)</li>
            <li><strong>Space:</strong> O(1)</li>
            <li><strong>Drawback:</strong> Requires sorting and cannot return original indices directly without extra tracking.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">3. Hash Map (Optimal)</h3>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li><strong>Time:</strong> O(n)</li>
            <li><strong>Space:</strong> O(n)</li>
            <li><strong>Advantage:</strong> Fast, direct, one-pass solution with constant-time lookups.</li>
          </ul>
        </div>
      </section>

      {/* Key Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent"> Advanced Notes</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Hash Maps provide an elegant balance between speed and simplicity in lookup-based problems.</li>
          <li>Always check constraints to see if input guarantees a unique solution — this can save additional checks in your code.</li>
          <li>When the array is sorted, the Two-Pointer method can be useful in some variations of this problem.</li>
          <li>This pattern is part of the &quot;Hashing Technique&quot; and commonly used in similar problems like subarray sums and pair sums.</li>
        </ul>
      </section>
    </div>
  );
}
