"use client";

import { useState } from "react";
import MouseFollower from "@/components/MouseFollower";
import AnimatedText from "@/components/AnimatedText";

const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque dignissim felis id porttitor. Nulla hendrerit neque ut aliquam pretium. Nulla posuere, felis sed lobortis aliquet, diam velit rhoncus ex, vitae consequat lacus velit eget nunc. Nam sodales metus sit amet tellus egestas, id scelerisque sapien placerat. Quisque at varius lorem. Suspendisse interdum, erat et faucibus cursus, purus odio lobortis metus, eget venenatis nunc ex et eros. Pellentesque sit amet sollicitudin elit. Fusce pulvinar dui id porttitor finibus. Donec at efficitur est, non aliquet quam. Nullam varius quis velit et venenatis. Phasellus sit amet commodo orci, eget fringilla eros.

Phasellus enim sem, ultricies ac venenatis placerat, facilisis ac lectus. In facilisis ligula nisl, at sollicitudin ante elementum vel. Curabitur faucibus congue ex sit amet ultrices. Etiam non porttitor elit. Curabitur in enim blandit, efficitur urna luctus, fringilla leo. Sed aliquam ante et aliquet fringilla. Curabitur eu dolor rutrum, tincidunt augue quis, iaculis diam. Integer in diam sit amet ipsum sollicitudin venenatis. Duis massa erat, suscipit sed pulvinar eget, vulputate non velit. Cras tempus facilisis ante, sed cursus lectus.

Ut massa ligula, pharetra ut leo vitae, hendrerit bibendum sem. Aenean sem neque, convallis sed odio vel, accumsan efficitur tellus. Aenean commodo varius dolor. Quisque vehicula euismod magna sed interdum. Duis pretium, erat et tincidunt rhoncus, lorem velit suscipit lectus, laoreet vestibulum nibh odio id nibh. Donec tincidunt tincidunt ultricies. Quisque turpis nulla, luctus eu lacus non, luctus porttitor lectus. Morbi pretium nisi magna, vel cursus libero ullamcorper scelerisque. Aliquam erat volutpat.

Quisque at velit eleifend neque vehicula tristique mollis mollis nisi. Duis lacinia libero in nulla fermentum faucibus. Praesent vel massa fringilla, ornare metus non, aliquet dui. Mauris mattis justo at justo bibendum venenatis. Etiam a placerat erat. Proin pharetra tellus ac erat posuere, et malesuada ipsum feugiat. Morbi sodales sodales diam, sit amet dapibus nibh aliquet mattis. Integer in mi id erat laoreet facilisis. Nullam nec erat ac tellus imperdiet sollicitudin non et urna.

Nullam hendrerit metus sed quam tincidunt, ut fermentum eros vestibulum. Nam vel magna sit amet nunc mattis mollis. Aliquam erat volutpat. Sed nec sem elementum, dignissim nulla at, iaculis lorem. Vestibulum auctor ac sapien sed consequat. Nulla vulputate diam mauris, feugiat cursus justo finibus vel. Nunc aliquet dapibus purus. Phasellus at posuere metus. Sed pharetra feugiat tortor at sagittis. Sed consequat rhoncus lacinia.`;

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => setIsMouseIn(true);
  const handleMouseLeave = () => setIsMouseIn(false);

  const circleSizeVW = 2;

  return (
    <main
      className="relative bg-[#12131d] h-screen flex flex-col items-center overflow-auto"
      style={{
        cursor: "none",
        paddingTop: "5vh",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="/bluenoise.png"
        alt="Bluenoise background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
          userSelect: "none",
          opacity: 0.2,
        }}
      />

      <div className="absolute inset-0 z-5 pointer-events-none">
        <MouseFollower />
      </div>

      <img
        src="/logo.png"
        alt="Logo"
        className="z-10"
        style={{
          width: "8vw",
          height: "auto",
          marginBottom: "5vh",
        }}
      />

      <div className="flex-grow flex items-start justify-center z-10">
        <AnimatedText />
      </div>

      <div
        style={{
          position: "fixed",
          top: `calc(${mousePos.y}px - ${circleSizeVW / 2}vw)`,
          left: `calc(${mousePos.x}px - ${circleSizeVW / 2}vw)`,
          width: `${circleSizeVW}vw`,
          height: `${circleSizeVW}vw`,
          borderRadius: "50%",
          border: `1px solid white`,
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: 1000,
          transition:
            "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isMouseIn ? "scale(1)" : "scale(0)",
          opacity: isMouseIn ? 1 : 0,
        }}
      />

      <div className="w-full max-w-3xl text-white px-6 py-12 space-y-12 z-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <section key={i}>
            <h2 className="text-3xl font-bold mb-4">Lorem Ipsum</h2>
            <p>{loremText}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
