"use client";

import React, { useState } from "react";

// FAQ Data
const faqContentData = [
  {
    question: "My child is a complete beginner. Can they still join?",
    answer:
      "Absolutely! We have beginner-level programs designed for children with no experience. Our coaches use fun methods like stories and games to teach chess basics.",
  },
  {
    question: "How much time does my child need to commit each week?",
    answer:
      "Our program usually requires 2–3 sessions per week, each about 45 minutes. This helps children improve steadily without feeling overwhelmed.",
  },
  {
    question: "Are the classes conducted online or in-person?",
    answer:
      "All our classes are online through live sessions. Your child learns in real time with individual attention and progress tracking.",
  },
];

// Chevron Icon Component
const FAQChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`text-white transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    style={{
      height: "16px",
      width: "16px",
    }}
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

// FAQ Item Component
const FAQAccordionItem = ({ faqItem, isFaqOpen, onToggle }) => {
  return (
    <div
      className="group relative transition-all duration-400 overflow-hidden cursor-pointer mb-3 w-full"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "12px",
        boxShadow: `0 6px 18px rgba(0,27,74,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)`,
      }}
      onClick={onToggle}
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite",
        }}
      />

      {/* Floating dots */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
        <div
          className="absolute bg-white rounded-full w-2 h-2"
          style={{
            top: "20%",
            left: "15%",
            animation: "float 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bg-blue-300 rounded-full w-2 h-2"
          style={{
            top: "60%",
            right: "25%",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute bg-white rounded-full w-2 h-2"
          style={{
            bottom: "30%",
            left: "70%",
            animation: "float 3.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Question */}
      <div className="p-4 md:p-6 flex justify-between items-center relative z-10">
        <span
          className="font-semibold font-poppins text-white pr-4"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
            lineHeight: "1.4",
          }}
        >
          {faqItem.question}
        </span>
        <div className="flex-shrink-0 ml-2">
          <FAQChevronIcon isOpen={isFaqOpen} />
        </div>
      </div>

      {/* Answer */}
      <div
        className="relative z-10 transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isFaqOpen ? "200px" : "0",
          opacity: isFaqOpen ? 1 : 0,
        }}
      >
        <div className="px-4 pb-4 md:px-6 md:pb-6">
          <p
            className="text-white font-light font-poppins leading-relaxed"
            style={{
              fontSize: "clamp(0.8rem, 2.2vw, 0.95rem)",
              textShadow: "0 0 8px rgba(255,255,255,0.1)",
              lineHeight: "1.6",
            }}
          >
            {faqItem.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main FAQ Section Component
const FAQSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleToggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[700px] mx-auto">
        {/* Heading */}
        <h2
          className="font-bold font-poppins text-center text-white mb-8 md:mb-12"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            textShadow: "0 0 18px rgba(255, 255, 255, 0.3)",
            lineHeight: "1.2",
          }}
        >
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqContentData.map((item, index) => (
            <FAQAccordionItem
              key={index}
              faqItem={item}
              isFaqOpen={openFaqIndex === index}
              onToggle={() => handleToggleFaq(index)}
            />
          ))}
        </div>
      </div>

      {/* Keyframes for shimmer and float */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default FAQSection;
