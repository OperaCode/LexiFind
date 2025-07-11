import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, Volume2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const Home = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [wotdLoading, setWotdLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // fetch definition for searc
  const fetchDefinition = async (term, isWOTD = false) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${term.trim()}`
      );
      if (isWOTD) {
        setWordOfTheDay(response.data[0]);
        toast.info(`Word of the Day: "${term}"`, { autoClose: 2000 });
      } else {
        setDefinition(response.data[0]);
        setRecentSearches((prev) => {
          const updated = [term, ...prev.filter((w) => w !== term)].slice(0, 5);
          localStorage.setItem("recentSearches", JSON.stringify(updated));
          return updated;
        });
        toast.info(`Definition found for "${term}"`, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
      toast.error("Word not found or error fetching definition", {
        autoClose: 3000,
      });
    }
  };

  const fetchRandomWordOfTheDay = async () => {
    const words = [
      "serendipity",
      "eloquent",
      "resilience",
      "ephemeral",
      "sonder",
    ];
    const random = words[Math.floor(Math.random() * words.length)];
    setWotdLoading(true);
    await fetchDefinition(random, true);
    setWotdLoading(false);
  };

  const searchWord = async (e) => {
    e.preventDefault();
    if (!word.trim()) {
      toast.error("Please enter a word to search", { autoClose: 3000 });
      return;
    }
    setLoading(true);
    await fetchDefinition(word);
    setLoading(false);
  };

  const clearForm = () => {
    setWord("");
    setDefinition(null);
  };

  const goBack = () => {
    navigate("/");
  };

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center bg-gradient-to-br from-green-400 via-teal-300 to-blue-400 px-4 py-8"
    >
      {/* Header with Mascot */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span role="img" aria-label="Mascot" className="animate-wiggle">
            🦉
          </span>
          LexiFind
        </h1>
        <nav>
          <button
            type="button"
            onClick={goBack}
            className="text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer"
            
          >
            Back to Home
          </button>
        </nav>
      </header>

      <section className="md:flex justify-around m-auto w-full">
        {/* Word of the Day */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white/90 h-2/3 backdrop-blur-md rounded-xl shadow-lg p-4 mt-8 w-full max-w-md animate-fadeIn"
        >
          <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-2">
            <Sparkles size={20} />
            Word of the Day
          </h2>
          {wotdLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : wordOfTheDay ? (
            <>
              <p className="text-lg font-semibold text-gray-800">
                {wordOfTheDay.word}
              </p>
              {wordOfTheDay.phonetics[0]?.audio && (
                <button
                  onClick={() => playAudio(wordOfTheDay.phonetics[0].audio)}
                  className="text-green-600 cursor-pointer hover:text-green-800 transition"
                  aria-label="Play pronunciation"
                >
                  <Volume2 size={20} />
                </button>
              )}
              <p className="text-gray-700 mt-2">
                {wordOfTheDay.meanings[0].definitions[0].definition}
              </p>
            </>
          ) : (
            <p className="text-gray-500 italic">
              Click "Surprise Me" to see today's word!
            </p>
          )}
        </motion.div>

        {/* Main Form */}
        <form
          onSubmit={searchWord}
          className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md space-y-6 mt-8 animate-fadeIn"
          aria-label="Dictionary search form"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-center text-green-700 flex items-center justify-center gap-2"
          >
            <Search size={28} className="animate-spin-slow" />
            Search Dictionary
          </motion.h2>

          {/* Search Input */}
          <div className="space-y-2">
            <label htmlFor="word" className="block font-medium text-gray-700">
              Enter Word
            </label>
            <div className="relative">
              <input
                type="text"
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="e.g., ephemeral"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                aria-label="Word search input"
              />
              <Search
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition flex items-center justify-center gap-2 cursor-pointer"
            
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin-slow" />
            ) : (
              <>
                <Search size={20} />
                Search Meaning
              </>
            )}
          </button>

          {/* Surprise Me Button */}
          <button
            type="button"
            onClick={fetchRandomWordOfTheDay}
            className="w-full bg-teal-600 text-white cursor-pointer font-semibold py-3 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2"
            
          >
            <Sparkles size={20} />
            Surprise Me
          </button>

          {/* Definition Output */}
          {definition && (
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                {definition.word}
                {definition.phonetics[0]?.audio && (
                  <button
                    onClick={() => playAudio(definition.phonetics[0].audio)}
                    className="text-green-600 hover:text-green-800 transition cursor-pointer"
                   
                  >
                    <Volume2 size={20} />
                  </button>
                )}
              </h3>
              {definition.meanings.map((meaning, idx) => (
                <div key={idx} className="mb-4">
                  <p className="italic text-green-600 font-medium">
                    {meaning.partOfSpeech}
                  </p>
                  {meaning.definitions.map((def, i) => (
                    <div key={i} className="mb-2">
                      <p className="text-gray-700">• {def.definition}</p>
                      {def.example && (
                        <p className="text-sm text-gray-500">
                          Example: {def.example}
                        </p>
                      )}
                      {def.synonyms?.length > 0 && (
                        <p className="text-sm text-gray-500">
                          Synonyms: {def.synonyms.slice(0, 3).join(", ")}
                          {def.synonyms.length > 3 && " ..."}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                Recent Searches:
              </h4>
              <ul className="flex flex-wrap gap-2">
                {recentSearches.map((w, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setWord(w);
                      fetchDefinition(w);
                    }}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full cursor-pointer hover:bg-green-200 transition text-sm"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={clearForm}
              className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              aria-label="Clear form"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={goBack}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300"
              aria-label="Back to home page"
            >
              Back to Home
            </button>
          </div>
        </form>
      </section>

      {/* Animation styles */}
      <style jsx="true">{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
          @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
