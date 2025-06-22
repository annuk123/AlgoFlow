import ProblemApproach from "./ProblemApproach/problemApproach";

export default function TwoSumApproachPage() {
  const twoSumApproach = {
    title: "Optimal Solution for the Two Sum Problem",
    overview: [
      "We can solve this problem efficiently in a single traversal of the array.",
      "Hash Maps enable constant-time lookups for complements.",
      "This approach minimizes both time and space, offering the most balanced solution.",
    ],
    steps: [
      {
        title: "Step 1: Prepare a Hash Map",
        description:
          "Create an empty hash map to store each number and its corresponding index. This will help us quickly check if the complement of the current number exists.",
        code: "// Example structure:\n// { number: index }\nconst map = new Map();",
      },
      {
        title: "Step 2: Iterate Through the Array",
        description:
          "Loop through each element and calculate the complement required to reach the target sum.",
        code: "const complement = target - nums[i];",
      },
      {
        title: "Step 3: Check for Complement",
        description:
          "If the complement exists in the map, we’ve found the solution. Return the indices of the complement and the current number.",
        code: "if (map.has(complement)) return [map.get(complement), i];",
      },
      {
        title: "Step 4: Store Current Element",
        description:
          "If the complement is not found, store the current number and its index in the map for future reference.",
        code: "map.set(nums[i], i);",
      },
      {
        title: "Step 5: Solution Always Exists",
        description:
          "The problem guarantees that a valid pair exists, so this approach will always find a solution without needing extra checks.",
      },
    ],
    dryRun: `Input: nums = [2, 7, 11, 15], target = 9

Initialize: map = {}

Iteration 1: i = 0, nums[i] = 2
    complement = 9 - 2 = 7
    7 is not in the map -> store {2: 0}

Iteration 2: i = 1, nums[i] = 7
    complement = 9 - 7 = 2
    2 is in the map at index 0 -> return [0, 1]

Answer: Indices [0, 1] (nums[0] + nums[1] = 2 + 7 = 9)`,
    complexities: {
      time: "O(n) — We traverse the array only once.",
      space: "O(n) — In the worst case, we store all elements in the hash map.",
    },
    comparisons: [
      {
        title: "Brute Force (Nested Loops)",
        time: "O(n²)",
        space: "O(1)",
        notes: [
          "Compares each pair individually, leading to high time complexity.",
          "Impractical for large datasets.",
        ],
      },
      {
        title: "Two-Pointer Technique (Sorted Array)",
        time: "O(n log n) — Due to sorting",
        space: "O(1)",
        notes: [
          "Only works if the array is sorted or can be sorted.",
          "Original indices are lost unless tracked separately.",
        ],
      },
      {
        title: "Hash Map (Optimal Approach)",
        time: "O(n)",
        space: "O(n)",
        notes: [
          "Fastest approach using a single-pass solution.",
          "Directly finds the answer while preserving original indices.",
        ],
      },
    ],
    notes: [
      "This is a classic example of the 'Hashing Technique' often used in array and string problems.",
      "Hash maps are powerful for scenarios where you need to find pairs, frequencies, or complements quickly.",
      "If the array is sorted, the two-pointer approach can be a viable alternative with better space efficiency.",
      "Always verify whether the problem guarantees a solution — it can simplify your logic by removing extra edge-case handling.",
      "Two Sum is a foundational problem that prepares you for more advanced concepts like Subarray Sum Equals K and 4 Sum problems.",
    ],
  };

  return <ProblemApproach approach={twoSumApproach} />;
}
