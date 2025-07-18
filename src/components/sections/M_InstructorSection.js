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
      className="absolute flex flex-col items-center text-white z-[3]"
      style={{

        fontFamily: "Poppins",
        width: "100%",
        padding: "20px",
      }}
    >
      <h2
        className="font-bold mb-12 h-14 text-center"
        style={{ fontSize: "1.8rem" }}
      >
        Meet Our Instructors
      </h2>
      <div
        className="flex flex-col md:flex-row justify-center w-full max-w-4xl"
        style={{ gap: "20px" }}
      >
        {instructors.map((instructor, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-4 liquid-glass-box"
            style={{
              padding: "20px",
              width: "250px",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(12px) saturate(150%)",
              WebkitBackdropFilter: "blur(12px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 20, 50, 0.3)",
            }}
          >
            <Image
              src={instructor.pfp}
              alt={instructor.alt}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-transparent shadow-lg"
              style={{
                width: "120px",
                height: "120px",
              }}
            />
            <h3
              className="font-semibold mt-2 h-8 text-center"
              style={{ fontSize: "1.2rem" }}
            >
              {instructor.name}
            </h3>
            <p
              className="font-light text-blue-300 h-7 text-center"
              style={{ fontSize: "1rem" }}
            >
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
