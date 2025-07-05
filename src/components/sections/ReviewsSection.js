"use client";

import React from "react";

export default function ReviewsSection() {
  const cardGap = 35 * 0.9; // = 31.5vw
  const leftOffset = 20;
  const rightOffset = 20;

  const ReviewCard = ({
    rating = 5,
    reviewerName,
    reviewerRole,
    reviewText,
  }) => {
    const renderStars = (count) =>
      Array.from({ length: count }, (_, i) => (
        <span key={i} className="star">
          ⭐
        </span>
      ));

    return (
      <div className="review-container">
        <div className="liquid-glass-box">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="shimmer-overlay"></div>

          <div className="review-content">
            <div className="rating-section">{renderStars(rating)}</div>
            <div className="reviewer-info">
              <span className="reviewer-name">{reviewerName}</span>
              <span className="reviewer-role">({reviewerRole})</span>
            </div>
            <div className="review-text">&ldquo;{reviewText}&rdquo;</div>
          </div>
        </div>

        <style jsx>{`
          .review-container {
            padding: 3.6vw;
            transform: scale(0.9);
            transform-origin: top center;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              sans-serif;
          }

          .liquid-glass-box {
            position: relative;
            padding: 3.6vw;
            border-radius: 1.8vw;
            max-width: 27vw;
            width: 100%;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s ease;
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            background: rgba(255, 255, 255, 0.05);
            border: 0.09vw solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 0.45vw 1.8vw rgba(0, 27, 74, 0.3),
              inset 0 0.063vw 0 rgba(255, 255, 255, 0.2),
              inset 0 -0.063vw 0 rgba(255, 255, 255, 0.1);
          }

          .liquid-glass-box:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.3);
            box-shadow: 0 0.63vw 2.7vw rgba(0, 27, 74, 0.4),
              0 0 2.7vw rgba(51, 187, 255, 0.2),
              inset 0 0.063vw 0 rgba(255, 255, 255, 0.3),
              inset 0 -0.063vw 0 rgba(255, 255, 255, 0.2);
            transform: translateY(-0.45vw) scale(1.02);
          }

          .liquid-glass-box:hover .shimmer-overlay {
            animation: shimmer 2s ease-in-out infinite;
          }

          .shimmer-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 100%
            );
            transform: translateX(-100%);
            pointer-events: none;
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(200%);
            }
          }

          .particle {
            position: absolute;
            width: 0.27vw;
            height: 0.27vw;
            background: rgba(51, 187, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float 4s ease-in-out infinite;
          }

          .particle-1 {
            top: 20%;
            left: 15%;
            animation-delay: 0s;
          }
          .particle-2 {
            top: 60%;
            right: 20%;
            animation-delay: 1.5s;
          }
          .particle-3 {
            bottom: 25%;
            left: 70%;
            animation-delay: 3s;
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-0.63vw);
              opacity: 1;
            }
          }

          .review-content {
            position: relative;
            z-index: 2;
          }

          .rating-section {
            margin-bottom: 1.8vw;
            display: flex;
            gap: 0.45vw;
          }

          .star {
            font-size: 2.25vw;
            filter: drop-shadow(0 0 0.45vw rgba(255, 193, 7, 0.6));
            transition: transform 0.3s ease;
          }

          .liquid-glass-box:hover .star {
            transform: scale(1.1);
          }

          .reviewer-info {
            margin-bottom: 1.8vw;
            display: flex;
            flex-direction: column;
            gap: 0.9vw;
          }

          .reviewer-name {
            font-size: 1.8vw;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 0 0.54vw rgba(255, 255, 255, 0.3);
          }

          .reviewer-role {
            font-size: 1.08vw;
            color: rgba(255, 255, 255, 0.8);
            font-style: italic;
          }

          .review-text {
            font-size: 1.62vw;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 0.09vw 0.135vw rgba(0, 0, 0, 0.3);
            position: relative;
          }

          .review-text::before {
            content: "";
            position: absolute;
            left: -1.35vw;
            top: 0;
            bottom: 0;
            width: 0.27vw;
            background: linear-gradient(
              to bottom,
              rgba(51, 187, 255, 0.8),
              rgba(51, 187, 255, 0.2)
            );
            border-radius: 0.135vw;
          }
        `}</style>
      </div>
    );
  };

  return (
    <>
      <div
        className="absolute z-[3]"
        style={{
          top: `${0 * cardGap}vw`,
          left: `${leftOffset}%`,
          transform: "translateX(-50%)",
        }}
      >
        <ReviewCard
          rating={5}
          reviewerName="Radhika Menon"
          reviewerRole="Mother of Aarav, Age 7"
          reviewText="Absolutely love this academy! Aarav has become more focused and confident since he started learning chess here. The coaches are kind, patient, and make every class fun. He looks forward to every session!"
        />
      </div>

      <div
        className="absolute z-[3]"
        style={{
          top: `${1 * cardGap}vw`,
          right: `${rightOffset}%`,
          transform: "translateX(50%)",
        }}
      >
        <ReviewCard
          rating={4}
          reviewerName="James Patel"
          reviewerRole="Father of Nina, Age 10"
          reviewText="Great environment and well-structured lessons. Nina improved her logical thinking and even won her first school tournament. I wish the classes were a bit longer, but overall, highly recommended!"
        />
      </div>

      <div
        className="absolute z-[3]"
        style={{
          top: `${2 * cardGap}vw`,
          left: `${leftOffset}%`,
          transform: "translateX(-50%)",
        }}
      >
        <ReviewCard
          rating={5}
          reviewerName="Anita Arora"
          reviewerRole="Mother of Kabir, Age 6"
          reviewText="This is the perfect mix of play and learning. Kabir used to be very restless, but now he can sit and think through problems—thanks to chess! I really appreciate the personalized attention each child gets."
        />
      </div>
    </>
  );
}
