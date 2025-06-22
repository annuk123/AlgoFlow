// src/components/problems/Approach/RegularExpressionApproach.tsx

import ProblemApproach from "./ProblemApproach/problemApproach";

export default function RegularExpressionApproach() {
  const regularExpressionApproach = {
    title: "Regular Expression Matching Optimal Approach",
    overview: [
      "The problem requires checking if a string matches a pattern where '.' matches any single character and '*' matches zero or more of the preceding element.",
      "Using Dynamic Programming, we can efficiently solve this by storing results of subproblems in a DP table.",
      "This approach significantly optimizes over naive recursive solutions by avoiding redundant calculations."
    ],
    concepts: [
      {
        title: "Dynamic Programming (DP)",
        definition:
          "DP solves complex problems by breaking them down into simpler overlapping subproblems and storing the results."
      },
      {
        title: "Pattern Special Characters",
        definition:
          "The '.' matches any single character. The '*' matches zero or more of the preceding element."
      },
      {
        title: "DP Table Setup",
        definition:
          "dp[i][j] means whether the first i characters of the string match the first j characters of the pattern."
      }
    ],
    steps: [
      {
        title: "Step 1: Initialize DP Table",
        description:
          "Create a DP table of size (s.length + 1) x (p.length + 1) and set dp[0][0] = true (empty string matches empty pattern).",
        code: `const dp = Array(s.length + 1).fill(null).map(() => Array(p.length + 1).fill(false));\ndp[0][0] = true;`
      },
      {
        title: "Step 2: Handle '*' in Pattern Initialization",
        description:
          "For each '*' in the pattern, check if it can match zero occurrences of the preceding element and initialize accordingly.",
        code: `for (let j = 1; j <= p.length; j++) {\n  if (p[j - 1] === '*') {\n    dp[0][j] = dp[0][j - 2];\n  }\n}`
      },
      {
        title: "Step 3: Fill the DP Table",
        description:
          "Loop through the string and the pattern. If characters match or pattern is '.', update dp[i][j] from the previous state. Handle '*' by checking zero or more occurrences.",
        code: `if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {\n  dp[i][j] = dp[i - 1][j - 1];\n} else if (p[j - 1] === '*') {\n  dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === '.'));\n}`
      },
      {
        title: "Step 4: Final Result",
        description:
          "Return the value at dp[s.length][p.length] which tells whether the entire string matches the entire pattern.",
        code: `return dp[s.length][p.length];`
      }
    ],
    dryRun: `Example: s = "aab", p = "c*a*b"\n\nInitialize dp[0][0] = true\nPattern handling: dp[0][2] = true, dp[0][4] = true\n\nDP Table filling:\n- Match 'a' with 'a' -> dp[1][3] = true\n- Match 'a' with '*' -> dp[2][3] = true\n- Match 'b' with 'b' -> dp[3][5] = true\n\nResult: dp[3][5] = true (Match found)`,
    pseudocode: `
FUNCTION isMatch(s, p):
    Initialize dp[0..s.length][0..p.length] as False
    dp[0][0] = True

    FOR j FROM 1 TO p.length:
        IF p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]

    FOR i FROM 1 TO s.length:
        FOR j FROM 1 TO p.length:
            IF p[j - 1] == s[i - 1] OR p[j - 1] == '.':
                dp[i][j] = dp[i - 1][j - 1]
            ELSE IF p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2] OR (dp[i - 1][j] AND (s[i - 1] == p[j - 2] OR p[j - 2] == '.'))

    RETURN dp[s.length][p.length]
    `,
    complexities: {
      time: "O(m * n) ➔ m is the length of the string, n is the length of the pattern",
      space: "O(m * n) ➔ DP table of size m x n"
    },
    comparisons: [
      {
        title: "Naive Recursive Approach",
        time: "Exponential O(2^(m+n))",
        space: "O(m + n) due to recursion stack",
        notes: [
          "Simple but extremely inefficient due to overlapping subproblems.",
          "Leads to TLE for large inputs."
        ]
      },
      {
        title: "Dynamic Programming Approach",
        time: "O(m * n)",
        space: "O(m * n)",
        notes: [
          "Efficient and scalable for large input sizes.",
          "Uses extra space for the DP table but significantly reduces time complexity."
        ]
      }
    ],
    notes: [
      "The '*' operator can match zero or more of the preceding element.",
      "The '.' operator matches any single character.",
      "DP efficiently handles complex patterns by building the solution bottom-up."
    ]
  };

  return <ProblemApproach approach={regularExpressionApproach} />;
}
