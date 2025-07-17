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
        <span key={i} className="star">
          ⭐
        </span>
      ));

    return (
      <div className="review-card">
        <div className="rating">{renderStars(rating)}</div>
        <div className="reviewer-info">
          <div className="name">{reviewerName}</div>
          <div className="role">{reviewerRole}</div>
        </div>
        <div className="text">&ldquo;{reviewText}&rdquo;</div>

        <style jsx>{`
          .review-card {
            width: 80%;
            margin: 24px auto;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            color: white;
            font-family: sans-serif;
          }

          .rating {
            font-size: 20px;
            margin-bottom: 10px;
          }

          .reviewer-info {
            margin-bottom: 10px;
          }

          .name {
            font-weight: bold;
            font-size: 18px;
          }

          .role {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
          }

          .text {
            font-size: 16px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
          }
        `}</style>
      </div>
    );
  };

  return (
    <div style={{ padding: "0px 0" }}>
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
