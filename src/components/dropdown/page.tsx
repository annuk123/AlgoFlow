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
import Image from "next/image";



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
      className="relative flex h-full w-full flex-col justify-end rounded-2xl overflow-hidden shadow-md group transition-all duration-300 hover:scale-[1.02]"
    >
      {/* 🌄 Background Image */}
     <Image
  src="/algoflows.png"
  alt="AlgoFlow Banner"
  width={500} // You can adjust as needed
  height={800}
  className="absolute inset-0 w-full h-full object-cover z-0"
/>

      {/* 🎨 Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80 z-10" />

      {/* ✨ Text Content */}
      <div className="relative z-20 p-6 space-y-2">
        <h2 className="text-3xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">
          Algo<span className="text-white">Flow</span>
        </h2>
        <p className="text-sm text-gray-300">
          A modern platform to visualize and master DSA algorithms with code.
        </p>
      </div>
    </Link>
  </NavigationMenuLink>
</li>


            <ListItem href="/about" title="Introduction">
  Get an overview of how AlgoFlow helps you master DSA visually.
</ListItem>

<ListItem href="/dashboard/visualizer" title="Algorithm Visualizer">
  Visualize and master DSA algorithms and problems interactively
</ListItem>

<ListItem href="/problems" title="Problem Visualizer">
  Solve top curated DSA Problems with step-by-step interactive explanation.
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
                    <ListItem key={topic.title} title={topic.title} href={topic.href} className="block select-none space-y-1 rounded-md p-4 text-left leading-none no-underline outline-none transition hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-gradient-to-r from-indigo-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient
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
          <div className="text-base font-semibold leading-none bg-gradient-to-r from-indigo-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">{title}</div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


