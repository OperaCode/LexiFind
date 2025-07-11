import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import { motion } from "motion/react";

const LandingPage = () => {
  const [wordOfDay, setWordOfDay] = useState({
    word: "Loading...",
    definition: "Fetching definition...",
    pronunciation: "N/A",
    partOfSpeech: "N/A",
  });

  // List of common words for random selection
  const wordList = [
    "serendipity",
    "ephemeral",
    "luminous",
    "quixotic",
    "resilient",
    "ubiquitous",
    "zenith",
    "euphoria",
    "mellifluous",
    "pristine",
    "vivid",
    "eloquent",
    "serene",
    "radiant",
    "intricate",
  ];

  useEffect(() => {
    // Fetch random Word of the Day
    const fetchWordOfDay = async () => {
      try {
        // Select a random word from the list
        const randomWord =
          wordList[Math.floor(Math.random() * wordList.length)];
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
        );
        const data = await response.json();
        if (data && data[0]) {
          const { word, meanings, phonetics } = data[0];
          setWordOfDay({
            word: word,
            definition:
              meanings[0]?.definitions[0]?.definition ||
              "No definition available",
            pronunciation: phonetics[0]?.text || "N/A",
            partOfSpeech: meanings[0]?.partOfSpeech || "N/A",
          });
        } else {
          // Fallback if API fails for the selected word
          setWordOfDay({
            word: randomWord,
            definition: "Definition not available at this time.",
            pronunciation: "N/A",
            partOfSpeech: "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching word of the day:", error);
        setWordOfDay({
          word: "Error",
          definition: "Unable to fetch word. Please try again later.",
          pronunciation: "N/A",
          partOfSpeech: "N/A",
        });
      }
    };

    fetchWordOfDay();

    // Update daily at midnight
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();
    const timer = setTimeout(fetchWordOfDay, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen flex flex-col bg-gradient-to-br from-green-500 via-teal-400 to-blue-500 text-white overflow-hidden"
    >
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white/10 backdrop-blur-lg sticky top-0 z-20 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen size={28} />
          LexiFind
        </h1>
        <nav>
          <Link to="/home">
            <button className="text-white font-medium px-5 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Get Started
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.main
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex flex-col items-center justify-center flex-grow px-4 md:px-8 text-center animate-fadeIn"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl"
        >
          {/* Hero Icon */}
          <Search
            size={72}
            className="mx-auto mb-8 text-white drop-shadow-xl animate-pulse-slow"
          />

          {/* Title */}
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl"
          >
            Master Words with LexiFind
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl mb-4 max-w-xl mx-auto opacity-90 leading-relaxed"
          >
            Discover definitions, synonyms, and pronunciations to boost your
            vocabulary effortlessly.
          </motion.p>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl mt-2 mb-10 max-w-md mx-auto opacity-80"
          >
            Learn a new word every day and elevate your communication skills.
          </motion.p>

          {/* Word of the Day */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-6 mb-10 max-w-lg mx-auto shadow-lg transform transition-all hover:scale-105 animate-pulse-slow"
          >
            <h2 className="text-2xl font-semibold mb-3">Word of the Day</h2>
            <p className="text-xl font-bold text-yellow-200">
              {wordOfDay.word}
            </p>
            <p className="text-base italic text-gray-100 mb-2">
              {wordOfDay.pronunciation} • {wordOfDay.partOfSpeech}
            </p>
            <p className="text-lg text-gray-100">{wordOfDay.definition}</p>
          </motion.div>

          {/* Button */}
          <Link to="/home">
            <motion.button
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white text-green-600 font-semibold px-10 py-4 rounded-full shadow-2xl hover:bg-green-100 hover:scale-110 transform transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
            >
              <Search size={24} />
              Start Learning Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 md:px-12 text-center bg-white/10 backdrop-blur-lg mt-auto">
        <p className="text-sm opacity-80">
          © 2025 LexiFind. Built with ❤️ by Opera.
        </p>
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
    </motion.div>
  );
};

export default LandingPage;
