import ProblemApproach from "./ProblemApproach/problemApproach";

export default function RomanToIntegerApproach() {
  const romanToIntegerApproach = {
    title: "Optimal Approach for Roman to Integer Conversion",
    overview: [
      "This problem is optimally solved using a Hash Map to map Roman numerals to their integer values.",
      "We traverse the string from right to left to handle subtractive notations naturally.",
      "The solution is highly efficient: O(n) time and O(1) space complexity.",
    ],
    concepts: [
      {
        title: "Hash Map (Dictionary)",
        definition:
          "A data structure that maps unique keys to values with average O(1) lookup time. Here, Roman numerals are keys and their integer values are the values.",
      },
      {
        title: "Right-to-Left Traversal",
        definition:
          "Iterating from the end of the string to the beginning simplifies the subtraction rule in Roman numerals, where a smaller numeral before a larger numeral indicates subtraction.",
      },
    ],
    steps: [
      {
        title: "Step 1: Define Roman to Integer Mapping",
        description:
          "Create a hash map (or dictionary) to map Roman numeral characters to their respective integer values.",
        code: `const romanMap = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };`,
      },
      {
        title: "Step 2: Initialize Total and Previous Value",
        description:
          "Set total to 0 and prevValue to 0. We use prevValue to track the last processed Roman numeral's value.",
        code: `let total = 0;\nlet prevValue = 0;`,
      },
      {
        title: "Step 3: Traverse the Roman String from Right to Left",
        description:
          "Loop through the string in reverse. For each character, get its value from the map and decide whether to add or subtract it based on its relation to the previous value.",
        code: `for (let i = s.length - 1; i >= 0; i--) {\n  const currentValue = romanMap[s[i]];\n\n  if (currentValue < prevValue) {\n    total -= currentValue;\n  } else {\n    total += currentValue;\n  }\n\n  prevValue = currentValue;\n}`,
      },
      {
        title: "Step 4: Return the Result",
        description:
          "After processing all characters, return the accumulated total which represents the integer value.",
        code: `return total;`,
      },
    ],
    dryRun: `Example: s = "MCMXCIV"

Step 1: Initialize -> total = 0, prevValue = 0

Step 2: Start from the right:
- 'V' = 5 -> Add -> total = 5
- 'I' = 1 -> Subtract -> total = 4
- 'C' = 100 -> Add -> total = 104
- 'X' = 10 -> Subtract -> total = 94
- 'M' = 1000 -> Add -> total = 1094
- 'C' = 100 -> Subtract -> total = 994
- 'M' = 1000 -> Add -> total = 1994

Final Answer: 1994`,
    complexities: {
      time: "O(n) — We process each character exactly once.",
      space: "O(1) — Fixed hash map size and constant extra variables.",
    },
    comparisons: [
      {
        title: "Brute Force (Left-to-Right with Complex Conditions)",
        time: "O(n)",
        space: "O(1)",
        notes: [
          "Less clean because it requires look-ahead and edge case handling for subtractive notations.",
        ],
      },
      {
        title: "Right-to-Left Traversal with Hash Map (Optimal)",
        time: "O(n)",
        space: "O(1)",
        notes: [
          "Best solution: naturally handles subtraction without complex branching.",
          "Efficient and easy to understand.",
        ],
      },
    ],
    notes: [
      "Traversing from right to left simplifies subtractive Roman numeral cases.",
      "Hash map lookups provide constant-time access to numeral values.",
      "This problem is a classic example of clean pattern recognition in string parsing problems.",
      "Edge Case: An empty string should return 0, but valid Roman numerals are expected as input.",
    ],
  };

  return <ProblemApproach approach={romanToIntegerApproach} />;
}
