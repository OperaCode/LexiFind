import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";

const LandingPage = () => {
  // Initialize Lucide icons
  useEffect(() => {
    import("lucide-react").then((lucide) => {
      lucide.createIcons();
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-gradient-to-br from-green-500 via-teal-400 to-blue-500 text-white overflow-hidden">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BookOpen size={24} />
          LexiFind
        </h1>
        <nav>
          <Link to="/home">
            <button
              className="text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition duration-300"
              aria-label="Get started with dictionary search"
            >
              Get Started
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center animate-fadeIn">
        <div className="max-w-3xl">
          {/* Hero Icon */}
          <Search size={64} className="mx-auto mb-6 text-white drop-shadow-lg" />

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
            Master Words Effortlessly with LexiFind
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl mb-4 max-w-lg mx-auto opacity-90">
            Instantly explore definitions, synonyms, and word insights to elevate your vocabulary and communication.
          </p>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl mt-2 mb-8 max-w-md mx-auto opacity-80">
            Learn new words, hear pronunciations, and expand your communication skills daily.
          </p>

          {/* Word of the Day */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Word of the Day</h2>
            <p className="text-lg">“Serendipity” – the occurrence of happy or beneficial events by chance.</p>
          </div>

          {/* Hero Illustration */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse-slow"></div>
            <BookOpen
              size={80}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
              aria-hidden="true"
            />
          </div>

          {/* CTA Button */}
          <Link to="/home" >
            <button className="bg-white text-green-600 font-semibold px-8 py-4 rounded-full shadow-xl hover:bg-green-100 hover:scale-105 transform transition duration-300 flex items-center gap-2">
              <Search size={20} />
              Start Learning Now
            </button>
          </Link>
        </div>
      </main>

      {/* SVG Wave */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20">
          <path d="M-0.27,7.79 C150.00,150.00 349.46,-49.98 500.84,100.00 L500.00,150.00 L0.00,150.00 Z" className="fill-white/10"></path>
        </svg>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center bg-white/10 backdrop-blur-md mt-auto">
        <p className="text-sm opacity-80">© 2025 LexiFind. Built with ❤️ by Raphael.</p>
      </footer>

      {/* Animation styles */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes spinSlow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
