import ProblemApproach from "./ProblemApproach/problemApproach";

export default function ZigzagConversionApproach() {
  const zigzagApproach = {
    title: "Optimal Zigzag Conversion Approach",
    overview: [
      "The Zigzag Conversion problem is best solved using a simulation technique where we traverse the string and place characters into their respective rows based on the current direction.",
      "We dynamically move up and down through the rows to form the zigzag pattern efficiently without extra traversal."
    ],
    concepts: [
      {
        title: "Zigzag Simulation",
        definition:
          "Simulate the zigzag traversal by tracking current row and switching direction when reaching the top or bottom rows."
      },
      {
        title: "Row-wise String Building",
        definition:
          "Each row is treated as an independent string where characters are added sequentially before combining all rows at the end."
      }
    ],
    steps: [
      {
        title: "Step 1: Handle Edge Cases",
        description: "If numRows is 1 or greater than or equal to the string length, return the string as it is.",
        code: `if (numRows === 1 || numRows >= s.length) return s;`
      },
      {
        title: "Step 2: Initialize Row Storage and Control Variables",
        description: "Prepare an array to hold characters for each row, and track the current row and direction.",
        code: `const rows = Array.from({ length: numRows }, () => '');\nlet currentRow = 0;\nlet goingDown = false;`
      },
      {
        title: "Step 3: Traverse the String",
        description: "Append each character to the current row and adjust direction when reaching row limits.",
        code: `for (let char of s) {\n  rows[currentRow] += char;\n  if (currentRow === 0) goingDown = true;\n  else if (currentRow === numRows - 1) goingDown = false;\n  currentRow += goingDown ? 1 : -1;\n}`
      },
      {
        title: "Step 4: Combine the Rows",
        description: "Join all rows into a single string to obtain the final zigzag-converted string.",
        code: `return rows.join('');`
      }
    ],
    dryRun: `Example: s = "PAYPALISHIRING", numRows = 3

Traversal:
Row 0: P   A   H   N
Row 1: A P L S I I G
Row 2: Y   I   R

Result: "PAHNAPLSIIGYIR"`,
    pseudocode: `
FUNCTION convert(s, numRows):
    IF numRows == 1 OR numRows >= length of s:
        RETURN s

    Initialize rows as empty strings for each row
    Set currentRow = 0
    Set goingDown = False

    FOR each character in s:
        Append character to rows[currentRow]
        IF currentRow == 0:
            goingDown = True
        ELSE IF currentRow == numRows - 1:
            goingDown = False
        currentRow += 1 IF goingDown ELSE -1

    RETURN concatenation of all rows
    `,
    complexities: {
      time: "O(n) — Each character is processed exactly once.",
      space: "O(n) — Storage required for all characters in row arrays."
    },
    comparisons: [
      {
        title: "Brute Force Grid Simulation",
        time: "O(n)",
        space: "O(numRows * maxRowLength)",
        notes: [
          "Build a 2D grid and place characters at exact zigzag positions.",
          "Requires extra space to hold unused grid slots.",
          "Reading characters row-by-row would need an additional loop."
        ]
      },
      {
        title: "Optimal Row-wise Traversal (Current Solution)",
        time: "O(n)",
        space: "O(n)",
        notes: [
          "Avoids unused grid slots by directly appending characters to rows.",
          "Efficient single-pass solution with minimal extra variables."
        ]
      }
    ],
    notes: [
      "The brute-force grid simulation is wasteful in space due to many unused cells.",
      "The row-wise appending method is the most optimal and interview-preferred solution.",
      "Handling direction switching efficiently is key to correctly traversing the zigzag path.",
      "This solution is scalable and works well for very long strings and large numRows values."
    ]
  };

  return <ProblemApproach approach={zigzagApproach} />;
}
