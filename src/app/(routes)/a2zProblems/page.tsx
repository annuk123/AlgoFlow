// "use client";

// import { useState } from "react";
// import { A2ZProblemCard } from "@/components/a2zProblems/ProblemCardA2Z";
// import a2zProblems from "@/seed/a2zProblems.json";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import Navbar from "@/components/nav/nav";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// type Problem = {
//   slug: string;
//   id?: number;
//   title: string;
//   description: string;
//   topic: string;
//   difficulty: string;
//   tags?: string[];
//   step: string;
// };

// const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

// export default function A2ZProblems() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProblems = a2zProblems.filter(
//     (problem) =>
//       problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (problem.tags && problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
//   );

//   return (
//     <section className="py-20 ml-6">
//       <Navbar />
//       <div className="px-6">
//         <h1 className="text-3xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
//           Explore A2Z DSA Problems
//         </h1>

//         <input
//           type="text"
//           placeholder="🔍 Search by title or tag..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md mb-8"
//         />

//         <Accordion type="multiple" className="w-full">
//           {steps.map((step) => (
//             <AccordionItem key={step} value={step}>
//               <AccordionTrigger className="text-xl font-semibold">{step}</AccordionTrigger>
//               <AccordionContent>
//                 <Tabs defaultValue="easy" className="w-full">
//                   <TabsList>
//                     <TabsTrigger value="easy">🟢 Easy</TabsTrigger>
//                     <TabsTrigger value="medium">🟠 Medium</TabsTrigger>
//                     <TabsTrigger value="hard">🔴 Hard</TabsTrigger>
//                   </TabsList>

//                   {["easy", "medium", "hard"].map((level) => (
//                     <TabsContent key={level} value={level}>
//                       <ProblemGrid
//                         problems={filteredProblems.filter(
//                           (p) =>
//                             p.step === step &&
//                             p.difficulty.toLowerCase() === level.toLowerCase()
//                         )}
//                       />
//                     </TabsContent>
//                   ))}
//                 </Tabs>
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </section>
//   );
// }

// function ProblemGrid({ problems }: { problems: Problem[] }) {
//   if (problems.length === 0) {
//     return <p className="text-gray-500 mt-2">No problems found.</p>;
//   }

//   return (
//     <div className="flex flex-col gap-4 mt-4">
//       {problems.map((problem) => (
//         <A2ZProblemCard
//           key={problem.slug}
//           id={problem.slug}
//           title={problem.title}
//           description={problem.description}
//           difficulty={problem.difficulty}
//           tags={problem.tags ?? []}
//         />
//       ))}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import a2zProblems from "@/seed/a2zProblems.json";
import { A2ZProblemCard } from "@/components/a2zProblems/ProblemCardA2Z";

// Extract unique steps with step and stepTitle
const steps = Array.from(
  new Map(
    a2zProblems.map(p => [p.step, { step: p.step, stepTitle: p.stepTitle }])
  ).values()
);


export default function A2ZProblemScreen() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

const topicsInStep = activeStep
  ? Array.from(
      new Map(
        a2zProblems
          .filter(p => p.step === activeStep)
          .map(p => [p.topic, { topic: p.topic, topicTitle: p.topicTitle }])
      ).values()
    )
  : [];


  const problemsToShow = a2zProblems.filter(
    p => p.step === activeStep && p.topic === activeTopic
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Striver A2Z DSA Problems</h1>

      {/* Step Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map(({ step, stepTitle }) => (
          <button
            key={step}
            onClick={() => {
              setActiveStep(step);
              setActiveTopic(null);
            }}
            className={`w-full md:w-[200px] text-left px-5 py-4 rounded-2xl border shadow-sm transition-all duration-300
              ${
                activeStep === step
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white scale-105 shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
          >
            <p className="font-bold text-md">{step}</p>
            <p className="text-sm text-gray-700">{stepTitle}</p>
          </button>
        ))}
      </div>

      {/* Topics in selected step */}
      {activeStep && (
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
{topicsInStep.map(({ topic, topicTitle }) => (
  <button
    key={topic}
    onClick={() => setActiveTopic(topic)}
    className={`px-4 py-2 rounded-xl min-w-[180px] text-center border transition duration-300
      ${
        activeTopic === topic
          ? "bg-green-600 text-white shadow-md scale-105"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      }`}
  >
    <p className="text-sm font-semibold">{topic}</p>
    <p className="text-xs text-muted-foreground">{topicTitle}</p>
  </button>
))}


        </div>
      )}

      {/* Problems */}
      {/* {activeStep && activeTopic && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {problemsToShow.map(p => (
            <A2ZProblemCard
              key={p.slug}
              id={p.slug}
              title={p.title}
              description={p.description}
              difficulty={p.difficulty as "Easy" | "Medium" | "Hard"}
              tags={p.tags || []}
            />
          ))}
        </div>
      )} */}
      {activeStep && activeTopic && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {problemsToShow.length > 0 ? (
      problemsToShow.map(p => (
        <A2ZProblemCard
          key={p.slug}
          id={p.slug}
          title={p.title}
          description={p.description}
          difficulty={p.difficulty as "Easy" | "Medium" | "Hard"}
          tags={p.tags || []}
        />
      ))
    ) : (
      <p className="text-center col-span-full text-muted-foreground">
        No problems found for this topic.
      </p>
    )}
  </div>
)}

    </div>
  );
}
