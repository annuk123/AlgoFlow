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



const problemTopics: { title: string; href: string; description: string }[] = [
  {
    title: "Striver A2Z DSA Sheet",
    href: "../../a2zProblems",
    description: "Visualize and solve curated problems from Striver's DSA Sheet.",
  },

  {
    title: "Striver SDE Sheet",
    href: "../../comingSoon",
    description: "Learn, visualize and solve problems from Striver's SDE Sheet.",
  },
{
    title: "Striver 79 Sheet",
    href: "../../comingSoon",
    description: "Master 79 essential problems for coding interviews with visual explanations.",
  },

  {
    title: "Top Interview Questions",
    href: "../../comingSoon",
    description: "Practice and visualize solutions to the most asked interview problems.",
  },
  {
    title: "Blind 75 Sheet",
    href: "../../comingSoon",
    description: "Master essential problems every software engineer must know.",
  }
];

export function DropMenuMain() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Getting Started Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="grid gap-4 p-4 w-[80vw] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">

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

              <ListItem href="../../comingSoon" title="Introduction">
                Get an overview of how AlgoFlow helps you master DSA visually.
              </ListItem>
              <ListItem href="../dashboard/visualizer" title="Algorithm Visualizer">
                Visualize and master DSA algorithms and problems Interactively
              </ListItem>
              <ListItem href="../../problems" title="Problem Visualizer">
                Solve top curated DSA Problem with step-by-step interactive explanation.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


<NavigationMenuItem>
          <NavigationMenuTrigger>Problems</NavigationMenuTrigger>
          <NavigationMenuContent>
          <div className="grid gap-6 p-4 w-[80vw] md:w-[400px] lg:w-[500px]">
              <div>
                <h3 className="mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wide">Problem Visualizer</h3>
                <ul className="grid gap-4">
                  {problemTopics.map((topic) => (
                    <ListItem key={topic.title} title={topic.title} href={topic.href} className="block select-none space-y-1 rounded-md p-4 text-left leading-none no-underline outline-none transition hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground
">
                      {topic.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>


      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemProps = {
  href: string; // <- Must be a string, cannot be undefined
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
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
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


