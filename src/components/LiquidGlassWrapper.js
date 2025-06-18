// app/LiquidGlassWrapper.js
"use client";
export default function LiquidGlassWrapper({ children }) {
  return (
    <>
      {/* Main Capsule */}
      <div className="liquid-glass-box fixed bottom-[5%] left-1/2 -translate-x-1/2 w-[18vw] h-[4vw] bg-[#7CACFF] rounded-full z-[100]">
        {/* Contact Us Text on Left Side */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-[101]">
          <span className="text-white text-[1.2vw] font-medium">
            Contact Us
          </span>
        </div>

        {/* White Overlapping Capsule (Z-Index on Top) */}
        <div className="white-capsule absolute top-1/2 right-1 -translate-y-1/2 w-[9vw] h-[3vw] rounded-full bg-white z-[101] flex items-center justify-center">
          <span className="text-gradient text-[1.5vw] font-semibold">
            Enroll
          </span>
        </div>
      </div>
      {children}
      <style jsx>{`
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
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 1;
          }
        }
        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .liquid-glass-box {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 30px rgba(0, 27, 74, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        .text-gradient {
          font-family: "Poppins", sans-serif;
          background: linear-gradient(
            90deg,
            #0c0c0e 25%,
            #00a5ff 50%,
            #0c0c0e 75%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          transition: all 0.3s ease;
        }
        .white-capsule:hover .text-gradient {
          animation: textShimmer 0.8s ease-in-out;
        }
      `}</style>
    </>
  );
}
