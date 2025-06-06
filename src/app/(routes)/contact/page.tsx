"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion } from "framer-motion";
import Navbar from "@/components/nav/nav";

export default function ContactPage() {
  const submitContactMessage = useMutation(api.contact.submitContactMessage);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // 🐝 Anti-spam field
  const [honeyPot, setHoneyPot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeyPot !== "") return; // ✅ 🐝 bot detected, block submission

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    try {
      // Save to Convex DB
      await submitContactMessage({ name, email, message });

      // Send to Formspree
      await fetch("https://formspree.io/f/xovwjvgq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      toast.success("Message sent!");
      setSubmitted(true); // Show greeting card
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
};



    function cn(...classes: (string | boolean | undefined | null)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-26 px-4 sm:px-6 lg:px-8">
        <Navbar />
        {/* Honeypot field – hidden from real users */}

    
        {/* Greeting Card */}
      {/* Form Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-indigo-50 to-purple-50 border border-purple-100 dark:border-gray-900 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-950 dark:to-gray-950 relative overflow-hidden"
>
  {/* Decorative floating glow */}
  <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300 opacity-20 rounded-full blur-3xl  z-0" />
  <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-300 opacity-20 rounded-full blur-3xl  z-0" />

  <h2 className="relative text-4xl font-extrabold text-center tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient mb-6 z-10">
    Contact Us
  </h2>

  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
    {/* Honeypot field – hidden from real users */}
<input
  type="text"
  value={honeyPot}
  onChange={(e) => setHoneyPot(e.target.value)}
  className="hidden"
  autoComplete="off"
  tabIndex={-1}
/>

    {/* Name */}
    <div>
      <label className="block text-sm font-medium tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient mb-1">
        Your Name
      </label>
      <Input
        type="text"
        placeholder="e.g., Annu Kumari"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient mb-1">
        Your Email
      </label>
      <Input
        type="email"
        placeholder="abc123@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="focus:ring-2 focus:ring-purple-500 transition"
      />
    </div>

    {/* Message */}
    <div>
      <label className="block text-sm font-medium tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient mb-1">
        Your Message
      </label>
      <Textarea
        placeholder="We’d love to hear from you!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="min-h-[160px] resize-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Submit Button */}
<div className="text-center pt-3">
  <Button
    type="submit"
    disabled={loading}
    className={cn(
      `group relative inline-flex items-center justify-center
      px-10 py-3 rounded-full
      bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600
      text-white font-bold text-lg tracking-wide
      shadow-xl hover:shadow-purple-400/50
      hover:scale-105 transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-4 focus:ring-fuchsia-300 focus:ring-opacity-70
      disabled:opacity-50 disabled:cursor-not-allowed`,
      loading && "animate-pulse cursor-wait"
    )}
  >
    {loading ? (
        // if (honeyPot !== "") return; // 🚨 Bot detected, ignore submission

      <span className="flex items-center gap-2">
        <svg
          className="w-5 h-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
          />
        </svg>
        Sending...
      </span>
    ) : (
      <span className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
        <span>Send Message</span>
        <svg
          className="w-5 h-5 text-white transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    )}
  </Button>
</div>

  </form>
</motion.div>


      {/* Map & Address Section */}
      <div className="rounded-lg p-4 text-center text-sm text-gray-400 italic mt-10">
<p className="text-gray-500">
  I'm a passionate indie developer building AlgoFlow to make DSA learning visual and fun.  
  <br />
  Feel free to reach out with feedback, ideas, or collaborations!
  <br />
  Email: <a href="mailto:anuk35168@gmail.com" className="text-indigo-500 hover:underline">anuk35168@gmail.com</a><br />
  Location: India (working remotely)
</p>


<br />
  <span className="text-gray-500">I’m always open to new ideas and collaborations.</span><br />
  <span className="text-gray-500">As a remote developer, I work from anywhere!</span><br />
  <span className="text-indigo-500">Let’s build something awesome together.</span>
</div>


    </div>
  );
}
