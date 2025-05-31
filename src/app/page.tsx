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

  const features = [
  {
    title: "Visualize Algorithms",
    description: "Experience step-by-step animations for Bubble, Merge, Quick Sort, and more. Watch your code come alive with every comparison and swap.",
    video: "https://res.cloudinary.com/your/video.mp4",
    poster: "https://res.cloudinary.com/your/image.jpg",
  },
  {
    title: "Striver DSA Visualizer",
    description: "Follow Striver’s legendary DSA roadmap with structured, interactive visual learning and practice tools.",
    video: "https://res.cloudinary.com/your/striver.mp4",
    poster: "https://res.cloudinary.com/your/striver-thumbnail.jpg",
  },
  {
    title: "Explore Problems by Topic",
    description: "Browse hundreds of DSA problems categorized by topic and difficulty. Focus on what you need to improve.",
    video: "https://res.cloudinary.com/your/topic.mp4",
    poster: "https://res.cloudinary.com/your/topic-thumbnail.jpg",
  },
  {
    title: "Practice & Run Code",
    description: "Built-in code editor lets you solve problems and run test cases without switching tabs.",
    video: "https://res.cloudinary.com/your/code.mp4",
    poster: "https://res.cloudinary.com/your/code-thumbnail.jpg",
  },
  {
    title: "Favorites & Bookmarks",
    description: "Bookmark tricky problems to revisit later. Build your own custom problem lists.",
    video: "https://res.cloudinary.com/your/bookmark.mp4",
    poster: "https://res.cloudinary.com/your/bookmark-thumbnail.jpg",
  },
  {
    title: "Continue Where You Left Off",
    description: "We automatically remember what you were practicing so you can jump right back in.",
    video: "https://res.cloudinary.com/your/continue.mp4",
    poster: "https://res.cloudinary.com/your/continue-thumbnail.jpg",
  },
];


  return (
    <main className="flex z-10 flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
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
    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient"> beautiful, interactive visual stories.</span> Learn smarter, practice faster, master deeper.
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

<div className="relative flex items-center justify-center text-center -top-30 py-32 bg-white dark:bg-background overflow-hidden">
  {/* Background Overlay (optional) */}
  <div className="absolute inset-0 z-0" />

  {/* Centered Video */}
  <div className="relative z-10 max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl">
    <video
      src="https://res.cloudinary.com/dpiobntr2/video/upload/v1746568505/hgcfgtwqa2bgtq3wyyuu.mp4"
      className="w-full h-auto object-cover"
      autoPlay
      muted
      loop
      playsInline
    />
  </div>

  {/* Optional Animation Styles */}
  <style jsx>{`
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.8s ease-out forwards;
    }

    .delay-100 {
      animation-delay: 0.1s;
    }
  `}</style>
</div>
{/* 
<section className="relative px-6 md:px-20 py-32 bg-background text-foreground">
  <motion.h2
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-5xl font-bold text-center mb-20"
  >
    Unlock The <span className="text-primary">Full Potential</span> of AlgoFlow
  </motion.h2>

  <div className="flex flex-col gap-32">
    {features.map((feature, index) => {
      const isReversed = index % 2 !== 0;

      return (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`flex flex-col-reverse md:flex-row ${
            isReversed ? "md:flex-row-reverse" : ""
          } items-center gap-12`} */}
        {/* > */}
          {/* Text */}
          {/* <div className="md:w-1/2 text-center md:text-left space-y-4">
            <h3 className="text-3xl font-semibold text-primary">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-lg">
              {feature.description}
            </p>
          </div> */}

          {/* Video with Poster Thumbnail */}
          {/* <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-xl">
            <video
              src={feature.video}
              poster={feature.poster}
              className="w-full h-auto object-cover rounded-xl"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </motion.div>
      );
    })}
  </div>
</section> */}

      {/* Footer */}
      <Footer />
    </main>
  );
}
