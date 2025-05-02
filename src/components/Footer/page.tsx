
"use client";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaAndroid,
  FaYoutube
  // FaHashnode, // Removed as it is not a valid export
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
    <footer className="relative z-10 px-6 sm:px-12 lg:px-24 py-10 mt-15  bg-black border-b border-gray-900 dark:border-gray-800 ">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-center sm:text-left text-muted-foreground">
          © {new Date().getFullYear()} AlgoFlows — Built with ❤️ using Next.js
        </p>
              {/* <p className="py-6 text-center text-xs text-muted-foreground">
        © 2025 AlgoFlow. Built with ❤️
      </p> */}

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
      </motion.div>
    </footer>
  );
}
