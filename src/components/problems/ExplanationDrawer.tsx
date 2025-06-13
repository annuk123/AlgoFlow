"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExplanationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  explanation: string;
}

export default function ExplanationDrawer({
  isOpen,
  onClose,
  title = "Explanation",
  explanation,
}: ExplanationDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { type: "spring", bounce: 0.3 } }}
          exit={{ x: "100%", opacity: 0, transition: { duration: 0.3 } }}
          className="fixed top-0 right-0 h-full w-[420px] bg-white dark:bg-black shadow-xl z-50 border-l border-gray-500 p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">{title}</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>

          {explanation ? (
            <ScrollArea className="h-[calc(100%-3rem)] pr-2">
              <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-100">
               <ReactMarkdown
  components={{
    h1: (props) => <h1 className="text-2xl font-bold" {...props} />,
    h2: (props) => <h2 className="text-xl font-semibold" {...props} />,
    li: (props) => <li className="ml-4 list-disc" {...props} />,
    code: (props) => (
      <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded text-sm" {...props} />
    ),
  }}
>
  {explanation}
</ReactMarkdown>

              </div>
            </ScrollArea>
          ) : (
            <p className="text-muted-foreground">No explanation available.</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
