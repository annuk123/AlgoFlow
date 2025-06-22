import ProblemApproach from "./ProblemApproach/problemApproach";

export default function PalindromeApproach() {
  const palindromeApproach = {
    title: "Palindrome Number Optimal Approach",
    overview: [
      "The problem requires checking if an integer is a palindrome without converting it to a string.",
      "We can solve this by reversing half of the number and comparing it to the other half.",
      "This approach avoids unnecessary full reversals and extra space usage."
    ],
    concepts: [
      {
        title: "Mathematical Reversal",
        definition: "Reverse half of the digits by popping from the original number and pushing into the reversed number."
      },
      {
        title: "Edge Case Handling",
        definition: "Quickly eliminate negative numbers and numbers ending with 0 (but not 0 itself) since they can't be palindromes."
      },
      {
        title: "Two Half Comparison",
        definition: "Compare the remaining part of the original number with the reversed half, adjusting for odd lengths."
      }
    ],
    steps: [
      {
        title: "Step 1: Eliminate Impossible Cases",
        description: "If the number is negative or ends with 0 (but is not 0), it's not a palindrome.",
        code: `if (x < 0 || (x % 10 === 0 && x !== 0)) return false;`
      },
      {
        title: "Step 2: Reverse Half the Number",
        description: "Reverse digits by popping from the original number and pushing to the reversed number until the original number is less than or equal to the reversed number.",
        code: `while (x > reversedHalf) { reversedHalf = reversedHalf * 10 + x % 10; x = Math.floor(x / 10); }`
      },
      {
        title: "Step 3: Compare Halves",
        description: "If the number has even digits: the two halves should be equal. If odd digits: discard the middle digit of reversedHalf by dividing by 10 before comparing.",
        code: `return x === reversedHalf || x === Math.floor(reversedHalf / 10);`
      }
    ],
    dryRun: `Input: x = 1221
Reversed Half: 12
Remaining Half: 12
Result: Palindrome

Input: x = 12321
Reversed Half: 123
Remaining Half: 12
Remove Middle: 123 // 10 = 12
Result: Palindrome

Input: x = -121
Immediately returns false since x < 0.`,
    pseudocode: `
FUNCTION isPalindrome(x):
    IF x < 0 OR (x % 10 == 0 AND x != 0): RETURN false

    reversedHalf = 0

    WHILE x > reversedHalf:
        reversedHalf = reversedHalf * 10 + x % 10
        x = x // 10

    RETURN x == reversedHalf OR x == reversedHalf // 10
    `,
    complexities: {
      time: "O(log₁₀(N)) ➔ We process only half of the digits",
      space: "O(1) ➔ Only integer variables are used"
    },
    comparisons: [
      {
        title: "String Conversion Approach",
        time: "O(N)",
        space: "O(N)",
        notes: [
          "Convert number to string and compare from both ends.",
          "Simple but uses extra space."
        ]
      },
      {
        title: "Optimal Half-Reversal Approach",
        time: "O(log₁₀(N))",
        space: "O(1)",
        notes: [
          "More efficient and avoids string conversion.",
          "Handles edge cases without extra space."
        ]
      }
    ],
    notes: [
      "Negative numbers and numbers ending with 0 (but not 0 itself) can never be palindromes.",
      "Reversing only half the number prevents overflow and saves time.",
      "Efficient and interview-friendly solution showcasing optimization skills."
    ]
  };

  return <ProblemApproach approach={palindromeApproach} />;
}
