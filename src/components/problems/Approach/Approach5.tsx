import ProblemApproach from "./ProblemApproach/problemApproach";

export default function LongestPalindromeApproach() {
  const longestPalindromeApproach = {
    title: "Optimal Expand Around Center Approach for Longest Palindromic Substring",
    overview: [
      "This problem is efficiently solved by expanding around each character (center) to find the longest palindromic substring.",
      "We explore both odd-length and even-length palindromes by treating each character and the space between characters as potential centers.",
      "This solution avoids brute-force checking of all substrings and reduces unnecessary computations."
    ],
    concepts: [
      {
        title: "Expand Around Center Technique",
        definition:
          "A strategy where we start from a center point and expand outward as long as the characters on both sides match, efficiently detecting palindromes."
      },
      {
        title: "Two Types of Centers",
        definition:
          "We must check both odd-length centers (single character) and even-length centers (between two characters) to handle all palindrome patterns."
      }
    ],
    steps: [
      {
        title: "Step 1: Handle Base Case",
        description: "If the input string has less than 2 characters, return the string itself since it’s already a palindrome.",
        code: `if (s.length < 2) return s;`
      },
      {
        title: "Step 2: Initialize Variables",
        description: "Use `start` and `end` to track the current longest palindrome indices.",
        code: `let start = 0, end = 0;`
      },
      {
        title: "Step 3: Iterate Through Each Character",
        description: "Check each character as a potential center for both odd and even-length palindromes.",
        code: `for (let i = 0; i < s.length; i++) {\n  const len1 = expandAroundCenter(s, i, i);\n  const len2 = expandAroundCenter(s, i, i + 1);\n  const len = Math.max(len1, len2);\n  if (len > end - start) {\n    start = i - Math.floor((len - 1) / 2);\n    end = i + Math.floor(len / 2);\n  }\n}`
      },
      {
        title: "Step 4: Return Result",
        description: "Extract the longest palindromic substring using the updated start and end indices.",
        code: `return s.substring(start, end + 1);`
      }
    ],
    dryRun: `Example: s = "babad"

Iteration 1: Center at 'b' -> expand to "bab"
Iteration 2: Center at 'a' -> expand to "aba"
Iteration 3: Center at 'b' -> "bab" and "aba" both length 3
Iteration 4: Center at 'a' -> "a"
Iteration 5: Center at 'd' -> "d"

Longest palindrome: "bab" or "aba"`,
    pseudocode: `
FUNCTION longestPalindrome(s):
    IF length of s < 2:
        RETURN s

    start = 0
    end = 0

    FOR i FROM 0 TO length of s - 1:
        len1 = expandAroundCenter(s, i, i)
        len2 = expandAroundCenter(s, i, i + 1)
        maxLen = MAX(len1, len2)

        IF maxLen > end - start:
            start = i - (maxLen - 1) // 2
            end = i + maxLen // 2

    RETURN substring of s from start to end + 1

FUNCTION expandAroundCenter(s, left, right):
    WHILE left >= 0 AND right < length of s AND s[left] == s[right]:
        left = left - 1
        right = right + 1

    RETURN right - left - 1
    `,
    complexities: {
      time: "O(n^2) — Each expansion can take O(n) time and we check around 2n centers.",
      space: "O(1) — Only pointers and variables are used. No extra space is needed."
    },
    comparisons: [
      {
        title: "Brute Force",
        time: "O(n^3)",
        space: "O(1)",
        notes: [
          "Iterate over all possible substrings and check if each one is a palindrome.",
          "Highly inefficient due to repeated checks of the same substrings."
        ]
      },
      {
        title: "Dynamic Programming (DP Table)",
        time: "O(n^2)",
        space: "O(n^2)",
        notes: [
          "Build a DP table where dp[i][j] indicates if substring s[i...j] is a palindrome.",
          "Efficient but requires O(n^2) space for the table.",
          "May provide easier traceability of all palindromic substrings but is heavier in memory."
        ]
      },
      {
        title: "Expand Around Center (Optimal)",
        time: "O(n^2)",
        space: "O(1)",
        notes: [
          "Best balance of time and space for this problem.",
          "Avoids the extra space of DP tables and skips redundant checks."
        ]
      }
    ],
    notes: [
      "Brute-force is not practical for large inputs due to O(n^3) complexity.",
      "Dynamic Programming provides a useful tabular view but consumes O(n^2) space.",
      "Expand Around Center is widely considered the most interview-friendly optimal solution.",
      "For O(n) solutions, Manacher’s Algorithm is required but is not commonly asked in interviews.",
      "This solution is elegant, simple to implement, and highly efficient for most cases."
    ]
  };

  return <ProblemApproach approach={longestPalindromeApproach} />;
}
