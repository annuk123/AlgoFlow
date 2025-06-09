"use client";

interface OperationLogProps {
  log: string[];
}

export default function OperationLog({ log }: OperationLogProps) {
  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-50 dark:bg-gray-900 max-h-48 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-3">Operation Log</h2>
      {log.length === 0 ? (
        <p className="text-gray-500 italic">No operations performed yet.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {log.map((entry, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-300">
              {entry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
