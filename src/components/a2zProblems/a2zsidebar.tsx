type SidebarProps = {
  selectedStep: string | null;
  setSelectedStep: (step: string | null) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (diff: string | null) => void;
};

export default function Sidebar({
  selectedStep,
  setSelectedStep,
  selectedDifficulty,
  setSelectedDifficulty,
}: SidebarProps) {
  const steps = [
    { id: "step-1", title: "Step 1" },
    { id: "step-2", title: "Step 2" },
    { id: "step-3", title: "Step 3" },
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  function toggleStep(id: string) {
    setSelectedDifficulty(null);
    setSelectedStep(selectedStep === id ? null : id);
  }

  return (
    <aside className="w-64   h-full p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Striver&apos;s DSA</h2>

      <div>
        <h3 className="text-lg font-medium mb-2">Steps</h3>
        {steps.map((step) => (
          <div key={step.id} className="mb-2">
            <button
              onClick={() => toggleStep(step.id)}
              className={`w-full flex justify-between items-center p-2 rounded-md font-semibold
                ${selectedStep === step.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
            >
              {step.title}
              <span>{selectedStep === step.id ? "▼" : "▶"}</span>
            </button>

            {selectedStep === step.id && (
              <div className="mt-1 flex space-x-2 px-4">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`text-sm px-3 py-1 rounded-full border
                      ${
                        selectedDifficulty === diff
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
