import ProblemApproach from "./ProblemApproach/problemApproach";

export default function LongestSubstringApproach() {
  const longestSubstringApproach = {
    title: "Optimal Hash Map Sliding Window Approach for Longest Substring Without Repeating Characters",
    overview: [
      "This problem is best solved using the Sliding Window technique combined with a Hash Map to track the last seen index of characters.",
      "The Hash Map allows us to instantly 'jump' the left pointer forward, making this solution more efficient than the basic Sliding Window with a Set.",
      "The solution runs in O(n) time and O(min(n, m)) space, where n is the string length and m is the character set size."
    ],
    concepts: [
      {
        title: "Sliding Window Technique",
        definition:
          "A method where we use two pointers to create a dynamic window that grows and shrinks efficiently to maintain a desired condition over a sequence."
      },
      {
        title: "Hash Map Data Structure",
        definition:
          "A key-value store that allows O(1) average time complexity for insertion, lookup, and update, making it perfect for tracking character positions quickly."
      },
      {
        title: "Two Pointer Technique",
        definition:
          "Two indices (left and right) are used to dynamically manage the current window. The right pointer explores new characters while the left pointer skips duplicates."
      }
    ],
    steps: [
      {
        title: "Step 1: Handle Edge Case",
        description: "If the string is empty, return 0 immediately since there are no substrings.",
        code: `if (s.length === 0) return 0;`
      },
      {
        title: "Step 2: Initialize Pointers and Hash Map",
        description:
          "Start with both pointers (left and right) at the beginning. Use a Hash Map to store the last seen index of each character.",
        code: `let left = 0, maxLength = 0;\nconst charIndexMap = new Map();`
      },
      {
        title: "Step 3: Expand the Window (Move Right Pointer)",
        description:
          "Iterate through each character using the right pointer. If the character is already in the Hash Map and its last seen index is within the current window, move the left pointer directly to skip the duplicate.",
        code: `for (let right = 0; right < s.length; right++) {\n  if (charIndexMap.has(s[right]) && charIndexMap.get(s[right]) >= left) {\n    left = charIndexMap.get(s[right]) + 1;\n  }\n  charIndexMap.set(s[right], right);\n  maxLength = Math.max(maxLength, right - left + 1);\n}`
      },
      {
        title: "Step 4: Final Result",
        description: "Return maxLength, which holds the length of the longest substring without repeating characters.",
        code: `return maxLength;`
      }
    ],
    dryRun: `Example: s = "abcabcbb"

Step 1: Initialize -> left = 0, maxLength = 0, charIndexMap = {}

Step 2: right = 0, s[right] = 'a' -> Add 'a': index 0 -> maxLength = 1
right = 1, s[right] = 'b' -> Add 'b': index 1 -> maxLength = 2
right = 2, s[right] = 'c' -> Add 'c': index 2 -> maxLength = 3

Step 3: right = 3, s[right] = 'a' -> Duplicate found at index 0
Move left = index 0 + 1 = 1
Update 'a' in map -> maxLength remains 3

Continue process...

Final Answer: maxLength = 3`,
    complexities: {
      time: "O(n) — Each character is visited at most once by the right pointer and skipped at most once by the left pointer.",
      space: "O(min(n, m)) — Where m is the character set size. Example: 26 for lowercase English letters, 128 for ASCII."
    },
    comparisons: [
      {
        title: "Brute Force (Check All Substrings)",
        time: "O(n²)",
        space: "O(n)",
        notes: [
          "Inefficient: Tries every substring and checks uniqueness each time.",
          "Extremely slow for large strings."
        ]
      },
      {
        title: "Sliding Window with Set",
        time: "O(n)",
        space: "O(min(n, m))",
        notes: [
          "Efficient but slower than Hash Map approach.",
          "Shrinks the window by one character at a time on duplicates, which can be a waste if duplicates are far apart."
        ]
      },
      {
        title: "Sliding Window with Hash Map (Optimal)",
        time: "O(n)",
        space: "O(min(n, m))",
        notes: [
          "Most optimal: Uses the last seen index to 'jump' the left pointer directly to the right position, skipping unnecessary steps.",
          "Best when dealing with large strings or when duplicates are far apart."
        ]
      }
    ],
    notes: [
      "Why Hash Map Sliding Window is More Optimal: Unlike the Set approach which removes characters one by one when a duplicate is found, the Hash Map approach directly skips to the correct window position using the last seen index. This saves multiple operations when duplicates are far apart.",
      "When to Use Hash Map Sliding Window: Use it when you need to track the last seen index of elements efficiently, especially when the problem requires skipping large parts of the string quickly on duplicates.",
      "When the Set-based Sliding Window is Good: It's acceptable when the duplicates are frequent and close together, but it is generally slower than the Hash Map approach.",
      "Character Set Size Optimization: If you know the character set is limited (like only lowercase English letters), you can replace the Hash Map with a fixed-size array for even faster constant-time lookups.",
      "Edge Case: Always handle the empty string scenario at the beginning."
    ]
  };

  return <ProblemApproach approach={longestSubstringApproach} />;
}
