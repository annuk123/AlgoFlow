import ProblemApproach from "./ProblemApproach/problemApproach";

export default function ContainerWithMostWaterApproach() {
  const containerApproach = {
    title: "Optimal Two-Pointer Approach for Container With Most Water",
    overview: [
      "This problem is efficiently solved using the Two-Pointer Technique.",
      "We dynamically move pointers from both ends toward each other to explore the largest possible container areas.",
      "The solution is optimized with O(n) time and O(1) space, which is the best achievable for this problem.",
    ],
    concepts: [
      {
        title: "Two-Pointer Technique",
        definition:
          "A strategy where two pointers start at opposite ends of a data structure and move towards each other to efficiently explore potential solutions.",
      },
      {
        title: "Greedy Decision Making",
        definition:
          "We always move the pointer pointing to the smaller height to maximize the chance of finding a taller container.",
      },
    ],
    steps: [
      {
        title: "Step 1: Initialize Pointers and Max Area",
        description:
          "Start with the left pointer at index 0 and the right pointer at the last index. Initialize maxArea to 0 to track the largest area found.",
        code: `let left = 0, right = height.length - 1;\nlet maxArea = 0;`,
      },
      {
        title: "Step 2: Calculate Current Area",
        description:
          "At each step, calculate the width and the minimum of the two heights. Calculate the current area and update maxArea if needed.",
        code: `while (left < right) {\n  const width = right - left;\n  const minHeight = Math.min(height[left], height[right]);\n  const currentArea = width * minHeight;\n  maxArea = Math.max(maxArea, currentArea);`,
      },
      {
        title: "Step 3: Move the Smaller Height",
        description:
          "Move the pointer pointing to the smaller height since moving the taller height will never increase the area.",
        code: `if (height[left] < height[right]) {\n  left++;\n} else {\n  right--;\n}\n}`,
      },
      {
        title: "Step 4: Final Result",
        description:
          "Repeat the process until both pointers meet. The largest area found is the maximum container area.",
      },
    ],
    dryRun: `Example: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

Step 1: Initialize -> left = 0, right = 8, maxArea = 0

Step 2: Calculate area: width = 8, minHeight = 1 -> area = 8
Update maxArea = 8

Step 3: height[left] < height[right] -> Move left pointer -> left = 1

Step 4: Calculate area: width = 7, minHeight = 7 -> area = 49
Update maxArea = 49

Step 5: height[left] > height[right] -> Move right pointer -> right = 7

Continue this process...

Final Answer: maxArea = 49`,
    complexities: {
      time: "O(n) — Each index is visited at most once by the left and right pointers.",
      space: "O(1) — No extra space is required beyond a few variables.",
    },
    comparisons: [
      {
        title: "Brute Force (Check All Combinations)",
        time: "O(n²)",
        space: "O(1)",
        notes: [
          "Very inefficient. Checks every possible pair of lines.",
          "Redundant comparisons lead to extremely slow performance for large arrays.",
        ],
      },
      {
        title: "Two-Pointer (Optimal)",
        time: "O(n)",
        space: "O(1)",
        notes: [
          "Fast and efficient. Each element is processed at most once.",
          "Avoids unnecessary comparisons by moving the smaller height.",
        ],
      },
    ],
    notes: [
      "The Two-Pointer approach is the best for this type of problem where start and end boundaries interact.",
      "We always move the pointer at the smaller height because the container height is limited by the shorter line.",
      "This approach quickly eliminates impossible cases and focuses only on the promising containers.",
      "Brute Force is impractical for large inputs due to its quadratic time complexity.",
      "The Two-Pointer pattern is also commonly used in sorted array problems and when searching for pairs that meet specific conditions.",
    ],
  };

  return <ProblemApproach approach={containerApproach} />;
}

