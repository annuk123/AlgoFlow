// components/navbar/page.tsx
'use client'

import { useTheme } from "next-themes"
import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Moon, Sun, Menu, X, Filter, Search } from "lucide-react"
import clsx from "clsx"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const categories = ["Array", "Graph", "DP", "Stack", "Greedy", "String", "Binary Search"]

type NavbarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  selectedTags: string[]
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
}: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(useScroll().scrollY, "change", (latest) => {
    setScrolled(latest > 10)
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 w-[95%] max-w-5xl transition-all",
        "backdrop-blur-lg border bg-zinc-900/60 shadow-xl",
        scrolled && "border-zinc-700 bg-zinc-900/80 shadow-zinc-800/40"
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
            Algo<span className="text-foreground">Flow</span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex w-full sm:max-w-md items-center space-x-2">
          <Input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-gray-300"
          />
          <Search className="w-8 h-8 text-gray-300" />
        </div>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-1.5 transition hover:bg-zinc-800"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-blue-400" />
            )}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-full transition hover:bg-zinc-800"
          aria-label="Toggle Mobile Menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-zinc-200" /> : <Menu className="w-5 h-5 text-zinc-200" />}
        </button>
      </div>
    </motion.nav>
  )
}
