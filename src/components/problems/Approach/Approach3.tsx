import ProblemApproach from "../visualizer/problemApproach";

export default function LongestSubstringApproach() {
  const longestSubstringApproach = {
    title: "Optimal Approach for Longest Substring Without Repeating Characters",
    overview: [
      "This problem uses the Sliding Window technique to find the longest substring without repeating characters efficiently.",
      "We use a Set to quickly check if a character already exists in our current window (substring).",
      "The solution is highly efficient: O(n) time and O(min(n, m)) space, where n is the string length and m is the character set size.",
    ],
    concepts: [
      {
        title: "Sliding Window Technique",
        definition: "A method where we maintain a window (a range) over a part of the data and slide it to explore different sections without restarting.",
      },
      {
        title: "Set Data Structure",
        definition: "A collection of unique elements that allows O(1) average time complexity for checking if an element exists.",
      },
      {
        title: "Two Pointer Technique",
        definition: "We use two indices (left and right) to dynamically track the current window size and position.",
      },
    ],
    steps: [
      {
        title: "Step 1: Initialize Pointers and Tracking Set",
        description:
          "Start with both left and right pointers at the beginning. Use a Set to track characters in the current window.",
        code: `let left = 0, right = 0, maxLength = 0;\nconst seen = new Set();`,
      },
      {
        title: "Step 2: Expand the Window (Move Right Pointer)",
        description:
          "Move the right pointer to include new characters. If the character is not in the Set, add it and update maxLength.",
        code: `while (right < s.length) {\n  if (!seen.has(s[right])) {\n    seen.add(s[right]);\n    maxLength = Math.max(maxLength, right - left + 1);\n    right++;\n  }`,
      },
      {
        title: "Step 3: Shrink the Window on Duplicate (Move Left Pointer)",
        description:
          "If a duplicate is found, remove the leftmost character from the Set and move the left pointer to shrink the window.",
        code: `else {\n  seen.delete(s[left]);\n  left++;\n}`,
      },
      {
        title: "Step 4: Track Maximum Length",
        description:
          "Continue expanding and shrinking the window as needed. Keep updating maxLength throughout the process.",
      },
    ],
    dryRun: `Example: s = "abcabcbb"

Step 1: left = 0, right = 0, maxLength = 0, seen = {}

Step 2: right = 0, s[right] = 'a' -> add 'a' to seen, maxLength = 1

Step 3: right = 1, s[right] = 'b' -> add 'b' to seen, maxLength = 2

Step 4: right = 2, s[right] = 'c' -> add 'c' to seen, maxLength = 3

Step 5: right = 3, s[right] = 'a' -> 'a' is duplicate -> remove s[left] = 'a', left = 1

Continue this process.

Final Answer: maxLength = 3`,
    complexities: {
      time: "O(n) — We visit each character at most twice (once by right, once by left).",
      space: "O(min(n, m)) — m is the character set size. Example: 26 for lowercase English letters.",
    },
    comparisons: [
      {
        title: "Brute Force (Check All Substrings)",
        time: "O(n²)",
        space: "O(n)",
        notes: ["Very inefficient. Checks all possible substrings and verifies uniqueness each time."],
      },
      {
        title: "Sliding Window with Set (Optimal)",
        time: "O(n)",
        space: "O(min(n, m))",
        notes: ["Best solution using fast character tracking with a Set."],
      },
    ],
    notes: [
      "Sliding Window is one of the most powerful techniques for substring and subarray problems.",
      "When dealing with a limited character set (like lowercase English letters), you can use a fixed-size array instead of a Set for even faster lookups.",
      "You can also use a Hash Map to track the last seen index of each character to further optimize in some variations.",
      "This problem is a classic combination of the Two Pointer and Sliding Window patterns.",
    ],
  };

  return <ProblemApproach approach={longestSubstringApproach} />;
}
