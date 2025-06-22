import ProblemApproach from "./ProblemApproach/problemApproach";

export default function LetterCombinationsApproach() {
  const letterCombinationsApproach = {
    title: "Optimal Approach for Letter Combinations of a Phone Number using Backtracking",
    overview: [
      "The problem asks to generate all possible letter combinations that the provided phone number digits can represent.",
      "The optimal solution is a recursive backtracking approach that efficiently builds all valid letter combinations.",
      "This solution is the best possible approach with manageable time and space complexity for this combinatorial generation problem.",
    ],
    concepts: [
      {
        title: "Backtracking",
        definition:
          "A recursive algorithm that builds combinations step by step, exploring all options and backtracking after each decision point to explore other possibilities.",
      },
      {
        title: "Phone Map",
        definition:
          "A mapping of digits (2-9) to their corresponding letters based on a phone keypad layout.",
      },
      {
        title: "Recursive Path Building",
        definition:
          "At each step, the algorithm adds a letter to the current path and recurses to the next digit until all digits are processed.",
      },
    ],
    steps: [
      {
        title: "Step 1: Handle Empty Input",
        description: "If the input string is empty, return an empty array as there are no combinations to build.",
        code: `if (!digits) return [];`,
      },
      {
        title: "Step 2: Define Phone Map",
        description: "Map each digit to its corresponding letters based on the phone keypad.",
        code: `const phoneMap = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };`,
      },
      {
        title: "Step 3: Initialize Result Array",
        description: "Create an array to store all generated combinations.",
        code: `const result = [];`,
      },
      {
        title: "Step 4: Define Backtracking Function",
        description:
          "Create a recursive function that takes the current index and the built string path. When the path length matches the input length, add the path to the result array.",
        code: `function backtrack(index, path) {
  if (index === digits.length) {
    result.push(path);
    return;
  }
  const letters = phoneMap[digits[index]];
  for (const letter of letters) {
    backtrack(index + 1, path + letter);
  }
}`,
      },
      {
        title: "Step 5: Start Backtracking",
        description: "Start the recursive process from index 0 with an empty path.",
        code: `backtrack(0, '');`,
      },
      {
        title: "Step 6: Return Result",
        description: "Return the result array containing all valid combinations.",
      },
    ],
    dryRun: `Example:
Input: digits = "23"

Step 1: First digit '2' → 'a', 'b', 'c'
Step 2: For each letter of '2', combine with letters from '3' → 'd', 'e', 'f'

Generated Combinations:
- 'a' + 'd' = 'ad'
- 'a' + 'e' = 'ae'
- 'a' + 'f' = 'af'
- 'b' + 'd' = 'bd'
- 'b' + 'e' = 'be'
- 'b' + 'f' = 'bf'
- 'c' + 'd' = 'cd'
- 'c' + 'e' = 'ce'
- 'c' + 'f' = 'cf'

Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]`,
    complexities: {
      time: "O(3ⁿ × 4ᵐ) — n is the number of digits mapping to 3 letters (2-6,8), m is the number of digits mapping to 4 letters (7,9).",
      space: "O(3ⁿ × 4ᵐ) — Output space dominates. Call stack depth is O(n).",
    },
    comparisons: [
      {
        title: "Brute Force (Unstructured Recursion)",
        time: "Higher than Backtracking",
        space: "Higher",
        notes: [
          "Would redundantly generate combinations without pruning.",
          "Inefficient and harder to manage recursion depth.",
        ],
      },
      {
        title: "Backtracking (Optimal)",
        time: "O(3ⁿ × 4ᵐ)",
        space: "O(3ⁿ × 4ᵐ)",
        notes: [
          "Industry-standard approach.",
          "Most efficient and clean solution for generating combinations.",
          "Perfectly handles all edge cases like empty input and minimal input.",
        ],
      },
    ],
    notes: [
      "Backtracking is extremely powerful for combination/permutation generation problems.",
      "The depth of recursion is always proportional to the input length, making the algorithm memory-safe for moderate inputs.",
      "You can easily extend this solution to more complex combination problems with minimal changes.",
    ],
  };

  return <ProblemApproach approach={letterCombinationsApproach} />;
}
