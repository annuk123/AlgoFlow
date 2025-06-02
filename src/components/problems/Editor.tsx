"use client";

import Editor from "@monaco-editor/react";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
};

export const CodeEditor = ({ value, onChange, language = "javascript" }: Props) => {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Editor
        height="400px"
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
};
