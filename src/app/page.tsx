"use client";

import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav/nav";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import dynamic from "next/dynamic";

type Feedback = {
  _id: string;
  createdAt: string | number;
  name: string;
  message: string;
  rating?: number; // optional in case it's missing
};



// Lazy Components
const WhyChooseUs = dynamic(() => import("@/components/whychooseus/choose"), {
  ssr: false,
  loading: () => <p className="text-center">Loading...</p>,
});

const FeedbackSection = dynamic(() => import("@/components/feedbackcomponent/feedback"), {
  ssr: false,
  loading: () => <p className="text-center">Loading feedback...</p>,
});

const FAQSection = dynamic(() => import("@/components/faq/faq"), {
  ssr: false,
  loading: () => <p className="text-center">Loading FAQ...</p>,
});

const Footer = dynamic(() => import("@/components/Footer/page"), {
  ssr: false,
  loading: () => <p className="text-center">Loading footer...</p>,
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const feedback = useQuery(api.feedback.getAllFeedback);

  const [cachedFeedback, setCachedFeedback] = useState<Feedback[] | null>(null);

  // Avoid SSR hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save new feedback to cache
  useEffect(() => {
    if (feedback) {
      const normalizedFeedback = feedback.map(fb => ({
        ...fb,
        createdAt: String(fb.createdAt),
      }));
      setCachedFeedback(normalizedFeedback);
      localStorage.setItem("cachedFeedback", JSON.stringify(normalizedFeedback));
      localStorage.setItem("feedbackCacheTime", String(Date.now()));
    }
  }, [feedback]);

  // Load cached feedback if fresh
  useEffect(() => {
    const data = localStorage.getItem("cachedFeedback");
    const time = localStorage.getItem("feedbackCacheTime");
    if (data && time) {
      const isFresh = Date.now() - parseInt(time) < 5 * 60 * 1000;
      if (isFresh) setCachedFeedback(JSON.parse(data));
    }
  }, []);

  if (!isMounted) return null;

  const features = [
    {
      title: "Interactive Algorithm Visualizations",
      description: "Watch algorithms come to life with step-by-step animations and intuitive controls. Perfect for visual learners and curious minds.",
      video: "https://player.cloudinary.com/embed/?cloud_name=dfepqicgm&public_id=Untitled_video_-_Made_with_Clipchamp_3_vocnro&profile=cld-looping",
    },
    {
      title: "LeetCode Problem Practice",
      description: "Tackle real coding challenges with our integrated LeetCode problem set. Visualize solutions and track your progress effortlessly.",
      video: "https://player.cloudinary.com/embed/?cloud_name=dpiobntr2&public_id=j2fkfdymvdj0xqmj3fdk&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false",
    },
    {
      title: "Striver's A2Z DSA Problems",
      description: "Master the fundamentals with Striver's A2Z DSA problems. Visualize each step and build a solid foundation in data structures and algorithms.",
      video: "https://player.cloudinary.com/embed/?cloud_name=dpiobntr2&public_id=igr5dsg3bgkfyvwyomte&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false",
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
<section className="relative flex flex-col items-center justify-center text-center px-6 min-h-[100vh] overflow-hidden dark:bg-[#0d1117] bg-white text-white">

  {/* Animated Glow Background */}
  <div className="absolute inset-0 z-0">
    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/30 via-sky-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-[-150px] right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-400/20 via-cyan-500/10 to-transparent rounded-full blur-2xl" />
  </div>

  {/* Optional Grid Background */}
  <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none z-0" />

  {/* Content */}
  <div className="relative z-10 mt-16">
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 drop-shadow-[0_0_25px_rgba(1,1,1,0.7)]"
    >
      Visualize Your <br />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(1,1,1,0.6)]">
        DSA Journey
      </span>
      Like Never Before
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="mt-6 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-muted-foreground drop-shadow-[0_0_12px_rgba(94,234,212,0.25)]"
    >
      Welcome to <span className="font-semibold text-primary">AlgoFlow</span> — where tough algorithms become
      <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300 drop-shadow-[0_0_14px_rgba(94,234,212,0.4)]"> interactive visual stories</span> that stick with you forever.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="mt-10"
    >
      <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-xl bg-gradient-to-r from-violet-500 to-cyan-500 hover:scale-110 transition-all">
         Get Started
      </Button>
    </motion.div>
  </div>
</section>



      {/* Hero Promo Video */}
      <div className="relative py-32 flex justify-center items-center overflow-hidden">
        <div className="relative z-10 max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

          <iframe
  loading="lazy"
  // @ts-expect-error: fetchpriority is not yet in TS types
  fetchPriority="low"
  src="https://player.cloudinary.com/embed/?cloud_name=dfepqicgm&public_id=algoflux_ndxgte&profile=cld-looping&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false"
  className="w-full h-full aspect-video object-cover"
  allow="autoplay; fullscreen"
  allowFullScreen
/>

        </div>
      </div>

      {/* Features */}
      <section className="px-6 md:px-20">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          Unlock The Full Potential of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400">Algo</span><span className="text-foreground">Flow</span>
        </motion.h2>

        <div className="flex flex-col gap-32">
          {features.map((feature, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col-reverse md:flex-row ${isReversed ? "md:flex-row-reverse" : ""} items-center gap-12`}
              >
                {/* Text */}
                <div className="md:w-1/2 text-center md:text-left space-y-4">
                  <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </div>

                {/* Video */}
                <div className="md:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl relative">
                  {/* <iframe
                    loading="lazy"
                    fetchpriority="low"
                    src={feature.video}
                    className="w-full h-full aspect-video object-cover"
                    allow="autoplay; fullscreen"
                  /> */}

                            <iframe
  loading="lazy"
  // @ts-expect-error: fetchpriority is not yet in TS types
  fetchPriority="low"
  src={feature.video}
  className="w-full h-full aspect-video object-cover"
  allow="autoplay; fullscreen"
  allowFullScreen
/>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Actions */}
      <Suspense fallback={<div className="text-center py-12">Loading why choose us...</div>}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<div className="text-center py-12">Loading feedback...</div>}>
  <FeedbackSection
    feedback={(cachedFeedback ?? []).map((fb) => ({
      ...fb,
      createdAt: String(fb.createdAt),
      rating: typeof fb.rating === "number" ? fb.rating : 5,
    }))}
  />
</Suspense>


      <Suspense fallback={<div className="text-center py-12">Loading FAQs...</div>}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<div className="text-center py-12">Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  );
}
