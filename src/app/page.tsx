import Image from "next/image";
import "../styles/fonts.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black relative overflow-hidden font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-800/10 to-transparent"></div>

      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full opacity-80"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>

      {/* Header Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-3 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <Image
            src="/logo.png"
            alt="Keikku Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-white text-2xl font-black tracking-wide">
            Keikku
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            Don't miss a beat
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Keikku, our next generation digital stethoscope
          </p>
        </div>

        {/* Empty Center Space */}
        <div className="w-80 h-80 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/20 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Bottom Navigation */}
        <div className="backdrop-blur-md bg-slate-900/80 border border-blue-500/20 rounded-full px-8 py-4 flex items-center space-x-8">
          <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full">
            <Image
              src="/logo.png"
              alt="Keikku"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-white font-semibold">Keikku</span>
          </div>

          <button className="text-gray-300 hover:text-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5">
            Discover
          </button>

          <button className="text-gray-300 hover:text-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5">
            App
          </button>

          <button className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-all duration-300 font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5">
            Contact us
          </button>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
}
