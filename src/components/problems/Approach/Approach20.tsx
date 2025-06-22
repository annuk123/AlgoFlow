import ProblemApproach from "./ProblemApproach/problemApproach";

export default function ValidParenthesesApproach() {
  const validParenthesesApproach = {
    title: "Optimal Approach for Valid Parentheses using Stack",
    overview: [
      "The problem asks to check whether a string containing only parentheses is valid (i.e., properly closed and nested).",
      "The optimal solution uses a stack to keep track of expected closing brackets as we iterate through the string.",
      "The stack allows us to validate the sequence efficiently in a single pass."
    ],
    concepts: [
      {
        title: "Stack Data Structure",
        definition: "A stack follows LIFO (Last In First Out) order, which perfectly fits the need to track opening and closing brackets."
      },
      {
        title: "Bracket Mapping",
        definition: "Using a map to quickly find the matching closing bracket for each opening bracket simplifies the validation logic."
      }
    ],
    steps: [
      {
        title: "Step 1: Initialize Stack and Bracket Map",
        description: "Use a stack to track the expected closing brackets and a map to link opening brackets to their corresponding closing brackets.",
        code: `const stack = [];
const map = { '(': ')', '{': '}', '[': ']' };`
      },
      {
        title: "Step 2: Iterate Over Each Character",
        description: "Traverse the input string character by character to handle each bracket.",
        code: `for (const char of s) {
  if (map[char]) {
    stack.push(map[char]);
  } else if (stack.pop() !== char) {
    return false;
  }
}`
      },
      {
        title: "Step 3: Final Validation",
        description: "After the iteration, check whether the stack is empty. If it is, all brackets were properly matched.",
        code: `return stack.length === 0;`
      }
    ],
    dryRun: `Example:
Input: s = "{[()]}"
Process:
- Push ) for ( 
- Push ] for [ 
- Push } for { 
- Pop ) → matched ✔️
- Pop ] → matched ✔️
- Pop } → matched ✔️

Stack is empty → Return true (Valid)
`,
    complexities: {
      time: "O(n) — Single traversal through the string.",
      space: "O(n) — In the worst case, the stack holds all opening brackets."
    },
    comparisons: [
      {
        title: "Stack Approach (Optimal)",
        time: "O(n)",
        space: "O(n)",
        notes: [
          "Standard solution with single pass validation.",
          "Efficient, clean, and handles all edge cases naturally."
        ]
      },
      {
        title: "Brute Force (Not Practical)",
        time: "More than O(n)",
        space: "O(1)",
        notes: [
          "Manually tracking balance counters for each bracket type gets complicated and is not scalable for nested patterns."
        ]
      }
    ],
    notes: [
      "Using a stack is the most intuitive and reliable method for balanced parentheses problems.",
      "This solution can be extended to handle additional characters or multi-bracket expressions by simply updating the map."
    ]
  };

  return <ProblemApproach approach={validParenthesesApproach} />;
}
