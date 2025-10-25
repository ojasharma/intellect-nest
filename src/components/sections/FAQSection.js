"use client";

import React, { useState } from "react";
import { useTypewriter } from "@/src/hooks/useTypewriter";
import { useResponsiveValues } from "@/src/hooks/useResponsiveValues";

const faqData = [
  {
    question: "My child is a complete beginner. Can they still join?",
    answer:
      "Absolutely! We have dedicated beginner-level programs designed for children with no prior experience. Our coaches use fun, engaging methods like stories, puzzles, and games to teach the basics of chess step-by-step.",
  },
  {
    question: "How much time does my child need to commit each week?",
    answer:
      "Our regular program usually requires 2 to 3 sessions per week, each lasting about 45–60 minutes. This schedule helps your child improve steadily without feeling overwhelmed.",
  },
  {
    question: "Are the classes conducted online or in-person?",
    answer:
      "All our classes are conducted online through live, interactive sessions. Your child will learn from experienced coaches in real time, with individual attention and progress tracking—just like in a physical classroom.",
  },
];

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 text-white transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group relative transition-all duration-400 overflow-hidden cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      style={{
        gap: "20px",
        padding: "20px",
        marginBottom: "0px",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "18px",
        boxShadow: `
          0 8px 32px rgba(0, 27, 74, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      <div className="w-full text-left flex justify-between items-center relative z-10">
        <span
          className="font-semibold"
          style={{
            fontSize: "1.25rem",
            color: "white",
            textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          }}
        >
          {item.question}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </div>

      <div
        className={`relative z-10 max-h-0 ${
          isOpen ? "max-h-[500px]" : ""
        } opacity-0 ${
          isOpen ? "opacity-100" : ""
        } transition-all duration-500 ease-in-out overflow-hidden mt-2`}
      >
        <p
          className="text-white font-light leading-snug"
          style={{
            fontSize: "1rem",
            textShadow: "0 0 12px rgba(255, 255, 255, 0.2)",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQSection({ isVisible }) {
  const responsiveValues = useResponsiveValues();
  const headingText = useTypewriter(
    "Frequently Asked Questions",
    isVisible ? 50 : 9999
  );

  return (
    <div
      className={`absolute flex flex-col items-center text-white z-[999]`}
      style={{
        top: "640vh",
        right: "0%",
        width: "50%",
        maxWidth: "800px",
        padding: `${responsiveValues.instructorPadding}px`,
        pointerEvents: "auto",
      }}
    >
      <h2
        className="font-bold mb-2 h-14 text-center"
        style={{
          fontSize: `${0.6 * responsiveValues.instructorHeadingSize}rem`,
          textShadow: "0 0 24px rgba(255, 255, 255, 0.4)",
        }}
      >
        {headingText}
      </h2>
      <div className="w-full max-w-3xl mx-auto px-6 z-[2]">
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}