import ProblemApproach from "./ProblemApproach/problemApproach";

export default function MedianOfTwoSortedArraysApproach() {
  const medianApproach = {
    title: "Optimal Approach for Finding the Median of Two Sorted Arrays",
    overview: [
      "Use Binary Search: Divide both arrays such that all elements on the left are smaller or equal to all elements on the right.",
      "Fast Time Complexity: Runs in O(log(min(m, n))) time because we always apply binary search on the smaller array.",
      "Supports Odd & Even Lengths: Automatically handles both odd and even combined lengths without any extra steps.",
      "Does Not Merge Arrays: Saves time and space by not merging or fully traversing arrays.",
      "Handles Edge Cases: Works even if one array is empty or if partitions are at the boundaries."
    ],
    steps: [
      {
        title: "Step 1: Always Search the Smaller Array",
        description:
          "For efficiency and correctness, always apply binary search on the smaller array. If nums1 is larger than nums2, swap them to make sure we are searching the smaller array.",
        code: `if (nums1.length > nums2.length) swap(nums1, nums2);`,
      },
      {
        title: "Step 2: Apply Binary Search to Split the Arrays",
        description:
          "We perform binary search on nums1 to find a partition that divides both arrays into two balanced halves.",
        code: `let low = 0, high = nums1.length;

while (low <= high) {
  let partitionX = Math.floor((low + high) / 2);
  let partitionY = Math.floor((nums1.length + nums2.length + 1) / 2) - partitionX;`,
      },
      {
        title: "Step 3: Handle Borders Safely",
        description:
          "When the partition is at the start or end of an array, use -Infinity or +Infinity to safely handle out-of-bound comparisons.",
        code: `let maxLeftX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];
let minRightX = (partitionX === nums1.length) ? Infinity : nums1[partitionX];

let maxLeftY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];
let minRightY = (partitionY === nums2.length) ? Infinity : nums2[partitionY];`,
      },
      {
        title: "Step 4: Validate the Partition",
        description:
          "Check if all elements on the left side are less than or equal to all elements on the right side. If the partition is valid, calculate the median based on the combined array length.",
        code: `if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
  if ((nums1.length + nums2.length) % 2 === 0) {
    // Even length: median is the average of the two middle elements
    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
  } else {
    // Odd length: median is the maximum of the left side
    return Math.max(maxLeftX, maxLeftY);
  }
}`,
      },
      {
        title: "Step 5: Adjust the Search Window",
        description:
          "If the left side is too big (maxLeftX > minRightY), move the binary search window to the left. Otherwise, move it to the right.",
        code: `else if (maxLeftX > minRightY) {
  high = partitionX - 1; // move search window to the left
} else {
  low = partitionX + 1;  // move search window to the right
}`,
      },
    ],
    dryRun: `Input: nums1 = [1, 3], nums2 = [2]

Step 1: nums1 is already smaller.

Step 2: Partition nums1 at index 1 -> Left: [1], Right: [3]
Partition nums2 at index 0 -> Left: [], Right: [2]

Step 3: maxLeftX = 1, minRightX = 3
maxLeftY = -Infinity, minRightY = 2

Check: 1 <= 2  and -∞ <= 3 

Since total length is odd -> Median = max(1, -∞) = 1

Answer: Median = 2`,
    complexities: {
      time: "O(log(min(m, n))) — Fast binary search on the smaller array.",
      space: "O(1) — Uses constant extra space, no additional arrays created.",
    },
    comparisons: [
      {
        title: "Brute Force (Merge & Find Median)",
        time: "O(m + n)",
        space: "O(m + n)",
        notes: [
          "Slower because it fully merges both arrays and sorts them.",
          "Extra space is required to store the merged array."
        ],
      },
      {
        title: "Binary Search Partition (Optimal)",
        time: "O(log(min(m, n)))",
        space: "O(1)",
        notes: [
          "Much faster, no need to merge arrays.",
          "Efficient and uses only a few variables."
        ],
      },
    ],
    notes: [
      "Always perform binary search on the smaller array to keep search range minimal.",
      "Use -Infinity and +Infinity to safely handle array boundary conditions.",
      "This method directly finds the median without merging or fully traversing both arrays.",
      "Elegant solution that simplifies a complex problem using index calculations.",
      "Handles edge cases like empty arrays, partitions at array ends, and arrays of different lengths.",
      "Be careful to validate inputs: both arrays must be sorted for this method to work correctly.",
      "Perfect approach for interview questions and real-world high-performance scenarios."
    ],
  };

  return <ProblemApproach approach={medianApproach} />;
}
