"use client";
import React from "react";
import Navbar from "@/components/nav/nav";
import Link from "next/link";
import Image from "next/image";

export default function ComingSoonPage() {
  const title = "Coming Soon ...";
  const subtitle = "We’re cooking up something awesome!";
  const memeUrl = "/image.png";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 text-center transition-colors duration-300">
      <Navbar />

      <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-lg sm:text-xl max-w-md mb-6">{subtitle}</p>

      <Image
        src={memeUrl}
        alt="Funny meme"
        width={400}
        height={300}
        className="w-[300px] sm:w-[400px] rounded-xl shadow-md border dark:border-gray-700"
      />
      <div className="mt-6">
        <Link href="/dashboard/visualizer">
          <button className="bg-sky-400 text-white px-6 py-2 rounded-full hover:bg-primary/80 transition">
            Go Back
          </button>
        </Link>
      </div>

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Stay tuned! 🚀 We&apos;ll be live soon.
      </p>
    </div>
  );
}
