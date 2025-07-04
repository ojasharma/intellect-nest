"use client";

import React from "react";

export default function InstructionalText({ fadeClass }) {
  const instructionScale = 0.75;

  return (
    <div
      className={`fixed top-[5%] left-1/2 transform -translate-x-1/2 z-30 text-white text-center select-none ${fadeClass}`}
      style={{
        fontFamily: "Poppins",
        fontSize: `${1.5 * instructionScale}vw`,
        lineHeight: "1.2",
      }}
    >
      <div className="liquid-glass-container">
        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>

        {/* Shimmer overlay */}
        <div className="shimmer-overlay"></div>

        {/* Priority indicator */}
        <div className="priority-indicator">
          <div className="pulse-ring"></div>
          <div className="pulse-ring delay-1"></div>
          <div className="pulse-ring delay-2"></div>
        </div>

        {/* Main content */}
        <div className="content">
          <div className="main-instruction">
            Play Chess To Navigate The Page or just Scroll,
          </div>
          <div className="sub-instruction">Click On the Piece to Proceed</div>
          <div className="blue-glow font-light highlight-move">
            Rook h6 seems like the right move!
          </div>
        </div>
      </div>

      <style jsx>{`
        .liquid-glass-container {
          position: relative;
          padding: ${1.2 * instructionScale}rem ${1.5 * instructionScale}rem;
          border-radius: ${16 * instructionScale}px;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.04) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 27, 74, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            0 0 80px rgba(51, 187, 255, 0.1);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        .priority-indicator {
          position: absolute;
          top: ${-8 * instructionScale}px;
          right: ${-8 * instructionScale}px;
          width: ${40 * instructionScale}px;
          height: ${40 * instructionScale}px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
          z-index: 10;
        }

        .pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: ${2 * instructionScale}px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)
            infinite;
        }

        .pulse-ring.delay-1 {
          animation-delay: 0.3s;
        }

        .pulse-ring.delay-2 {
          animation-delay: 0.6s;
        }

        .priority-text {
          font-size: ${0.6 * instructionScale}rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          z-index: 11;
        }

        .particle {
          position: absolute;
          width: ${4 * instructionScale}px;
          height: ${4 * instructionScale}px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }

        .particle-3 {
          bottom: 25%;
          left: 25%;
          animation-delay: 4s;
        }

        .particle-4 {
          top: 40%;
          right: 35%;
          animation-delay: 1s;
        }

        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 3s ease-in-out infinite;
        }

        .content {
          position: relative;
          z-index: 5;
        }

        .main-instruction {
          font-size: ${1.2 * instructionScale}em;
          font-weight: 600;
          margin-bottom: ${0.5 * instructionScale}rem;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .sub-instruction {
          font-size: ${1.0 * instructionScale}em;
          font-weight: 500;
          margin-bottom: ${0.8 * instructionScale}rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .highlight-move {
          font-size: ${1.1 * instructionScale}em;
          background: linear-gradient(135deg, #33bbff, #66d9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(51, 187, 255, 0.5);
          animation: text-glow 2s ease-in-out infinite alternate;
        }

        @keyframes gentle-pulse {
          0%,
          100% {
            box-shadow: 0 8px 32px rgba(0, 27, 74, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1),
              0 0 80px rgba(51, 187, 255, 0.1);
          }
          50% {
            box-shadow: 0 8px 32px rgba(0, 27, 74, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.25),
              inset 0 -1px 0 rgba(255, 255, 255, 0.15),
              0 0 100px rgba(51, 187, 255, 0.2);
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @keyframes text-glow {
          0% {
            text-shadow: 0 0 20px rgba(51, 187, 255, 0.5);
          }
          100% {
            text-shadow: 0 0 30px rgba(51, 187, 255, 0.8);
          }
        }

        .blue-glow {
          filter: drop-shadow(0 0 10px rgba(51, 187, 255, 0.6));
        }
      `}</style>
    </div>
  );
}
