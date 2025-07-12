"use client";

import React, { useState } from "react";
import { useResponsiveValues } from "@/src/hooks/useResponsiveValues";
import { useTypewriter } from "@/src/hooks/useTypewriter";

// --- SCALE VARIABLE - Renamed to avoid conflicts ---
const FAQ_SCALE = 1.3; // Change this value to scale up (>1) or down (<1)

// --- FAQ Data - Renamed for clarity ---
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

// --- Chevron Icon - Renamed to avoid conflicts ---
const FAQChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`text-white transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    style={{
      height: `${12 * FAQ_SCALE}px`,
      width: `${12 * FAQ_SCALE}px`,
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

// --- FAQ Item - Renamed and updated for click functionality ---
const FAQAccordionItem = ({ faqItem, isFaqOpen, onToggle }) => {
  return (
    <div
      className="group relative transition-all duration-400 overflow-hidden cursor-pointer"
      style={{
        gap: `${12 * FAQ_SCALE}px`,
        padding: `${14 * FAQ_SCALE}px`,
        marginBottom: "0px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: `${12 * FAQ_SCALE}px`,
        boxShadow: `0 ${6 * FAQ_SCALE}px ${
          18 * FAQ_SCALE
        }px rgba(0,27,74,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)`,
      }}
      onClick={onToggle} // Use onClick to toggle the item
    >
      {/* Shimmer effect (still triggers on hover for visual flair) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite",
        }}
      />
      {/* Floating dots (still triggers on hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
        <div
          className="absolute bg-white rounded-full"
          style={{
            width: `${0.5 * FAQ_SCALE}rem`,
            height: `${0.5 * FAQ_SCALE}rem`,
            top: "20%",
            left: "15%",
            animation: "float 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bg-blue-300 rounded-full"
          style={{
            width: `${0.5 * FAQ_SCALE}rem`,
            height: `${0.5 * FAQ_SCALE}rem`,
            top: "60%",
            right: "25%",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute bg-white rounded-full"
          style={{
            width: `${0.5 * FAQ_SCALE}rem`,
            height: `${0.5 * FAQ_SCALE}rem`,
            bottom: "30%",
            left: "70%",
            animation: "float 3.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* FAQ Question */}
      <div className="w-full text-left flex justify-between items-center relative z-10">
        <span
          className="font-semibold font-poppins"
          style={{
            fontSize: `${0.95 * FAQ_SCALE}rem`,
            color: "white",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
        >
          {faqItem.question}
        </span>
        <FAQChevronIcon isOpen={isFaqOpen} />
      </div>

      {/* FAQ Answer */}
      <div
        className="relative z-10 transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isFaqOpen ? `${300 * FAQ_SCALE}px` : "0", // Control visibility with isFaqOpen
          opacity: isFaqOpen ? 1 : 0, // Control visibility with isFaqOpen
          marginTop: isFaqOpen ? `${12 * FAQ_SCALE}px` : "0", // Add margin when open
        }}
      >
        <p
          className="text-white font-light font-poppins leading-snug"
          style={{
            fontSize: `${0.85 * FAQ_SCALE}rem`,
            textShadow: "0 0 8px rgba(255,255,255,0.1)",
          }}
        >
          {faqItem.answer}
        </p>
      </div>
    </div>
  );
};

// --- FAQ Section Component - Updated to manage open/close state ---
const FAQSection = ({ isFaqVisible }) => {
  const responsiveValues = useResponsiveValues();
  // State to track which FAQ item is open
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqHeadingText = useTypewriter(
    "Frequently Asked Questions",
    isFaqVisible ? 50 : 9999
  );

  // Function to toggle FAQ items
  const handleToggleFaq = (index) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div
      className={`absolute flex flex-col items-center text-white z-[3]`}
      style={{
        top: "645vh",
        right: "20%",
        transform: "translateX(40%)",
        fontFamily: "Poppins",
        width: `${30 * FAQ_SCALE}%`,
        maxWidth: `${680 * FAQ_SCALE}px`,
        padding: `${responsiveValues.instructorPadding * 0.8 * FAQ_SCALE}px`,
      }}
    >
      <h2
        className="font-bold font-poppins text-center"
        style={{
          fontSize: `${
            responsiveValues.instructorHeadingSize * 0.5 * FAQ_SCALE
          }rem`,
          textShadow: "0 0 18px rgba(255, 255, 255, 0.3)",
          marginBottom: `${10 * FAQ_SCALE}px`,
        }}
      >
        {faqHeadingText}
      </h2>
      <div
        className="w-full max-w-2xl mx-auto z-[2]"
        style={{ padding: `0 ${4 * FAQ_SCALE}px` }}
      >
        <div className="flex flex-col" style={{ gap: `${3 * FAQ_SCALE}px` }}>
          {faqContentData.map((item, index) => (
            <FAQAccordionItem
              key={index}
              faqItem={item}
              isFaqOpen={openFaqIndex === index} // Pass whether it should be open
              onToggle={() => handleToggleFaq(index)} // Pass the handler function
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
