// components/ui/Scroll.js
import React from "react";

const Scroll = () => {
  return (
    <div className="absolute left-1/2 translate-x-[-50%] bottom-[25vh] z-30 flex flex-col items-center space-y-2">
      {/* Scroll Container */}
      <div
        className="relative border border-white"
        style={{
          width: "1vw",
          height: "4vh",
          borderRadius: "0.5vw",
        }}
      >
        <div
          className="absolute bg-white rounded-full animate-scroll-dot"
          style={{
            width: "0.2vw",
            height: "0.2vw",
            left: "50%",
            marginLeft: "-0.1vw",
            top: "1vh",
          }}
        />
      </div>

      {/* Scroll Down Text */}
      <div
        className="text-white text-[0.7vw] tracking-wide"
        style={{ fontFamily: "Poppins", fontWeight: 100 }}
      >
        Scroll Down
      </div>

      {/* Style block for font-face and scroll animation */}
      <style>
        {`
          @font-face {
            font-family: 'Poppins';
            src: url('/fonts/Poppins-Thin.ttf') format('truetype');
            font-weight: 100;
            font-style: normal;
          }

          @keyframes scroll-dot {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(2vh);
            }
          }

          .animate-scroll-dot {
            animation: scroll-dot 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Scroll;
