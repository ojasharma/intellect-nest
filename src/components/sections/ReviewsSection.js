"use client";

import React from "react";
import ReviewCard from "@/components/ui/ReviewCard"; // Assuming this component exists

export default function ReviewsSection() {
  return (
    <>
      {/* Review Card 1 */}
      <div
        className="absolute z-[3]"
        style={{
          top: "0vh",
          left: "20%",
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

      {/* Review Card 2 */}
      <div
        className="absolute z-[3]"
        style={{
          top: "60vh",
          right: "20%",
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

      {/* Review Card 3 */}
      <div
        className="absolute z-[3]"
        style={{
          top: "120vh",
          left: "20%",
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
