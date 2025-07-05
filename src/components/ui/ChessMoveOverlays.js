"use client";

import React from "react";
import JoinNowButton from "./JoinNowButton"; 

export default function ChessMoveOverlays({
  greatMoveFade,
  rookMoveFade,
  pawnMoveFade,
  finalMoveFade,
}) {
  return (
    <>
      {/* Great Move! */}
      <div
        className={`fixed z-30 select-none text-white text-center ${greatMoveFade}`}
        style={{
          top: "5%",
          right: "10%",
          transform: "translate(0, -10%)",
          fontFamily: "Poppins",
          fontSize: "1.5vw",
          lineHeight: 1.2,
          textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
        }}
      >
        <div>Great Move!</div>
        <div>
          <div className="font-light">Queen h4 next to Check.</div>
          <div className="font-thin italic">
            Simple. Direct. Powerful.
            <br />
            The way we like it at The Intellect Nest.
          </div>
        </div>
      </div>

      {/* Fabulous! */}
      <div
        className={`fixed z-30 select-none text-white text-center ${rookMoveFade}`}
        style={{
          top: "5%",
          left: "10%",
          transform: "translate(0, -10%)",
          fontFamily: "Poppins",
          fontSize: "1.5vw",
          lineHeight: 1.2,
          textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
        }}
      >
        <div>
          <div className="font-light">
            Fabulous!
            <br />
            Rook to g3 next to double down the threat
          </div>
          <div className="font-thin italic">
            because at The Intellect Nest,
            <br />
            we turn defense into destruction.
          </div>
        </div>
      </div>

      {/* Bravo! */}
      <div
        className={`fixed z-30 select-none text-white text-center ${pawnMoveFade}`}
        style={{
          top: "5%",
          right: "10%",
          transform: "translate(0, -10%)",
          fontFamily: "Poppins",
          fontSize: "1.5vw",
          lineHeight: 1.2,
          textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
        }}
      >
        <div>
          <div className="font-light">
            Bravo!
            <br />
            Pawn to e5
          </div>
          <div className="font-thin italic">
            Claim your space, no questions.
          </div>
        </div>
      </div>

      {/* Final Move */}
      <div
        className={`fixed z-30 select-none text-white text-center ${finalMoveFade}`}
        style={{
          top: "5%",
          left: "33%",
          fontFamily: "Poppins",
          fontSize: "1.5vw",
          lineHeight: 1.2,
          textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
        }}
      >
        <div className="font-light">
          So are you ready
          <br />
          <span className="font-light">
            For the Next Gen Chess Training For your kids?
          </span>
          <br />
          <span className="font-thin">Rook g4 to finish the game.</span>
        </div>
        <JoinNowButton />
      </div>
    </>
  );
}
