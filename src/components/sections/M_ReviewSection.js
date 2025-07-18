"use client";

import React from "react";

export default function ReviewsSection() {
  const ReviewCard = ({
    rating = 5,
    reviewerName,
    reviewerRole,
    reviewText,
  }) => {
    const renderStars = (count) =>
      Array.from({ length: count }, (_, i) => (
        <span key={i} className="text-yellow-400 text-lg">
          ⭐
        </span>
      ));

    return (
      <div
        className="group relative w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 md:px-8 my-6 transition-all duration-400"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "12px",
          boxShadow: `
            0 8px 32px rgba(0, 27, 74, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 0 rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Stars */}
        <div className="mb-2">{renderStars(rating)}</div>

        {/* Reviewer */}
        <div className="mb-1 text-white font-semibold text-base sm:text-lg">
          {reviewerName}
        </div>
        <div className="mb-3 text-white text-sm italic opacity-80">
          {reviewerRole}
        </div>

        {/* Review Text */}
        <div className="text-white text-sm sm:text-base leading-relaxed opacity-90">
          &ldquo;{reviewText}&rdquo;
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 py-12 relative z-[3]">
      <div className="text-white text-xl sm:text-2xl md:text-3xl mb-6 font-semibold text-center">
        What Parents Are Saying
      </div>

      <ReviewCard
        rating={5}
        reviewerName="Radhika Menon"
        reviewerRole="Mother of Aarav, Age 7"
        reviewText="Absolutely love this academy! Aarav has become more focused and confident since he started learning chess here. The coaches are kind, patient, and make every class fun. He looks forward to every session!"
      />
      <ReviewCard
        rating={4}
        reviewerName="James Patel"
        reviewerRole="Father of Nina, Age 10"
        reviewText="Great environment and well-structured lessons. Nina improved her logical thinking and even won her first school tournament. I wish the classes were a bit longer, but overall, highly recommended!"
      />
      <ReviewCard
        rating={5}
        reviewerName="Anita Arora"
        reviewerRole="Mother of Kabir, Age 6"
        reviewText="This is the perfect mix of play and learning. Kabir used to be very restless, but now he can sit and think through problems—thanks to chess! I really appreciate the personalized attention each child gets."
      />
    </div>
  );
}
