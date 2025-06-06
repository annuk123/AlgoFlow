"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navbar from "@/components/nav/nav";

// Import canvas-confetti for confetti animation
import confetti from "canvas-confetti";

export default function FeedbackPage() {
  const submitFeedback = useMutation(api.feedback.submitFeedback);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0); // Rating 0 to 5
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // 🐝 Anti-spam field

  // Array of emojis for stars
  const stars = ["😞", "😐", "🙂", "😊", "😍"];

  // Handle confetti burst
  function fireConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot !== "") return; // Bot detected
    if (rating === 0) {
      toast.error("Please select a sentiment rating.");
      return;
    }
    setLoading(true);

    try {
      // Submit feedback including rating
      await submitFeedback({ name, message, rating });
      toast.success("🎉 Thank you for your valuable feedback!");
      fireConfetti();
      setName("");
      setMessage("");
      setRating(0);
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl mx-auto px-6 py-12"
      >
        <div className="bg-white dark:bg-black shadow-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 relative overflow-hidden">
          {/* Decorative blurred circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 dark:bg-black rounded-full blur-3xl opacity-30 animate-pulse" />

          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            💬 We’d Love Your Feedback
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot anti-spam */}
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              autoComplete="off"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Your Name</label>
              <Input
                placeholder="e.g., Annu Kumari"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Your Message</label>
              <Textarea
                placeholder="Share your thoughts or suggestions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className={`
                  min-h-[150px]
                  w-full
                  px-4 py-3
                  rounded-lg
                  text-sm 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition duration-200 ease-in-out
                  resize-none
                  bg-white
                  shadow-sm
                  placeholder:text-gray-400
                `}
              />
            </div>

            {/* Emoji Star Rating */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 block mb-1">
                How do you feel about your experience?
              </label>
              <div className="flex justify-center space-x-4 select-none">
                {stars.map((star, idx) => {
                  const starValue = idx + 1;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      className={`
                        text-3xl
                        cursor-pointer
                        transition-transform
                        ${rating === starValue ? "scale-125" : "scale-100"}
                        ${rating >= starValue ? "opacity-100" : "opacity-40"}
                        hover:scale-125
                      `}
                      aria-label={`Rate ${starValue} out of 5`}
                    >
                      {star}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-center pt-6">
              <Button
                type="submit"
                disabled={loading}
                className={`
                  relative inline-flex items-center justify-center
                  px-10 py-4 rounded-full
                  bg-gradient-to-r from-gray-700 via-purple-800 to-gray-800
                  text-white font-bold text-xl
                  shadow-2xl
                  transition-transform duration-300 ease-in-out
                  hover:scale-105 hover:shadow-2xl hover:from-purple-600 hover:to-indigo-900
                  focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-70
                  disabled:opacity-60 disabled:cursor-not-allowed
                  before:absolute before:inset-0 before:rounded-full before:bg-white before:opacity-0 before:blur-xl before:transition-opacity before:duration-500
                  hover:before:opacity-30
                  active:scale-95 active:shadow-inner

                  ${loading ? "animate-pulse cursor-wait" : ""}
                `}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
