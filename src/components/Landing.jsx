import React, { useEffect, useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import { Link } from 'react-router-dom';
    import { BookOpen, Search } from 'lucide-react';

   const LandingPage = () => {
      const [wordOfDay, setWordOfDay] = useState({
        word: 'Loading...',
        definition: 'Fetching definition...',
        pronunciation: 'N/A',
        partOfSpeech: 'N/A',
      });

      // List of common words for random selection
      const wordList = [
        'serendipity', 'ephemeral', 'luminous', 'quixotic', 'resilient',
        'ubiquitous', 'zenith', 'euphoria', 'mellifluous', 'pristine',
        'vivid', 'eloquent', 'serene', 'radiant', 'intricate'
      ];

      useEffect(() => {
        // Initialize Lucide icons
        // Lucide.createIcons();

        // Fetch random Word of the Day
        const fetchWordOfDay = async () => {
          try {
            // Select a random word from the list
            const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
            const data = await response.json();
            if (data && data[0]) {
              const { word, meanings, phonetics } = data[0];
              setWordOfDay({
                word: word,
                definition: meanings[0]?.definitions[0]?.definition || 'No definition available',
                pronunciation: phonetics[0]?.text || 'N/A',
                partOfSpeech: meanings[0]?.partOfSpeech || 'N/A',
              });
            } else {
              // Fallback if API fails for the selected word
              setWordOfDay({
                word: randomWord,
                definition: 'Definition not available at this time.',
                pronunciation: 'N/A',
                partOfSpeech: 'N/A',
              });
            }
          } catch (error) {
            console.error('Error fetching word of the day:', error);
            setWordOfDay({
              word: 'Error',
              definition: 'Unable to fetch word. Please try again later.',
              pronunciation: 'N/A',
              partOfSpeech: 'N/A',
            });
          }
        };

        fetchWordOfDay();

        // Update daily at midnight
        const now = new Date();
        const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
        const timer = setTimeout(fetchWordOfDay, msUntilMidnight);

        return () => clearTimeout(timer);
      }, []);

      return (
        <div className="relative w-full min-h-screen flex flex-col bg-gradient-to-br from-green-500 via-teal-400 to-blue-500 text-white overflow-hidden">
          {/* Header */}
          <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white/10 backdrop-blur-lg sticky top-0 z-20 shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
              <BookOpen size={28} />
              LexiFind
            </h1>
            <nav>
              <Link to="/home">
                <button
                  className="text-white font-medium px-5 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-105"
                  aria-label="Get started with dictionary search"
                >
                  Get Started
                </button>
              </Link>
            </nav>
          </header>

          {/* Hero Section */}
          <main className="flex flex-col items-center justify-center flex-grow px-4 md:px-8 text-center animate-fadeIn">
            <div className="max-w-4xl">
              {/* Hero Icon */}
              <Search size={72} className="mx-auto mb-8 text-white drop-shadow-xl animate-pulse-slow" />

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl">
                Master Words with LexiFind
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl md:text-2xl mb-4 max-w-xl mx-auto opacity-90 leading-relaxed">
                Discover definitions, synonyms, and pronunciations to boost your vocabulary effortlessly.
              </p>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl mt-2 mb-10 max-w-md mx-auto opacity-80">
                Learn a new word every day and elevate your communication skills.
              </p>

              {/* Word of the Day */}
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 mb-10 max-w-lg mx-auto shadow-lg transform transition-all hover:scale-105">
                <h2 className="text-2xl font-semibold mb-3">Word of the Day</h2>
                <p className="text-xl font-bold text-yellow-200">{wordOfDay.word}</p>
                <p className="text-base italic text-gray-100 mb-2">{wordOfDay.pronunciation} • {wordOfDay.partOfSpeech}</p>
                <p className="text-lg text-gray-100">{wordOfDay.definition}</p>
              </div>

              {/* Hero Illustration */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto mb-10">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse-slow"></div>
                <BookOpen
                  size={96}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
                  aria-hidden="true"
                />
              </div>

              {/* CTA Button */}
              <Link to="/home">
                <button className="bg-white text-green-600 font-semibold px-10 py-4 rounded-full shadow-2xl hover:bg-green-100 hover:scale-110 transform transition-all duration-300 flex items-center gap-3 mx-auto">
                  <Search size={24} />
                  Start Learning Now
                </button>
              </Link>
            </div>
          </main>

          {/* SVG Wave */}
          <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
              <path
                d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
                className="fill-white/20"
              ></path>
            </svg>
          </div>

          {/* Footer */}
          <footer className="w-full py-4 px-6 md:px-12 text-center bg-white/10 backdrop-blur-lg mt-auto">
            <p className="text-sm opacity-80">© 2025 LexiFind. Built with ❤️ by Raphael.</p>
          </footer>

          {/* Animation styles */}
          <style jsx="true">{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 1s ease-out forwards;
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
              animation: spinSlow 10s linear infinite;
            }

            @keyframes pulseSlow {
              0%, 100% {
                transform: scale(1);
                opacity: 0.3;
              }
              50% {
                transform: scale(1.15);
                opacity: 0.5;
              }
            }
            .animate-pulse-slow {
              animation: pulseSlow 6s ease-in-out infinite;
            }
          `}</style>
        </div>
      );
    };



    export default LandingPage;