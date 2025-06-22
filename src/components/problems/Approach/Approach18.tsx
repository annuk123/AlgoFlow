import ProblemApproach from "./ProblemApproach/problemApproach";

export default function FourSumApproach() {
  const fourSumApproach = {
    title: "Optimal Approach for 4Sum using Two-Pointer Technique",
    overview: [
      "The problem asks to find all unique quadruplets in an array that sum to a specific target value.",
      "The optimal solution involves sorting the array and using nested loops combined with the two-pointer technique to efficiently find all quadruplets.",
      "This solution achieves O(n³) time complexity by fixing two numbers and searching for the other two using two pointers.",
    ],
    concepts: [
      {
        title: "Sorting",
        definition:
          "Sorting the array helps to use the two-pointer technique and to easily skip duplicates.",
      },
      {
        title: "Two-Pointer Technique",
        definition:
          "After fixing two elements, use two pointers from both ends to find the remaining two numbers that sum to the target.",
      },
      {
        title: "Duplicate Skipping",
        definition:
          "Skipping consecutive duplicate elements ensures the result contains unique quadruplets.",
      },
    ],
    steps: [
      {
        title: "Step 1: Sort the Array",
        description: "Sort the input array to prepare for the two-pointer strategy and easy duplicate handling.",
        code: `nums.sort((a, b) => a - b);`,
      },
      {
        title: "Step 2: Fix the First Two Numbers",
        description: "Iterate through the array with two nested loops to fix the first and second numbers of the quadruplet.",
        code: `for (let i = 0; i < nums.length - 3; i++) {
  if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates

  for (let j = i + 1; j < nums.length - 2; j++) {
    if (j > i + 1 && nums[j] === nums[j - 1]) continue; // Skip duplicates
    // Proceed with two-pointer technique
  }
}`,
      },
      {
        title: "Step 3: Apply Two-Pointer Technique",
        description: "For each pair, use two pointers (left and right) to find the remaining two numbers.",
        code: `let left = j + 1, right = nums.length - 1;

while (left < right) {
  const sum = nums[i] + nums[j] + nums[left] + nums[right];

  if (sum < target) left++;
  else if (sum > target) right--;
  else {
    result.push([nums[i], nums[j], nums[left], nums[right]]);

    while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicates
    while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicates

    left++;
    right--;
  }
}`,
      },
      {
        title: "Step 4: Return Result",
        description: "After processing all possibilities, return the result array containing unique quadruplets.",
      },
    ],
    dryRun: `Example:
Input: nums = [1, 0, -1, 0, -2, 2], target = 0

Sorted Array: [-2, -1, 0, 0, 1, 2]

Fixed First Number: -2
Fixed Second Number: -1
Two Pointers: left = 2 (0), right = 5 (2)
Sum = -2 + (-1) + 0 + 2 = -1 < 0 → Move left pointer

Continue until all quadruplets like [-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1] are found.`,
    complexities: {
      time: "O(n³) — Due to two nested loops and a two-pointer search within them.",
      space: "O(1) — Additional space is only used for storing the result. Sorting is in-place.",
    },
    comparisons: [
      {
        title: "Brute Force",
        time: "O(n⁴)",
        space: "O(1)",
        notes: [
          "Extremely inefficient for large arrays.",
          "Checks every possible quadruplet with four nested loops.",
        ],
      },
      {
        title: "Two-Pointer (Optimal)",
        time: "O(n³)",
        space: "O(1)",
        notes: [
          "Efficient, standard approach using sorting and two-pointer technique.",
          "Handles duplicates efficiently and reduces unnecessary checks.",
        ],
      },
    ],
    notes: [
      "The two-pointer method is highly efficient for sum problems in sorted arrays.",
      "Always handle duplicate elements carefully to avoid redundant quadruplets.",
      "This solution can be extended to k-sum problems using recursion and generalization.",
    ],
  };

  return <ProblemApproach approach={fourSumApproach} />;
}
