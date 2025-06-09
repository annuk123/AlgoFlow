"use client";

type OperationLogProps = {
  log: string[];
};

export default function OperationLog({ log }: OperationLogProps) {
  return (
    <section className="border p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm max-h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 text-center">Operation Log</h2>
      
      {log.length === 0 ? (
        <p className="text-gray-500 text-center">No operations yet.</p>
      ) : (
        <ul className="space-y-2">
          {log.map((entry, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              • {entry}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
