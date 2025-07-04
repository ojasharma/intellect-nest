// File: src/components/ui/ReviewCard.js

import React from "react";

const ReviewCard = ({
  rating = 5,
  reviewerName = "Radhika Menon",
  reviewerRole = "Mother of Aarav, Age 7",
  reviewText = "Absolutely love this academy! Aarav has become more focused and confident since he started learning chess here. The coaches are kind, patient, and make every class fun. He looks forward to every session!",
}) => {
  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <span key={i} className="star">
        ⭐
      </span>
    ));
  };

  return (
    <div className="review-container">
      <div className="liquid-glass-box">
        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>

        {/* Shimmer effect */}
        <div className="shimmer-overlay"></div>

        {/* Content */}
        <div className="review-content">
          <div className="rating-section">{renderStars(rating)}</div>

          <div className="reviewer-info">
            <span className="reviewer-name">{reviewerName}</span>
            <span className="reviewer-role">({reviewerRole})</span>
          </div>

          <div className="review-text">"{reviewText}"</div>
        </div>
      </div>

      <style jsx>{`
        .review-container {
          padding: 4vw;
          min-height: 100vh;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .liquid-glass-box {
          position: relative;
          padding: clamp(1.5rem, 4vw, 3rem);
          border-radius: 2vw;
          max-width: 30vw;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0.5vw 2vw rgba(0, 27, 74, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1);
        }

        .liquid-glass-box:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0.7vw 3vw rgba(0, 27, 74, 0.4),
            0 0 3vw rgba(51, 187, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-0.5vw) scale(1.02);
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
          width: 0.3vw;
          height: 0.3vw;
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
            transform: translateY(-0.7vw);
            opacity: 1;
          }
        }

        .review-content {
          position: relative;
          z-index: 2;
        }

        .rating-section {
          margin-bottom: 2vw;
          display: flex;
          gap: 0.5vw;
        }

        .star {
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          filter: drop-shadow(0 0 8px rgba(255, 193, 7, 0.6));
          transition: transform 0.3s ease;
        }

        .liquid-glass-box:hover .star {
          transform: scale(1.1);
        }

        .reviewer-info {
          margin-bottom: 2vw;
          display: flex;
          flex-direction: column;
          gap: 1vw;
        }

        .reviewer-name {
          font-size: clamp(1rem, 2vw, 1.6rem);
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .reviewer-role {
          font-size: clamp(0.85rem, 1.2vw, 1rem);
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }

        .review-text {
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .review-text::before {
          content: "";
          position: absolute;
          left: -1rem;
          top: 0;
          bottom: 0;
          width: 0.3vw;
          background: linear-gradient(
            to bottom,
            rgba(51, 187, 255, 0.8),
            rgba(51, 187, 255, 0.2)
          );
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default ReviewCard;
