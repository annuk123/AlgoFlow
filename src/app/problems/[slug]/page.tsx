import { notFound } from "next/navigation"

const problemsList = [
  { title: "Maximum Subarray", tags: ["Array", "DP"], content: "Kadane’s Algorithm explanation..." },
  { title: "Binary Search on Rotated Array", tags: ["Binary Search"], content: "Binary search in rotated array..." },
  // Add full content per problem here
]

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
}

export default function ProblemPage({ params }: { params: { slug: string } }) {
  const problem = problemsList.find((p) => slugify(p.title) === params.slug)

  if (!problem) return notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
      <div className="mb-2 flex gap-2">
        {problem.tags.map((tag) => (
          <span key={tag} className="text-sm bg-muted px-2 py-1 rounded-full text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-lg mt-4">{problem.content}</p>
    </div>
  )
}
