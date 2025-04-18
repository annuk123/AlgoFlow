// app/page.tsx
'use client'
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "./components/navbar/page"
import Link from "next/link"
import { slugify } from "@/lib/utils" // You'll define this function

const problemsList = [
  { title: "Maximum Subarray", tags: ["Array", "DP"] },
  { title: "Binary Search on Rotated Array", tags: ["Binary Search"] },
  { title: "Valid Parentheses", tags: ["Stack"] },
  { title: "Climbing Stairs", tags: ["DP"] },
  { title: "Longest Substring Without Repeating Characters", tags: ["String"] },
  { title: "Dijkstra's Algorithm", tags: ["Graph"] },
]

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProblems, setFilteredProblems] = useState(problemsList)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = searchQuery.toLowerCase()
      const filtered = problemsList.filter((problem) => {
        const matchesQuery = problem.title.toLowerCase().includes(query)
        const matchesTags =
          selectedTags.length === 0 || selectedTags.some((tag) => problem.tags.includes(tag))
        return matchesQuery && matchesTags
      })
      setFilteredProblems(filtered)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchQuery, selectedTags])

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      {/* Problems list */}
      <div className="mt-32 w-full pt-4 px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
        {filteredProblems.map((problem) => (
  <Link key={problem.title} href={`/problems/${slugify(problem.title)}`}>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border p-4 shadow-md hover:shadow-lg transition bg-muted/20 cursor-pointer"
    >
      <div className="font-medium text-lg">{problem.title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  </Link>
))}

        </AnimatePresence>
      </div>
    </>
  )
}
