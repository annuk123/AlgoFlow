// components/a2zProblems/CodeEditor.tsx

"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

type Props = {
  language: "javascript" | "java" | "cpp";
};

const defaultCode: Record<string, string> = {
  javascript: `function add(a, b) {
  return a + b;
}`,
  java: `public class Solution {
  public int add(int a, int b) {
    return a + b;
  }
}`,
  cpp: `int add(int a, int b) {
  return a + b;
}`,
};

export function CodeEditor({ language }: Props) {
  const [code, setCode] = useState(defaultCode[language]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  return (
    <div className="border rounded overflow-hidden">
      <Editor
        height="400px"
        theme="vs-dark"
        language={language === "cpp" ? "cpp" : language}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
