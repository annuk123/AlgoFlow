import ProblemApproach from "./ProblemApproach/problemApproach";

export default function LongestCommonPrefixApproach() {
  const longestCommonPrefixApproach = {
    title: "Optimal Approach for Longest Common Prefix",
    overview: [
      "The Longest Common Prefix problem finds the largest prefix that is shared among all strings in the given array.",
      "This solution uses the Vertical Scanning (Prefix Shrinking) technique where we start with the first string as the initial prefix and iteratively shrink it if the next string does not match.",
      "The approach is both time-efficient and space-efficient, making it an optimal solution for this problem.",
    ],
    concepts: [
      {
        title: "Vertical Scanning",
        definition:
          "A technique where we compare characters of the prefix with each string one by one and shrink the prefix until it matches all strings.",
      },
      {
        title: "Prefix Shrinking",
        definition:
          "Gradually reducing the prefix length by removing characters from the end until the prefix is common to all strings.",
      },
      {
        title: "String Search (indexOf / find)",
        definition:
          "Used to check whether a string starts with the current prefix. Efficiently helps detect mismatches.",
      },
    ],
    steps: [
      {
        title: "Step 1: Check for Empty Array",
        description:
          "If the array of strings is empty, immediately return an empty string as there is no common prefix.",
        code: `if (strs.length === 0) return '';`,
      },
      {
        title: "Step 2: Initialize Prefix",
        description:
          "Assume the first string as the initial prefix. This is the best candidate because the common prefix cannot be longer than the first string.",
        code: `let prefix = strs[0];`,
      },
      {
        title: "Step 3: Iterate Through Remaining Strings",
        description:
          "Compare the current prefix with each string in the array. If the string does not start with the prefix, shrink the prefix by removing the last character until it matches or becomes empty.",
        code: `for (let i = 1; i < strs.length; i++) {\n  while (strs[i].indexOf(prefix) !== 0) {\n    prefix = prefix.slice(0, -1);\n    if (prefix === '') return '';\n  }\n}`,
      },
      {
        title: "Step 4: Return the Result",
        description:
          "Once all strings have been checked, return the longest common prefix found.",
        code: `return prefix;`,
      },
    ],
    dryRun: `Example: strs = ["flower", "flow", "flight"]

Step 1: prefix = "flower"
Step 2: Compare with "flow"
  - "flow" does not start with "flower" -> Shrink to "flowe"
  - Continue shrinking to "flow" -> Match found

Step 3: Compare with "flight"
  - "flight" does not start with "flow" -> Shrink to "flo"
  - Shrink to "fl" -> Match found

Final Answer: prefix = "fl"`,
    complexities: {
      time: "O(S) — S is the sum of all characters across all strings. Each character is compared at most once.",
      space: "O(1) — Constant extra space is used since prefix shrinking only updates the reference.",
    },
    comparisons: [
      {
        title: "Brute Force (Character by Character)",
        time: "O(S)",
        space: "O(1)",
        notes: [
          "Similar time complexity but usually involves extra character comparisons and less clean logic.",
        ],
      },
      {
        title: "Prefix Shrinking (Optimal)",
        time: "O(S)",
        space: "O(1)",
        notes: [
          "Clean, efficient, and intuitive. Quickly shrinks the prefix when mismatches are found.",
        ],
      },
    ],
    notes: [
      "Vertical scanning is very useful when you can eliminate large mismatches quickly by shrinking prefixes.",
      "The solution gracefully handles edge cases like an empty input array.",
      "This approach is widely accepted and performs well across all input sizes.",
      "Alternative methods include horizontal scanning, divide and conquer, and trie-based solutions, but this prefix shrinking solution is often preferred for its simplicity and efficiency.",
    ],
  };

  return <ProblemApproach approach={longestCommonPrefixApproach} />;
}
