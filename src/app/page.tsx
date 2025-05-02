"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/page";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // run only on client
  }, []);

  if (!isMounted) return null; // 🛡️ Avoid SSR hydration issues

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 relative overflow-hidden min-h-[90vh]">
  {/* Animated Background Blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 2 }}
      className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-primary to-secondary rounded-full blur-3xl opacity-40 animate-pulse"
    />
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 2, delay: 0.7 }}
      className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-secondary to-primary rounded-full blur-3xl opacity-40 animate-pulse"
    />
  </div>

  {/* Content */}
  <motion.h1 
    initial={{ opacity: 0, y: -60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient"
  >
    Visualize Your <br />
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
      DSA Journey
    </span> 
    Like Never Before
  </motion.h1>

  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
  >
    Welcome to <span className="font-semibold text-primary">AlgoFlow</span> — where complex algorithms turn into 
    <span className="font-semibold text-secondary"> beautiful, interactive visual stories.</span> Learn smarter, practice faster, master deeper.
  </motion.p>

  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.6 }}
  >
    <Button 
      size="lg" 
      className="rounded-full px-8 py-6 text-lg shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all hover:scale-110 duration-300"
    >
      Get Started
    </Button>
  </motion.div>
</section>


      {/* Footer */}
      {/* <footer className="py-6 text-center text-xs text-muted-foreground">
        © 2025 AlgoFlow. Built with ❤️
      </footer> */}
      <Footer />
    </main>
  );
}
