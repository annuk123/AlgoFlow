import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface InputListsProps {
  onSubmit: (list1: number[], list2: number[]) => void;
}

const InputLists: React.FC<InputListsProps> = ({ onSubmit }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = () => {
    const list1 = input1.split(",").map((num) => parseInt(num.trim())).filter(num => !isNaN(num));
    const list2 = input2.split(",").map((num) => parseInt(num.trim())).filter(num => !isNaN(num));
    onSubmit(list1, list2);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter List 1 (comma separated)"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Enter List 2 (comma separated)"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        className="border p-2 rounded"
      />

      <Button onClick={handleSubmit}>Start Visualization</Button>
    </div>
  );
};

export default InputLists;
