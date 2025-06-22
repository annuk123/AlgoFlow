import ProblemApproach from "./ProblemApproach/problemApproach";

export default function ThreeSumApproach() {
  const threeSumApproach = {
    title: "Optimal Approach for 3Sum Problem using Sorting and Two Pointers",
    overview: [
      "The 3Sum problem requires finding all unique triplets in an array that sum to zero.",
      "The optimal solution sorts the array and uses a fixed pointer with a two-pointer strategy to efficiently find triplets while avoiding duplicates.",
      "This solution achieves O(n²) time complexity, which is the best possible for this problem.",
    ],
    concepts: [
      {
        title: "Sorting",
        definition:
          "Sorting the array simplifies the process of managing duplicates and enables the efficient use of two pointers.",
      },
      {
        title: "Two-Pointer Technique",
        definition:
          "After fixing one element, two pointers move from both ends towards the center to find pairs that complete the target sum efficiently.",
      },
      {
        title: "Duplicate Skipping",
        definition:
          "After finding a triplet, the solution skips over any consecutive duplicate values to ensure all triplets in the result are unique.",
      },
    ],
    steps: [
      {
        title: "Step 1: Sort the Array",
        description:
          "Sorting is essential to apply the two-pointer technique and efficiently skip duplicates.",
        code: `nums.sort((a, b) => a - b);`,
      },
      {
        title: "Step 2: Iterate Through the Array",
        description:
          "Fix each element as the first number of the triplet and apply the two-pointer technique on the remaining subarray.",
        code: `for (let i = 0; i < nums.length - 2; i++) {\n  if (i > 0 && nums[i] === nums[i - 1]) continue;`,
      },
      {
        title: "Step 3: Apply Two-Pointer Technique",
        description:
          "Use two pointers: left starting just after i, and right at the end of the array. Move pointers based on the sum relative to zero.",
        code: `let left = i + 1;\nlet right = nums.length - 1;\n\nwhile (left < right) {\n  const sum = nums[i] + nums[left] + nums[right];\n\n  if (sum === 0) {\n    result.push([nums[i], nums[left], nums[right]]);\n    while (left < right && nums[left] === nums[left + 1]) left++;\n    while (left < right && nums[right] === nums[right - 1]) right--;\n    left++;\n    right--;\n  } else if (sum < 0) {\n    left++;\n  } else {\n    right--;\n  }\n}`,
      },
      {
        title: "Step 4: Continue and Return Result",
        description:
          "Repeat the process for each i, ensuring duplicate triplets are skipped. Return the final list of unique triplets.",
      },
    ],
    dryRun: `Example: nums = [-1, 0, 1, 2, -1, -4]

Step 1: Sort -> nums = [-4, -1, -1, 0, 1, 2]

Step 2: i = 0, nums[i] = -4
  Two pointers: left = 1 (-1), right = 5 (2)
  Sum = -4 + (-1) + 2 = -3 < 0 -> Move left

Step 3: Continue process

Step 4: i = 1, nums[i] = -1
  Two pointers: left = 2 (-1), right = 5 (2)
  Sum = -1 + (-1) + 2 = 0 -> Valid triplet -> Add [-1, -1, 2]
  Skip duplicates -> Move both pointers

  left = 3 (0), right = 4 (1)
  Sum = -1 + 0 + 1 = 0 -> Valid triplet -> Add [-1, 0, 1]

Final Answer: [[-1, -1, 2], [-1, 0, 1]]`,
    complexities: {
      time: "O(n²) — Sorting takes O(n log n) and the two-pointer traversal is O(n²) overall.",
      space: "O(1) — Constant extra space (excluding the output list).",
    },
    comparisons: [
      {
        title: "Brute Force (Triple Nested Loop)",
        time: "O(n³)",
        space: "O(1)",
        notes: [
          "Very inefficient, checks every possible triplet.",
          "Unacceptable for large input sizes.",
        ],
      },
      {
        title: "Sorting + Two-Pointer (Optimal)",
        time: "O(n²)",
        space: "O(1)",
        notes: [
          "Industry standard solution.",
          "Efficient duplicate skipping.",
          "Best achievable time complexity for this problem.",
        ],
      },
    ],
    notes: [
      "This two-pointer solution is widely used in interviews and production.",
      "Make sure to carefully handle duplicates both at the i index and the left/right pointers.",
      "This pattern can be extended to similar problems like 4Sum using nested loops and multiple pointers.",
      "Edge case: If the array has fewer than 3 elements, return an empty list immediately.",
    ],
  };

  return <ProblemApproach approach={threeSumApproach} />;
}
