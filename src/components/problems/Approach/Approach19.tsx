import ProblemApproach from "./ProblemApproach/problemApproach";

export default function RemoveNthFromEndApproach() {
  const removeNthApproach = {
    title: "Optimal Approach for Removing Nth Node From End (Two-Pointer Technique)",
    overview: [
      "The problem asks to remove the nth node from the end of a singly linked list.",
      "The optimal solution uses two pointers with a gap of n nodes between them to locate the target node in a single pass.",
      "A dummy node is used to simplify edge cases such as removing the head node."
    ],
    concepts: [
      {
        title: "Two-Pointer Technique",
        definition: "Maintain two pointers with a fixed gap to efficiently locate the node to remove in one traversal.",
      },
      {
        title: "Dummy Node",
        definition: "A dummy node is a helper node placed before the head to simplify deletion logic, especially when the head itself needs to be removed.",
      },
    ],
    steps: [
      {
        title: "Step 1: Create a Dummy Node",
        description: "Initialize a dummy node that points to the head of the list to simplify edge case handling.",
        code: `let dummy = new ListNode(0);
dummy.next = head;`,
      },
      {
        title: "Step 2: Initialize Two Pointers",
        description: "Set both pointers (first and second) to start from the dummy node.",
        code: `let first = dummy, second = dummy;`,
      },
      {
        title: "Step 3: Move the First Pointer Ahead by (n + 1) Steps",
        description: "This creates a gap of n nodes between the first and second pointers.",
        code: `for (let i = 0; i <= n; i++) {
    first = first.next;
}`,
      },
      {
        title: "Step 4: Move Both Pointers Together",
        description: "Move both pointers until the first pointer reaches the end of the list. The second pointer will then point to the node before the one to delete.",
        code: `while (first) {
    first = first.next;
    second = second.next;
}`,
      },
      {
        title: "Step 5: Remove the Target Node",
        description: "Update the next pointer of the second node to skip the target node.",
        code: `second.next = second.next.next;`,
      },
      {
        title: "Step 6: Return the Updated List",
        description: "Return dummy.next, which is the new head of the list after deletion.",
        code: `return dummy.next;`,
      },
    ],
    dryRun: `Example:
Input: head = [1, 2, 3, 4, 5], n = 2

Step 1: Create dummy -> 0 -> 1 -> 2 -> 3 -> 4 -> 5
Step 2: Move first pointer 3 steps ahead (n + 1)
First now points to node 3.

Step 3: Move both pointers together until first reaches the end.
First: null, Second: node 3

Step 4: Remove node 4 (second.next = second.next.next)

Final List: 1 -> 2 -> 3 -> 5`,
    complexities: {
      time: "O(n) — Single traversal of the list.",
      space: "O(1) — Only constant extra space used (dummy node and pointers).",
    },
    comparisons: [
      {
        title: "Two-Pointer (Optimal)",
        time: "O(n)",
        space: "O(1)",
        notes: [
          "Efficient single-pass solution using a gap between two pointers.",
          "Handles edge cases cleanly with a dummy node.",
        ],
      },
      {
        title: "Length Counting (Less Optimal)",
        time: "O(n)",
        space: "O(1)",
        notes: [
          "Requires two passes: one to calculate length, another to remove the node.",
          "More verbose and slightly less efficient than the two-pointer method.",
        ],
      },
    ],
    notes: [
      "The dummy node approach is a standard trick in linked list manipulation to avoid extra condition checks.",
      "The two-pointer gap method is useful in many similar linked list problems where position from the end is needed.",
    ],
  };

  return <ProblemApproach approach={removeNthApproach} />;
}
