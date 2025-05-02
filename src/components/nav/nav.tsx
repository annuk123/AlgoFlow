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
import { AnimatePresence } from "framer-motion";
import {
  FaGithub,
} from "react-icons/fa";

const socials = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com/annuk123/algoflow",
  },
]


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
        <Link href="/" className="flex-shrink-0">
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
            Algo<span className="text-foreground">Flow</span>
          </span>
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

          {/* Feedback */}
          <Link
          href={"../../comingSoon"}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            FeedBack
          </Link>

          {/* Contact */}
          <Link
          href={"../../comingSoon"}
          // href={"/contact"}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
           <div className="flex gap-5 text-xl">
                    {socials.map(({ name, icon, href }, i) => (
                      <motion.a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition transform hover:scale-125"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.05 }}
                        aria-label={name}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
          {mounted && <ThemeToggle />}
        </div>
        

        {/* Mobile Menu Toggle */}
{/* Mobile Hamburger Toggle */}


<div className="md:hidden flex items-center gap-2">
   <div className="flex gap-5 text-xl">
            {socials.map(({ name, icon, href }, i) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition transform hover:scale-125"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.05 }}
                aria-label={name}
              >
                {icon}
              </motion.a>
            ))}
          </div>
  {mounted && <ThemeToggle />}
  
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setIsOpen(!isOpen)}
    className="hover:bg-accent/30 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring"
    aria-label="Toggle menu"
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={isOpen ? "close" : "menu"}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.div>
    </AnimatePresence>
  </Button>
</div>

{/* Full Screen Mobile Menu */}

<motion.div
  initial={{ x: "-100%" }}
  animate={{ x: isOpen ? 0 : "-100%" }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className={clsx(
    "fixed top-0 left-0 z-50 h-full w-[80%] max-w-sm bg-background shadow-2xl flex flex-col md:hidden"
  )}
>
  {/* Inner Content with Blurred Dark Backdrop */}
  {/* <div className="flex flex-col h-full p-6 bg-purple-50 backdrop-blur-sm rounded-r-2xl"> */}
    <div className="flex flex-col gap-5 w-full mt-10 p-10 bg-gray-100 dark:bg-gray-950 rounded-lg min-h-80vh">
      {/* Links */}
      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </Link>
      <Link
        href="../../comingSoon"
        onClick={() => setIsOpen(false)}
        className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        Feedback
      </Link>
      <Link
        href="../../comingSoon"
        onClick={() => setIsOpen(false)}
        className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        Contact
      </Link>

      {/* Drop menu */}
      <DropMenuMain />

      {/* Footer */}
      <div className="pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">© 2025 Codexio</p>
      </div>
    {/* </div> */}
  </div>
</motion.div>


      </div>
    </motion.nav>
  );
}

const navItems = [
  { label: "Home", href: "/" },
];
