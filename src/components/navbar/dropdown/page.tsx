"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const dsaTopics: { title: string; href: string; description: string }[] = [
  {
    title: "Sorting Algorithms",
    href: "/visualizer/sorting",
    description: "Explore various sorting algorithms like Quick Sort, Merge Sort, etc.",
  },
  {
    title: "Searching Algorithms",
    href: "/visualizer/searching",
    description: "Visualize searching algorithms like Binary Search, Linear Search, etc.",
  },
  {
    title: "Graph Algorithms",
    href: "/visualizer/graph",
    description: "Explore graph traversal algorithms like BFS, DFS, and others.",
  },
  {
    title: "Dynamic Programming",
    href: "/visualizer/dp",
    description: "Visualize dynamic programming techniques for problem-solving.",
  },
  {
    title: "Greedy Algorithms",
    href: "/visualizer/greedy",
    description: "Learn about greedy algorithms for optimization problems.",
  },
  {
    title: "Backtracking",
    href: "/visualizer/backtracking",
    description: "Visualize backtracking algorithms and solve problems step by step.",
  },
]

export function DropMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      DSA Code Visualizer
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A platform to visualize and learn various DSA algorithms.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Learn the basics of the DSA Visualizer app.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to  use the DSA Visualizer app.
              </ListItem>
              <ListItem href="/docs/algorithms" title="Algorithms">
                Explore a variety of algorithms available for visualization.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>DSA Topics</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {dsaTopics.map((topic) => (
                <ListItem
                  key={topic.title}
                  title={topic.title}
                  href={topic.href}
                >
                  {topic.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className="block select-none rounded-md p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
