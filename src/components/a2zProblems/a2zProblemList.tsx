// "use client";

// import { useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export function A2ZProblemList() {
//   const a2zProblems = useQuery(api.a2zProblems.getA2ZProblems);

//   if (!a2zProblems) return <p>Loading...</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {a2zProblems.map((problem) => (
//         <Card key={problem._id} className="p-4 space-y-2">
//           <h2 className="text-lg font-semibold">{problem.title}</h2>
//           <p className="text-sm text-muted-foreground">{problem.topic} • {problem.difficulty}</p>
//           <Button asChild variant="link">
//             <a href={`/a2zProblems/${problem.slug}`} target="_blank" rel="noopener noreferrer">Solve</a>
//           </Button>
//         </Card>
//       ))}
//     </div>
//   );
// }


