"use client";

import React from "react";
import Image from "next/image";

export default function InstructorsSection() {
  const instructors = [
    {
      name: "Harshit Dawar",
      rating: "FIDE Rating: 2000",
      pfp: "/pfp1.png",
      alt: "Harshit Dawar's profile picture",
    },
    {
      name: "Anushka",
      rating: "FIDE Rating: 2000",
      pfp: "/pfp2.png",
      alt: "Anushka's profile picture",
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center text-white w-full px-4 py-8"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <h2 className="font-bold mb-12 text-center text-[1.8rem]">
        Meet Our Instructors
      </h2>

      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 md:px-8">
        {instructors.map((instructor, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-4 liquid-glass-box w-full"
            style={{
              padding: "20px",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(12px) saturate(150%)",
              WebkitBackdropFilter: "blur(12px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 20, 50, 0.3)",
              textAlign: "center",
            }}
          >
            <Image
              src={instructor.pfp}
              alt={instructor.alt}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-transparent shadow-lg"
            />
            <h3 className="font-semibold text-[1.2rem]">{instructor.name}</h3>
            <p className="font-light text-blue-300 text-[1rem]">
              {instructor.rating}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .liquid-glass-box:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 16px 45px rgba(0, 20, 50, 0.35),
            0 0 50px rgba(51, 187, 255, 0.2);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
        }
      `}</style>
    </div>
  );
}
