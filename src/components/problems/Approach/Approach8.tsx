import ProblemApproach from "./ProblemApproach/problemApproach";

export default function AtoiApproach() {
  const atoiApproach = {
    title: "String to Integer (Atoi) Optimal Approach",
    overview: [
      "The problem requires converting a string to a 32-bit signed integer similar to the C/C++ atoi function.",
      "The string may contain leading whitespace, an optional '+' or '-' sign, and numeric digits. Any extra characters after the numeric part are ignored.",
      "The result must be clamped within the 32-bit signed integer range."
    ],
    concepts: [
      {
        title: "Character Traversal",
        definition: "Iterate through each character to extract and convert valid numeric digits."
      },
      {
        title: "Whitespace and Sign Handling",
        definition: "Correctly parse leading whitespaces and detect optional '+' or '-' signs."
      },
      {
        title: "32-bit Integer Bounds",
        definition: "Ensure the final integer falls within the allowed range [-2^31, 2^31 - 1]."
      }
    ],
    steps: [
      {
        title: "Step 1: Trim Whitespace",
        description: "Remove any leading or trailing whitespace using the `trim()` method.",
        code: `s = s.trim();`
      },
      {
        title: "Step 2: Handle Sign",
        description: "If the first character is '+' or '-', store the sign and move to the next character.",
        code: `if (s[index] === '-' || s[index] === '+') { sign = s[index] === '-' ? -1 : 1; index++; }`
      },
      {
        title: "Step 3: Convert Characters to Integer",
        description: "Loop through each digit and update the result by multiplying by 10 and adding the current digit.",
        code: `while (index < s.length && s[index] >= '0' && s[index] <= '9') { result = result * 10 + (s[index] - '0'); index++; }`
      },
      {
        title: "Step 4: Apply Bounds",
        description: "Clamp the result within the 32-bit signed integer range [-2^31, 2^31 - 1].",
        code: `if (result > INT_MAX) return INT_MAX; if (result < INT_MIN) return INT_MIN;`
      },
      {
        title: "Step 5: Return Final Result",
        description: "Multiply the result by the sign and return it.",
        code: `return result * sign;`
      }
    ],
    dryRun: `Input: s = "   -42"
Trim: "-42"
Sign: -1
Parse: 42
Result: -42

Input: s = "4193 with words"
Trim: "4193 with words"
Parse: 4193 (stop at non-digit)
Result: 4193

Input: s = "words and 987"
Trim: "words and 987"
No leading number ➜ Result: 0`,
    pseudocode: `
FUNCTION myAtoi(s):
    TRIM s
    IF s is empty: RETURN 0

    SET sign = 1, index = 0, result = 0

    IF s[index] is '+' or '-':
        UPDATE sign
        INCREMENT index

    WHILE index < length of s AND s[index] is digit:
        result = result * 10 + digit value of s[index]
        INCREMENT index

    result = result * sign

    IF result > INT_MAX: RETURN INT_MAX
    IF result < INT_MIN: RETURN INT_MIN

    RETURN result
    `,
    complexities: {
      time: "O(N) ➔ N is the length of the string",
      space: "O(1) ➔ Only integer variables are used"
    },
    comparisons: [
      {
        title: "Brute Force (Using Regular Expressions)",
        time: "O(N)",
        space: "O(N)",
        notes: [
          "Extract the number using regex and parse it.",
          "Less manual, but less efficient and harder to control overflows step-by-step."
        ]
      },
      {
        title: "Current Manual Parsing Approach",
        time: "O(N)",
        space: "O(1)",
        notes: [
          "More control and memory efficient.",
          "Handles all edge cases cleanly without regex."
        ]
      }
    ],
    notes: [
      "Always check for empty strings and strings with no valid numeric prefix.",
      "The manual approach is preferred for interviews as it shows step-wise parsing skill.",
      "Watch out for integer overflows when parsing large numbers digit-by-digit."
    ]
  };

  return <ProblemApproach approach={atoiApproach} />;
}
