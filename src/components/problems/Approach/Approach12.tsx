import ProblemApproach from "./ProblemApproach/problemApproach";

export default function IntegerToRomanApproach() {
  const integerToRomanApproach = {
    title: "Optimal Greedy Approach for Integer to Roman Conversion",
    overview: [
      "The problem of converting an integer to a Roman numeral is best solved using a greedy algorithm.",
      "We repeatedly subtract the largest possible Roman value from the integer and append the corresponding symbol to the result string.",
      "This solution is extremely efficient with O(1) time complexity due to the fixed input constraints (maximum input: 3999).",
    ],
    concepts: [
      {
        title: "Greedy Algorithm",
        definition:
          "An approach where we make the locally optimal choice at each step. For this problem, we always choose the largest Roman numeral that fits into the remaining integer.",
      },
      {
        title: "Pre-Sorted Lookup",
        definition:
          "We maintain two arrays: one for integer values and one for Roman symbols, sorted from largest to smallest, which allows direct mapping during the conversion.",
      },
      {
        title: "Fixed Input Range",
        definition:
          "Since Roman numerals are only defined for numbers up to 3999, the number of iterations and operations is capped, ensuring constant time complexity.",
      },
    ],
    steps: [
      {
        title: "Step 1: Define Values and Symbols",
        description:
          "Prepare two arrays: one containing integer values and the other containing their corresponding Roman numeral symbols in descending order.",
        code: `const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];\nconst syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];`,
      },
      {
        title: "Step 2: Initialize Result String",
        description:
          "Create an empty string to build the Roman numeral progressively.",
        code: `let roman = '';`,
      },
      {
        title: "Step 3: Greedily Build the Roman Numeral",
        description:
          "Loop through each value. While the current integer is greater than or equal to the value, append the corresponding symbol to the result string and subtract the value from the integer.",
        code: `for (let i = 0; i < val.length; i++) {\n  while (num >= val[i]) {\n    roman += syms[i];\n    num -= val[i];\n  }\n}`,
      },
      {
        title: "Step 4: Return the Result",
        description:
          "Once all values have been processed, the Roman numeral string is fully built and ready to return.",
        code: `return roman;`,
      },
    ],
    dryRun: `Example: num = 58

Step 1: val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
         syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

Step 2: roman = ''

Step 3:
- num = 58 >= 50 -> roman += 'L' -> num = 8
- num = 8 >= 5 -> roman += 'V' -> num = 3
- num = 3 >= 1 -> roman += 'I' -> num = 2
- num = 2 >= 1 -> roman += 'I' -> num = 1
- num = 1 >= 1 -> roman += 'I' -> num = 0

Step 4: return 'LVIII'`,
    complexities: {
      time: "O(1) — The number of operations is fixed, bounded by the size of the value-symbol mapping arrays and the input constraint (max 3999).",
      space:
        "O(1) — Only fixed arrays and a result string are used, with no additional data structures required.",
    },
    comparisons: [
      {
        title: "Brute Force (Complex Mapping with Multiple Checks)",
        time: "O(n) per digit",
        space: "O(1)",
        notes: [
          "Less efficient because it would involve checking each digit’s Roman rules separately with more branching logic.",
        ],
      },
      {
        title: "Greedy Algorithm (Optimal)",
        time: "O(1)",
        space: "O(1)",
        notes: [
          "Best solution: Processes each Roman symbol greedily and directly with constant time and minimal checks.",
        ],
      },
    ],
    notes: [
      "The greedy approach is perfect for this problem because Roman numerals always favor the largest symbols first.",
      "The algorithm guarantees minimal Roman numeral symbols for a given integer — a key property of a valid Roman numeral representation.",
      "Since the Roman numeral system is non-positional and has subtractive notations (like IV, IX), pre-sorting the mappings handles all edge cases automatically.",
      "This solution is highly efficient and industry-accepted for this problem.",
    ],
  };

  return <ProblemApproach approach={integerToRomanApproach} />;
}
