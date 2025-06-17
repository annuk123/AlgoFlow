import ProblemApproach from "../visualizer/problemApproach";

export default function MedianOfTwoSortedArraysApproach() {
  const medianApproach = {
    title: "Optimal Approach for Median of Two Sorted Arrays",
    overview: [
      "Binary Search Partitioning: Efficiently divides both arrays to locate the correct partition.",
      "Logarithmic Time: Achieves O(log(min(m, n))) time using binary search on the smaller array.",
      "Handles Both Odd and Even Lengths: Calculates the median based on the partition sizes and edge elements.",
    ],
    steps: [
      {
        title: "Ensure Binary Search on the Smaller Array",
        description: "Always apply binary search on the smaller array to minimize the search space and avoid index overflows.",
        code: `if (nums1.length > nums2.length) swap(nums1, nums2);`,
      },
      {
        title: "Apply Binary Search to Partition Arrays",
        description: "Partition both arrays so that all elements on the left are smaller than all elements on the right.",
        code: `let low = 0, high = nums1.length;
while (low <= high) {
  let partitionX = Math.floor((low + high) / 2);
  let partitionY = Math.floor((nums1.length + nums2.length + 1) / 2) - partitionX;`,
      },
      {
        title: "Check Partition Validity",
        description: "Ensure the largest left element is less than or equal to the smallest right element in both arrays.",
        code: `let maxLeftX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];
let minRightX = (partitionX === nums1.length) ? Infinity : nums1[partitionX];

let maxLeftY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];
let minRightY = (partitionY === nums2.length) ? Infinity : nums2[partitionY];`,
      },
      {
        title: "Calculate the Median",
        description: "If partitions are valid, calculate the median based on total length (odd or even).",
        code: `if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
  if ((nums1.length + nums2.length) % 2 === 0) {
    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
  } else {
    return Math.max(maxLeftX, maxLeftY);
  }
}`,
      },
      {
        title: "Adjust Search Range",
        description: "If partitions are not valid, adjust the binary search range accordingly.",
        code: `else if (maxLeftX > minRightY) {
  high = partitionX - 1;
} else {
  low = partitionX + 1;
}`,
      },
    ],
    dryRun: `Input: nums1 = [1, 3], nums2 = [2]

Step 1: nums1 is smaller.

Step 2: Partition nums1 at 1 (left: [1], right: [3])
Partition nums2 at 0 (left: [], right: [2])

Step 3: maxLeftX = 1, minRightX = 3
maxLeftY = -Infinity, minRightY = 2

Check: maxLeftX (1) <= minRightY (2) ✅
       maxLeftY (-∞) <= minRightX (3) ✅

Total length is odd -> return max(maxLeftX, maxLeftY) = 1

Median = 2`,
    complexities: {
      time: "O(log(min(m, n))) — Efficient binary search on the smaller array.",
      space: "O(1) — Constant extra space.",
    },
    comparisons: [
      {
        title: "Brute Force (Merge Then Find Median)",
        time: "O(m + n)",
        space: "O(m + n)",
        notes: ["Inefficient as it fully merges both arrays."],
      },
      {
        title: "Binary Search Partition (Optimal)",
        time: "O(log(min(m, n)))",
        space: "O(1)",
        notes: ["Efficient, minimal space, directly computes the median."],
      },
    ],
    notes: [
      "Binary search on the smaller array ensures fast convergence and avoids out-of-bounds issues.",
      "Always handle edge cases like empty partitions with +Infinity and -Infinity placeholders.",
      "This problem is a great example of reducing complex array problems to a binary search on indices.",
      "It's one of the most optimized approaches possible for median-finding in unsorted arrays.",
    ],
  };

  return <ProblemApproach approach={medianApproach} />;
}
