"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaAndroid,
  FaYoutube
} from "react-icons/fa";


const socials = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com/annuk123",
  },
  {
    name: "BioLink",
    icon: <FaAndroid />, // Removed as it is not a valid export
    href: "https://bio.link/annukumalu",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/annu-kumari-540337237/",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    href: "https://x.com/Annu66126617",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    href: "https://www.instagram.com/annuk987/",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    href: "https://www.youtube.com/channel/UC3wYJlVEy9cMi5e_sZG-Q7Q",
  },
];

export default function Footer() {
  return (
<footer
  className="relative z-10 -mt-20 w-full text-white bg-gray-950 backdrop-blur-sm border-t-4 border-cyan-800/30 shadow-inner rounded-tl-3xl rounded-tr-3xl mb-0"
>
  <div className="max-w-7xl mx-auto px-6 py-20 space-y-12">
{/* AlgoFlux Summary */}
<div className="flex flex-col lg:flex-row justify-between items-start gap-10 text-center lg:text-left">
  {/* Left: About AlgoFlux*/}
  <div className="flex-1 space-y-4">
    <motion.h2
      className="text-2xl sm:text-3xl font-extrabold text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Welcome to {" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400">Algo</span><span className="text-foreground">Flux</span><span className="text-sky-500">.</span>
  
    </motion.h2>
    <motion.p
      className="text-gray-400 text-sm sm:text-base max-w-md mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      AlgoFlux is a next-generation DSA learning and problem-solving platform; combining interactive algorithms, AI-driven feedback, and visual learning to empower developers, students, and teams to learn faster, think deeper, and code smarter.
    </motion.p>
    <p className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 text-md pt-2">
  “AlgoFlux is like LeetCode meets visual learning — but smarter.”
</p>

  </div>

          {/* Right: CTA to Projexio */}
          <div className="flex-1 space-y-4">
            <motion.h3
              className="text-xl sm:text-2xl font-semibold text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Looking for more tools like this?
            </motion.h3>
            <motion.p
              className="text-gray-400 text-sm sm:text-base max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Explore <span className="text-cyan-300 font-medium">Projexio</span>, a creative launchpad full of UI kits, open-source tools, and productivity boosters for indie hackers.
            </motion.p>
            <Link
              href="https://projexio-annu-kumari.vercel.app/"
              target="_blank"
              className="inline-block text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 transition"
            >
              Visit Projexio →
            </Link>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-cyan-800/30 pt-8 text-sm mb-0">
          <p className="text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} AlgoFlux by <span className="text-cyan-400 font-medium">Annu Kumari</span> • Built with ❤️ for 
          </p>

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
        </div>
      </div>
    </footer>
  );
}