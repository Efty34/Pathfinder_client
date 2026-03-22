import { ArrowRight, Lightbulb, Search, Sparkles } from "lucide-react";
import { useState } from "react";

const RoadmapGenerator = ({
  topic,
  setTopic,
  suggestions,
  setSuggestions,
  handleSuggestionClick,
  handleGenerateRoadmap,
  isGenerating,
}) => {
  const [showTips, setShowTips] = useState(false);

  const handleInputClick = () => {
    setTopic("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && topic.trim() && !isGenerating) {
      setSuggestions([]); // close suggestions if open
      handleGenerateRoadmap();
    }
  };

  return (
    <div className="w-full relative z-20">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-gray-900/80 backdrop-blur-xl border border-gray-700 hover:border-gray-500 rounded-full p-2 shadow-2xl transition-all duration-300">
          <Search className="ml-5 h-6 w-6 text-gray-400 group-hover:text-teal-400 transition-colors" />

          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Master Full-Stack Web Development..."
            className="flex-grow bg-transparent text-white px-5 py-3 md:py-4 text-lg md:text-xl focus:outline-none placeholder-gray-500 w-full"
            onClick={handleInputClick}
            autoComplete="off"
            id="roadmap-search"
          />

          <button
            onClick={handleGenerateRoadmap}
            disabled={isGenerating || !topic.trim()}
            className={`mr-2 h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
              ${
                isGenerating || !topic.trim()
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                  : "bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 hover:bg-teal-50"
              }`}
          >
            {isGenerating ? (
              <svg
                className="animate-spin h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <ArrowRight className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-gray-900/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 animate-fade-in z-50 py-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-6 py-3 md:py-4 text-gray-300 font-medium hover:bg-white/5 hover:text-white cursor-pointer transition-colors flex items-center"
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  setSuggestions([]);
                }}
              >
                <Sparkles className="h-4 w-4 mr-3 text-blue-400" />
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <button
          className="flex items-center text-sm md:text-base text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-full transition-all border border-gray-700/50 hover:border-gray-600"
          onClick={() => setShowTips(!showTips)}
        >
          <Lightbulb className="h-4 w-4 mr-2 text-yellow-500/80" />
          Need Inspiration?
        </button>

        {showTips && (
          <div className="mt-4 text-sm text-gray-300 bg-gray-900/60 p-5 rounded-2xl border border-gray-700/50 animate-fade-in max-w-md w-full shadow-lg backdrop-blur-sm">
            <h4 className="font-semibold text-white mb-2 ml-1">
              Pro Search Tips:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-teal-400 mr-2 mt-0.5">•</span> Be specific
                about the technology (e.g., "React Native" instead of "Mobile")
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2 mt-0.5">•</span> Target a
                career path (e.g., "Cloud DevOps Engineer")
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2 mt-0.5">•</span> Combine
                fields (e.g., "Machine Learning in JavaScript")
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapGenerator;
