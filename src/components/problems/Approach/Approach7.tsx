import ProblemApproach from "./ProblemApproach/problemApproach";

export default function ReverseIntegerApproach() {
  const reverseIntegerApproach = {
    title: "Reverse Integer Optimal Approach",
    overview: [
      "The problem asks to reverse the digits of a signed 32-bit integer.",
      "If the reversed number exceeds the range of signed 32-bit integers, return 0.",
      "This solution efficiently reverses the integer using string manipulation and handles edge cases like overflow."
    ],
    concepts: [
      {
        title: "String Conversion Technique",
        definition: "Convert integer to string, reverse the string, and convert back to integer to simplify digit reversal."
      },
      {
        title: "Signed 32-bit Integer Check",
        definition: "Ensure the reversed integer lies within the range [-2^31, 2^31 - 1] to avoid overflow."
      }
    ],
    steps: [
      {
        title: "Step 1: Handle the Sign",
        description: "Store the sign of the number to apply it later after reversal.",
        code: `const sign = x < 0 ? -1 : 1;`
      },
      {
        title: "Step 2: Reverse the Digits",
        description: "Convert the absolute value to a string, reverse the string, and convert back to integer.",
        code: `const reversed = parseInt(Math.abs(x).toString().split('').reverse().join('')) * sign;`
      },
      {
        title: "Step 3: Handle 32-bit Overflow",
        description: "Return 0 if the reversed number is outside the signed 32-bit integer range.",
        code: `if (reversed < Math.pow(-2, 31) || reversed > Math.pow(2, 31) - 1) return 0;`
      },
      {
        title: "Step 4: Return the Result",
        description: "Return the correctly signed reversed number if no overflow occurs.",
        code: `return reversed;`
      }
    ],
    dryRun: `Input: x = -123
Process:
- Sign: -1
- Reverse: 321
- Final: -321 (within range)

Input: x = 1534236469
Process:
- Sign: 1
- Reverse: 9646324351
- Final: Out of range ➔ Return 0`,
    pseudocode: `
FUNCTION reverse(x):
    SET sign = -1 IF x < 0 ELSE 1
    SET reversed = reverse digits of absolute value of x
    IF reversed < -2^31 OR reversed > 2^31 - 1:
        RETURN 0
    RETURN reversed * sign
    `,
    complexities: {
      time: "O(log₁₀N) ➔ Number of digits",
      space: "O(N) ➔ Due to string storage and reversal"
    },
    comparisons: [
      {
        title: "Brute Force (Digit by Digit Arithmetic)",
        time: "O(log₁₀N)",
        space: "O(1)",
        notes: [
          "Uses mathematical operations: pop last digit and build reversed number.",
          "More manual but saves string space."
        ]
      },
      {
        title: "Current String-Based Solution",
        time: "O(log₁₀N)",
        space: "O(N)",
        notes: [
          "Leverages built-in string operations for clarity and ease.",
          "Preferred for quick development and interview settings."
        ]
      }
    ],
    notes: [
      "Be cautious with the 32-bit integer boundary checks.",
      "Mathematical digit reversal can save space but requires careful overflow handling at each step.",
      "The string-based approach is clean and easy to understand."
    ]
  };

  return <ProblemApproach approach={reverseIntegerApproach} />;
}
