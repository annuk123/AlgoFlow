import ProblemApproach from "../visualizer/problemApproach";

export default function AddTwoNumbersApproach() {
  const addTwoNumbersApproach = {
    title: "Optimal Solution for Add Two Numbers (Linked List)",
    overview: [
      "This problem simulates elementary school addition where each digit is stored in reverse order in a linked list.",
      "We can solve this efficiently by traversing both linked lists simultaneously.",
      "The carry is handled just like manual addition: when the sum exceeds 9, we carry over to the next node.",
    ],
    steps: [
      {
        title: "Step 1: Initialize Pointers and Carry",
        description:
          "Set up a dummy head for the result linked list, pointers for traversal, and a carry variable starting at 0.",
        code: `let dummyHead = new ListNode(0);
let current = dummyHead;
let carry = 0;`,
      },
      {
        title: "Step 2: Traverse Both Linked Lists",
        description:
          "While either list has nodes, add the corresponding values and the carry. If one list is shorter, use 0 for missing nodes.",
        code: `while (l1 !== null || l2 !== null) {
    let x = (l1 !== null) ? l1.val : 0;
    let y = (l2 !== null) ? l2.val : 0;
    let sum = x + y + carry; 
}`,
      },
      {
        title: "Step 3: Handle Carry and Create New Node",
        description:
          "Calculate the new digit and update the carry. Create a new node with the digit and move the current pointer forward.",
        code: `carry = Math.floor(sum / 10);
current.next = new ListNode(sum % 10);
current = current.next;`,
      },
      {
        title: "Step 4: Move Input Pointers",
        description:
          "Advance the input pointers if they are not null to process the next digits.",
        code: `if (l1 !== null) l1 = l1.next;
if (l2 !== null) l2 = l2.next;`,
      },
      {
        title: "Step 5: Handle Remaining Carry",
        description:
          "After the loop, if there is a remaining carry, add it as a new node at the end of the list.",
        code: `if (carry > 0) {
    current.next = new ListNode(carry);
}`,
      },
      {
        title: "Step 6: Return Result",
        description: "Return dummyHead.next since dummyHead was a placeholder.",
        code: `return dummyHead.next;`,
      },
    ],
    dryRun: `Input:
l1: 2 -> 4 -> 3  (represents 342)
l2: 5 -> 6 -> 4  (represents 465)

Step 1: Initialize dummyHead and carry = 0

Step 2: Add 2 + 5 + 0 = 7 -> New Node: 7
Move l1 and l2 to next nodes.

Step 3: Add 4 + 6 + 0 = 10 -> New Node: 0, carry = 1
Move l1 and l2 to next nodes.

Step 4: Add 3 + 4 + 1 = 8 -> New Node: 8
Move l1 and l2 to next nodes.

Step 5: Both lists are exhausted, carry = 0 -> Finished.

Final Result: 7 -> 0 -> 8 (represents 807)`,
    complexities: {
      time: "O(max(m, n)) — Where m and n are the lengths of the two lists.",
      space:
        "O(max(m, n)) — The result list stores the sum, one node per digit.",
    },
    comparisons: [
      {
        title: "Brute Force (Convert to Number)",
        time: "O(m + n) — For traversal",
        space: "O(m + n) — For number storage",
        notes: [
          "Not practical in languages with integer overflow limitations.",
          "Requires reversing the input lists and converting to numbers.",
        ],
      },
      {
        title: "Optimal Approach (Direct Linked List Processing)",
        time: "O(max(m, n))",
        space: "O(max(m, n))",
        notes: [
          "Processes the lists directly without conversion.",
          "Efficient, scalable, and avoids integer overflow.",
        ],
      },
    ],
    notes: [
      "This problem teaches important linked list manipulation techniques and is commonly used to test pointer handling.",
      "Using a dummy head simplifies list building and avoids special cases for the first node.",
      "Always remember to handle the carry after the main loop ends.",
      "You can extend this approach to handle multi-list addition or multiplication problems.",
      "Think carefully about edge cases like different lengths or when the sum generates a new most significant digit.",
    ],
  };

  return <ProblemApproach approach={addTwoNumbersApproach} />;
}
