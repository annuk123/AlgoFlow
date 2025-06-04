// "use client";

// import Link from "next/link";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, Clock } from "lucide-react";
// import { motion } from "framer-motion";

// interface A2ZProblemCardProps {
//   id: string;
//   title: string;
//   difficulty: string;
//   tags: string[];
//   description: string;
//   solved?: boolean;
//   estimatedTime?: string;
// }

// export const A2ZProblemCard = ({
//   id,
//   title,
//   difficulty,
//   tags,
//   description,
//   solved = false,
//   estimatedTime,
// }: A2ZProblemCardProps) => {
//   // Auto-estimate based on difficulty if not provided
//   estimatedTime =
//     estimatedTime ||
//     (difficulty === "Easy"
//       ? "10 min"
//       : difficulty === "Medium"
//       ? "20 min"
//       : "30+ min");

//   return (
//     <motion.div
//       whileHover={{ scale: 1.015, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)" }}
//       whileTap={{ scale: 0.985 }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="w-full px-4 py-5 border rounded-lg bg-background shadow-sm flex items-center justify-between gap-6 hover:bg-muted/50 transition-all duration-300"
//     >
//       {/* Left Side */}
//       <div className="flex-1 flex flex-col gap-2">
//         <div className="flex items-center gap-3 text-sm text-muted-foreground">
//           {solved && (
//             <span className="flex items-center gap-1 text-green-600">
//               <CheckCircle size={16} /> Solved
//             </span>
//           )}
//           <span className="flex items-center gap-1">
//             <Clock size={16} /> {estimatedTime}
//           </span>
//         </div>

//         <Link href={`/a2zProblems/${id}`} className="group">
//           <h2 className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient group-hover:underline transition-all duration-300">
//             {title}
//           </h2>
//         </Link>

//         <p className="text-sm text-muted-foreground line-clamp-2">
//           {description}
//         </p>

//         <div className="flex flex-wrap gap-2 mt-1">
//           {tags.map((tag) => (
//             <Badge
//               key={tag}
//               variant="secondary"
//               className="rounded-full text-xs hover:scale-105 transition-transform"
//             >
//               {tag}
//             </Badge>
//           ))}
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="flex flex-col items-end gap-3 min-w-[140px]">
//         <Badge
//           variant="outline"
//           className={`text-xs font-medium px-2 py-1 rounded-full transition-colors duration-300 ${
//             difficulty === "Easy"
//               ? "border-green-600 text-green-700"
//               : difficulty === "Medium"
//               ? "border-yellow-600 text-yellow-700"
//               : "border-red-600 text-red-700"
//           }`}
//         >
//           {difficulty}
//         </Badge>
//         <Link href={`/problems/${id}`}>
//           <Button
//             variant="ghost"
//             className="px-2 h-8 text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient hover:scale-105 transition-transform"
//           >
//             Code Visualize →
//           </Button>
//         </Link>
//       </div>
//     </motion.div>
//   );
// };


"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface A2ZProblemCardProps {
  id: string;          // slug (used in URL)
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  description: string;
  solved?: boolean;
  estimatedTime?: string;
}

export const A2ZProblemCard = ({
  id,
  title,
  difficulty,
  tags,
  description,
  solved = false,
  estimatedTime,
}: A2ZProblemCardProps) => {
  // Auto estimate based on difficulty if not provided
  const estimated = estimatedTime ?? 
    (difficulty === "Easy" ? "10 min" : difficulty === "Medium" ? "20 min" : "30+ min");

  // Difficulty badge colors
  const difficultyStyles = {
    Easy: "border-green-600 text-green-700",
    Medium: "border-yellow-600 text-yellow-700",
    Hard: "border-red-600 text-red-700",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full px-6 py-5 border rounded-xl bg-background shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-muted/40 transition-all duration-300"
    >
      {/* Left content */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {solved && (
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <CheckCircle size={18} /> Solved
            </span>
          )}
          <span className="flex items-center gap-1 font-medium">
            <Clock size={18} /> {estimated}
          </span>
        </div>

        <Link href={`/a2zProblems/${id}`} className="group">
          <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent group-hover:underline transition-all duration-300">
            {title}
          </h2>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full text-xs hover:scale-110 transition-transform"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Right content */}
      <div className="flex flex-col items-end gap-4 min-w-[150px]">
        <Badge
          variant="outline"
          className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300 ${difficultyStyles[difficulty]}`}
        >
          {difficulty}
        </Badge>
        <Link href={`/a2zProblems/${id}`}>
          <Button
            variant="ghost"
            className="px-3 h-9 text-sm tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient hover:scale-110 transition-transform"
          >
            Solve & Visualize →
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
