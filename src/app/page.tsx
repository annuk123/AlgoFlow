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

  // Define the features array
  const features = [
    {
      title: "Interactive Algorithm Visualizations",
      description: "Watch algorithms come to life with step-by-step animations and intuitive controls. Perfect for visual learners and curious minds.",
      video: "https://player.cloudinary.com/embed/?cloud_name=dpiobntr2&public_id=tvxsdo63ztf9ck84u67t&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false",
      poster: "https://res.cloudinary.com/dpiobntr2/image/upload/v1746568505/algoflow_poster1.png"
    },
    {
      title: "LeetCode Problem Practice",
      description: "Tackle real coding challenges with our integrated LeetCode problem set. Visualize solutions and track your progress effortlessly.",
      video: "https://player.cloudinary.com/embed/?cloud_name=dpiobntr2&public_id=tvxsdo63ztf9ck84u67t&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false",
      poster: "https://res.cloudinary.com/dpiobntr2/image/upload/v1746568505/algoflow_poster2.png"
    },
    {
      title: "Striver's A2Z DSA Problems",
      description: "Master the fundamentals with Striver's A2Z DSA problems. Visualize each step and build a solid foundation in data structures and algorithms.",
      video: "https://player.cloudinary.com/embed/?cloud_name=dpiobntr2&public_id=igr5dsg3bgkfyvwyomte&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false",
      poster: "https://res.cloudinary.com/dpiobntr2/image/upload/v1746568505/algoflow_poster3.png"
    }
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
  <div className="relative z-10 max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl group transition-transform duration-500 hover:scale-[1.015] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]">
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
  <iframe
    src="https://player.cloudinary.com/embed/?cloud_name=dpiobntr2&public_id=ryle30glfgbeawtdqqli&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false"
    allow="autoplay; fullscreen"
    className="w-full aspect-video object-cover"
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
          } items-center gap-12`}
         > 
          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left space-y-4">
            <h3 className="text-3xl font-semibold text-primary">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-lg">
              {feature.description}
            </p>
          </div>

          {/* Video with Poster Thumbnail */}
          <div className="md:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl group relative transition-transform duration-500 hover:scale-[1.015] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]">
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

  <iframe
    src={feature.video}
    className="w-full aspect-video object-cover rounded-3xl z-0"
    allow="autoplay; fullscreen"
  />
</div>

        </motion.div>
      );
    })}
  </div>
</section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
