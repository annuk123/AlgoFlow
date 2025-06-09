"use client";

type StackDisplayProps = {
  stack: string[];
  activeIndex: number | null;
};

export default function StackDisplay({ stack, activeIndex }: StackDisplayProps) {
  return (
    <div className="flex flex-col items-center mt-8">
      <h3 className="text-xl font-semibold mb-4">Stack (Top to Bottom)</h3>

      <div className="flex flex-col-reverse justify-start items-center w-32 min-h-[300px] border-2 border-dashed border-gray-400 rounded-lg p-4 bg-white dark:bg-gray-800 relative overflow-y-auto">
        {stack.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Stack is empty</p>
        ) : (
          stack.map((item, index) => (
            <div
              key={index}
              className={`w-24 h-14 flex items-center justify-center rounded-md mb-2 text-lg font-semibold shadow-md transition-all duration-300 ${
                index === activeIndex ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {item}
            </div>
          ))
        )}

        {/* Stack Top Label */}
        {stack.length > 0 && (
          <div className="absolute top-2 right-2 text-xs bg-purple-500 text-white px-2 py-1 rounded">
            Top
          </div>
        )}
      </div>
    </div>
  );
}
