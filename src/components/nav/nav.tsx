"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle/page";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { DropMenuMain } from "../dropdown/page";

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  

  useMotionValueEvent(useScroll().scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  // Fix hydration mismatch for ThemeToggle
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        "fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 sm:px-6 w-[95%] max-w-5xl transition-all",
        "backdrop-blur-lg border shadow-md",
        theme === "light"
          ? "bg-white/70 border-gray-200 shadow-gray-300/40"
          : "bg-zinc-900/60 border-zinc-700 shadow-zinc-800/40",
        scrolled &&
          (theme === "light"
            ? "bg-white/90 border-gray-300"
            : "bg-zinc-900/80 border-zinc-700 shadow-lg")
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-2 sm:px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition"
          >
            <div>
          Algo<span className="text-primary">Flow</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative font-medium transition-colors",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              >
              {item.label}
            </Link>
          ))}
          <DropMenuMain />
          <Button size="lg" className="rounded-full">
            Login
          </Button>
          {mounted && <ThemeToggle />}
        </div>

        {/* Mobile Menu Toggle */}
{/* Mobile Hamburger Toggle */}
<div className="md:hidden flex items-center gap-2">
  {mounted && <ThemeToggle />}
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setIsOpen(!isOpen)}
    className="hover:bg-accent/30 rounded-full transition"
  >
    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </Button>
</div>

{/* Full Screen Mobile Menu */}
<motion.div
  initial={false}
  animate={isOpen ? "open" : "closed"}
  variants={{
    open: { opacity: 1, y: 0, pointerEvents: "auto" },
    closed: { opacity: 0, y: -20, pointerEvents: "none" },
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className={clsx(
    "fixed inset-0 top-20 z-40 md:hidden flex flex-col items-center justify-start bg-background/95 backdrop-blur-lg px-6 py-8 space-y-6 rounded-2xl mx-4 shadow-2xl border border-border",
    scrolled && "top-16"
  )}
>
  {navItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={() => setIsOpen(false)}
      className="text-xl font-semibold text-muted-foreground hover:text-primary transition-all"
    >
      {item.label}
    </Link>
  ))}
  <DropMenuMain />
  <Button
    className="w-full rounded-full mt-4 hover:scale-[1.03] transition"
    onClick={() => setIsOpen(false)}
  >
    Get Started
  </Button>
  {/* <div className="max-h-64 overflow-y-auto">
  <DropMenuMain />
</div> */}
</motion.div>
      </div>
    </motion.nav>
  );
}

const navItems = [
  { label: "Home", href: "/" },
];
