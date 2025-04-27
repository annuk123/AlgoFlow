"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const algorithmTopics: { title: string; href: string; description: string }[] = [
  {
    title: "Sorting Algorithms",
    href: "/visualizer/sorting",
    description: "Visualize Bubble Sort, Merge Sort, Quick Sort, and more.",
  },
  {
    title: "Searching Algorithms",
    href: "/visualizer/searching",
    description: "Explore Binary Search, Linear Search, and related techniques.",
  },
  {
    title: "Graph Algorithms",
    href: "/visualizer/graph",
    description: "Visualize BFS, DFS, Dijkstra’s Algorithm, and more.",
  },
  {
    title: "Dynamic Programming",
    href: "/visualizer/dp",
    description: "Understand dynamic programming with step-by-step visuals.",
  },

];

const problemTopics: { title: string; href: string; description: string }[] = [
  {
    title: "Striver DSA Sheet",
    href: "/problems/striver-sheet",
    description: "Visualize and solve curated problems from Striver's DSA Sheet.",
  },
  {
    title: "Top Interview Questions",
    href: "/problems/top-interview",
    description: "Practice and visualize solutions to the most asked interview problems.",
  },
  {
    title: "Blind 75 Problems",
    href: "/problems/blind-75",
    description: "Master essential problems every software engineer must know.",
  },
  {
    title: "LeetCode Patterns",
    href: "/problems/leetcode-patterns",
    description: "Learn and visualize popular patterns to crack LeetCode.",
  },
];

export function DropMenuMain() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Getting Started Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="flex h-full w-full flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none transition hover:shadow-lg"
                  >
                    <div className="mb-2 mt-4 text-lg font-semibold">AlgoFlow</div>
                    <p className="text-sm text-muted-foreground">
                      A modern platform to visualize and master DSA algorithms with code.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              <ListItem href="/docs" title="Introduction">
                Get an overview of how AlgoFlow helps you master DSA visually.
              </ListItem>
              <ListItem href="../dashboard/visualizer" title="Algorithm Visualizer">
                Visualize and master DSA algorithms and problems Interactively
              </ListItem>
              <ListItem href="/docs/algorithms" title="Problem Visualizer">
                Solve top curated DSA Problem with step-by-step interactive explanation.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


<NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-6 p-6 md:w-[600px] lg:w-[700px] md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wide">Algorithm Visualizer</h3>
                <ul className="grid gap-4">
                  {algorithmTopics.map((topic) => (
                    <ListItem key={topic.title} title={topic.title} href={topic.href}>
                      {topic.description}
                    </ListItem>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wide">Problem Visualizer</h3>
                <ul className="grid gap-4">
                  {problemTopics.map((topic) => (
                    <ListItem key={topic.title} title={topic.title} href={topic.href}>
                      {topic.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <Link href="/contact" passHref legacyBehavior>
            <NavigationMenuLink className="block rounded-md p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
}

// List Item Component
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
            "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
