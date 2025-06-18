"use client";

import React from "react";

export default function InstructionalText({ fadeClass }) {
  return (
    <div
      className={`fixed top-[5%] left-1/2 transform -translate-x-1/2 z-30 text-white text-center select-none ${fadeClass}`}
      style={{
        fontFamily: "Poppins",
        fontSize: "1.5vw",
        lineHeight: "1.2",
      }}
    >
      <div>Play Chess To Navigate The Page or just Scroll,</div>
      <div>Click On the Piece to Proceed</div>
      <div className="blue-glow font-light">
        Rook h6 seems like the right move!
      </div>
    </div>
  );
}
