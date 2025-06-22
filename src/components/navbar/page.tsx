
'use client'

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import clsx from "clsx"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "../ThemeToggle/page"
import { useTheme } from "next-themes"
import { FaGithub } from "react-icons/fa"

const socials = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com/annuk123/algoflow",
  },
]

type NavbarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()


  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useMotionValueEvent(useScroll().scrollY, "change", (latest) => {
    setScrolled(latest > 10)
  })

  if (!mounted) return null // Avoid hydration mismatch

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed top-4 left-1/2 z-80 -translate-x-1/2 w-[95%] max-w-5xl px-4 sm:px-6 py-2 rounded-full transition-all",
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
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
            Algo<span className="text-foreground">Flux</span>
          </span>
        </Link>

        {/* Desktop search */}
        <div className="hidden sm:flex w-full sm:max-w-md items-center space-x-2 mx-4">
          <Input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-gray-300"
          />
          <Search className="w-6 h-6 text-gray-400" />
        </div>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {socials.map(({ name, icon, href }, i) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition transform hover:scale-125"
              whileHover={{ scale: 1.2 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: i * 0.05,
              }}
              aria-label={name}
            >
              {icon}
            </motion.a>
          ))}
          <ThemeToggle />
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden ">
        <ThemeToggle />
        </div>
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-full transition hover:bg-zinc-800"
          aria-label="Toggle Mobile Menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-zinc-200" />
          ) : (
            <Menu className="w-6 h-6 text-zinc-200" />
          )}
        </button>
        
      </div>

      {/* menu toggle */}


      {/* Mobile Menu Content */}
      {mobileOpen && (
  <div
    className={clsx(
      "fixed top-0 left-0 z-50 h-full w-full bg-background shadow-2xl flex flex-col md:hidden"
    )}
  >
    <div className="flex justify-end p-4">
      <button
        onClick={() => setMobileOpen(false)}
        className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
        aria-label="Close Mobile Menu"
      >
        <X className="w-6 h-6 text-zinc-800 dark:text-zinc-100" />
      </button>
    </div>

    <div className="flex flex-col gap-5 w-full px-10 pb-10 dark:bg-gray-900 bg-gray-100 rounded-lg min-h-[80vh]">
      <div className="flex items-center space-x-2 py-9">
        <Input
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-gray-300 "
        />
        <Search className="w-6 h-6 text-gray-400" />
      </div>

      <div className="flex items-center space-x-4 text-xl">
        {socials.map(({ name, icon, href }, i) => (
          <motion.a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: i * 0.05,
            }}
            aria-label={name}
          >
            {icon}
            <span className="sm:inline text-base">{name}</span>
          </motion.a>
        ))}
      </div>

      {/* <ThemeToggle /> */}
    </div>
  </div>
)}

    </motion.nav>
  )
}
