import { Lightbulb, Search, Sparkles } from "lucide-react";
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

  // Function to clear the input field when clicked
  const handleInputClick = () => {
    setTopic(""); // Clear the input field
  };

  return (
    <div className="backdrop-blur-lg bg-black/30 border border-blue-primary/20 rounded-2xl p-6 h-full shadow-glow-blue">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-light">
        <Sparkles className="mr-2 h-5 w-5" />
        Generate Your Roadmap
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-teal-light">Enter a topic</label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Frontend Development"
              className="w-full bg-black/50 border border-blue-primary/30 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-all duration-200"
              onClick={handleInputClick} // Clear input when clicked
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-blue-light/70" />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-black/80 rounded-lg mt-1 overflow-hidden shadow-lg border border-blue-primary/20 animate-fade-in">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-blue-primary/10 cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    handleSuggestionClick(suggestion); // Update topic
                    setSuggestions([]); // Close the suggestions dropdown
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleGenerateRoadmap}
          disabled={isGenerating || !topic.trim()}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
            ${
              isGenerating || !topic.trim()
                ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-primary to-teal-primary text-white shadow-glow-blue hover:shadow-glow-teal hover:scale-105"
            }`}
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Generating...
            </>
          ) : (
            <>Generate Roadmap</>
          )}
        </button>

        <div className="mt-8">
          <div
            className="flex items-center text-sm text-teal-light cursor-pointer hover:text-teal-light/80 transition-colors"
            onClick={() => setShowTips(!showTips)}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            <span className="underline">Tips for better roadmaps</span>
          </div>

          {showTips && (
            <div className="mt-3 text-sm text-teal-light/80 bg-black/50 p-4 rounded-lg border border-teal-primary/20 animate-fade-in">
              <ul className="list-disc pl-5 space-y-2">
                <li>Be specific about the technology or field</li>
                <li>Include your experience level for tailored content</li>
                <li>Try topics like "Frontend Development" or "DevOps"</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;
