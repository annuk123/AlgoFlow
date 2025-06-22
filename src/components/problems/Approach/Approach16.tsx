import ProblemApproach from "./ProblemApproach/problemApproach";

export default function ThreeSumClosestApproach() {
  const threeSumClosestApproach = {
    title: "Optimal Approach for 3Sum Closest using Sorting and Two Pointers",
    overview: [
      "The 3Sum Closest problem asks to find the sum of three integers in an array that is closest to a given target.",
      "The optimal solution sorts the array and uses a two-pointer strategy to explore all possible triplets efficiently.",
      "This solution achieves O(n²) time complexity, which is the best achievable for this problem.",
    ],
    concepts: [
      {
        title: "Sorting",
        definition:
          "Sorting the array simplifies navigation and enables the two-pointer technique to efficiently approach the target sum.",
      },
      {
        title: "Two-Pointer Technique",
        definition:
          "Two pointers move towards each other to efficiently find the closest sum while reducing the search space.",
      },
      {
        title: "Tracking Closest Difference",
        definition:
          "Keep updating the closest sum if the current triplet's sum is nearer to the target than the previously recorded closest sum.",
      },
    ],
    steps: [
      {
        title: "Step 1: Sort the Array",
        description:
          "Sorting is essential to apply the two-pointer technique correctly.",
        code: `nums.sort((a, b) => a - b);`,
      },
      {
        title: "Step 2: Initialize Closest Variable",
        description:
          "Start with a variable to store the closest sum found so far. Initialize it to Infinity.",
        code: `let closest = Infinity;`,
      },
      {
        title: "Step 3: Iterate and Apply Two-Pointer",
        description:
          "Fix one element, and apply the two-pointer technique on the remaining subarray to find the closest sum.",
        code: `for (let i = 0; i < nums.length - 2; i++) {\n  let left = i + 1, right = nums.length - 1;\n\n  while (left < right) {\n    const sum = nums[i] + nums[left] + nums[right];\n\n    if (Math.abs(sum - target) < Math.abs(closest - target)) {\n      closest = sum;\n    }\n\n    if (sum < target) {\n      left++;\n    } else if (sum > target) {\n      right--;\n    } else {\n      return sum;\n    }\n  }\n}`,
      },
      {
        title: "Step 4: Return Closest Sum",
        description: "Return the closest sum after traversing all triplets.",
      },
    ],
    dryRun: `Example: nums = [-1, 2, 1, -4], target = 1

Step 1: Sort -> nums = [-4, -1, 1, 2]

Step 2: i = 0, nums[i] = -4
  Two pointers: left = 1 (-1), right = 3 (2)
  Sum = -4 + (-1) + 2 = -3
  Closest = -3 (initial)

Move left: left = 2 (1)
  Sum = -4 + 1 + 2 = -1
  Closest = -1 (updated)

i = 1, nums[i] = -1
  Two pointers: left = 2 (1), right = 3 (2)
  Sum = -1 + 1 + 2 = 2
  Closest = 2 (updated)

Final Answer: Closest = 2`,
    complexities: {
      time: "O(n²) — Sorting takes O(n log n) and two-pointer traversal is O(n²) overall.",
      space: "O(1) — Constant extra space (excluding input and output).",
    },
    comparisons: [
      {
        title: "Brute Force (Triple Nested Loop)",
        time: "O(n³)",
        space: "O(1)",
        notes: [
          "Very inefficient, checks every triplet manually.",
          "Unacceptable for large input sizes.",
        ],
      },
      {
        title: "Sorting + Two-Pointer (Optimal)",
        time: "O(n²)",
        space: "O(1)",
        notes: [
          "Industry standard solution.",
          "Fastest achievable solution for this problem.",
          "Early stopping if exact target sum is found.",
        ],
      },
    ],
    notes: [
      "The two-pointer solution is highly efficient and easy to extend to related problems like 4Sum Closest.",
      "Unlike 3Sum, this problem does not require unique triplets, which simplifies the process (no need to skip duplicates).",
      "Edge case: If the array length is less than 3, handle appropriately (often considered invalid input).",
      "This pattern can help solve other 'closest' or 'k-sum' problems efficiently.",
    ],
  };

  return <ProblemApproach approach={threeSumClosestApproach} />;
}
