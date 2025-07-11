import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, Loader2 } from "lucide-react";

const Home = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchWord = async (e) => {
    e.preventDefault();
    if (!word.trim()) {
      toast.error("Please enter a word to search", { autoClose: 3000 });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`
      );
      setDefinition(response.data[0]);
      toast.success(`Definition found for "${word}"`, { autoClose: 2000 });
    } catch (error) {
      console.error("Error fetching definition:", error);
      toast.error("Word not found or error fetching definition", { autoClose: 3000 });
      setDefinition(null);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setWord("");
    setDefinition(null);
    toast.info("Form cleared", { autoClose: 2000 });
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-teal-300 to-blue-400 px-4 py-8">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <BookOpen size={24} />
          WordWise
        </h1>
        <nav>
          <button
            type="button"
            onClick={goBack}
            className="text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition duration-300"
            aria-label="Back to home page"
          >
            Back to Home
          </button>
        </nav>
      </header>

      {/* Main Form */}
      <form
        onSubmit={searchWord}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md space-y-6 mt-8 animate-fadeIn"
        aria-label="Dictionary search form"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 flex items-center justify-center gap-2">
          <Search size={28} className="animate-spin-slow" />
          Dictionary Search
        </h2>

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
              placeholder="e.g., example"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              aria-label="Word search input"
            />
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition flex items-center justify-center gap-2"
          aria-label="Search word meaning"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <Search size={20} />
              Search Meaning
            </>
          )}
        </button>

        {/* Definition Output */}
        {definition && (
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              {definition.word}
              {definition.phonetic && (
                <span className="text-sm text-gray-500 ml-2">[{definition.phonetic}]</span>
              )}
            </h3>
            {definition.meanings.map((meaning, idx) => (
              <div key={idx} className="mb-4">
                <p className="italic text-green-600 font-medium">{meaning.partOfSpeech}</p>
                {meaning.definitions.map((def, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-gray-700">• {def.definition}</p>
                    {def.example && (
                      <p className="text-sm text-gray-500">Example: {def.example}</p>
                    )}
                    {def.synonyms?.length > 0 && (
                      <p className="text-sm text-gray-500">
                        Synonyms: {def.synonyms.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
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
    </div>
  );
};

export default Home;