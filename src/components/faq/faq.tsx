"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaQuestionCircle } from "react-icons/fa";

export default function FAQSection() {
const faqs = [
  {
    question: "What is AlgoFlow and how can it help me learn DSA?",
    answer:
      "AlgoFlow is an interactive platform that helps you master Data Structures and Algorithms (DSA) through visualizations, curated LeetCode problems, the Striver A2Z sheet, and AI-powered hints."
  },
  {
    question: "What is the difference between Algorithm Visualizer and Problem Visualizer?",
    answer:
      "Algorithm Visualizer shows how core algorithms like sorting or searching work step-by-step. Problem Visualizer lets you solve real problems with explanation, code editor, and visual step walkthrough."
  },
  {
    question: "How does the AI help in AlgoFlow?",
    answer:
      "The AI assistant offers hints, approach strategies, and step guidance to help you understand and solve problems effectively."
  },
  {
    question: "Can I contribute to AlgoFlow or suggest features?",
    answer:
      "Absolutely! You can contact the developer via the contact page or email to share feedback or feature ideas."
  },

  // Additional FAQs
  {
    question: "Is AlgoFlow suitable for beginners with no prior coding experience?",
    answer:
      "Yes! AlgoFlow is designed to help learners at all levels, including beginners. The step-by-step visualizations and AI hints make complex concepts easier to understand."
  },
  {
    question: "Is AlgoFlow completely free to use?",
    answer:
      "Currently, AlgoFlow is free to use with no hidden charges. Future updates may include premium features, but core learning tools will remain accessible."
  },
  
  {
    question: "Can I save my progress or notes in AlgoFlow?",
    answer:
      "Currently, saving progress is not supported without signing in. Planned updates will allow optional account creation to save your learning history and notes."
  },
  {
    question: "Which programming languages are supported in the code editor?",
    answer:
      "The code editor currently supports popular languages like JavaScript, Python, and C++. More languages will be added based on user feedback."
  }
];


  return (
    <section className="px-6 py-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2  text-lg font-semibold ">
          <FaQuestionCircle className="text-3xl text-sky-500" />
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">Frequently Asked Questions</h1>

        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Get quick answers</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-purple-500/20 transition">
            <AccordionTrigger className="text-left px-4 py-3 text-base font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
