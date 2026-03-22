import { useEffect, useState } from "react";
import RoadmapGenerator from "./components/custom/RoadmapGenerator";
import RoadmapVisualizer from "./components/custom/RoadmapVisualizer";
import ApiService from "./service/ApiService";

function App() {
  const [topic, setTopic] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [error, setError] = useState("");

  // Create an instance of ApiService
  const apiService = new ApiService();

  // Sample topics for suggestions
  const availableTopics = [
    "Frontend Development",
    "Backend Development",
    "DevOps",
    "Machine Learning",
    "Mobile Development",
    "Data Science",
  ];

  // Handle splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (topic.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = availableTopics.filter((t) =>
        t.toLowerCase().includes(topic.toLowerCase()),
      );
      setSuggestions(filtered);
    }
  }, [topic]);

  // Normalize the backend response to match the expected structure
  // Normalize the backend response to match the expected structure
  const normalizeData = (data) => {
    return {
      title: data.title,
      tools: data.tools || [], // Ensure tools is an array
      prerequisites: data.prerequisites || [], // Ensure prerequisites is an array
      resources: data.resources || [], // Ensure resources is an array
      milestones: data.milestones || [], // Ensure milestones is an array
      children: data.children?.map((child) => normalizeData(child)) || [], // Recursively normalize children
    };
  };

  // Handle generating roadmap
  const handleGenerateRoadmap = async () => {
    if (!topic.trim()) {
      setError("Please enter a valid topic.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const apiResponse = await apiService.postData(topic);
      const normalizedData = normalizeData(apiResponse); // Normalize the response
      setRoadmapData(normalizedData);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setTopic(suggestion);
    setSuggestions([]);
  };

  // Render splash screen if active
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gray-800 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-primary to-teal-primary">
            Pathfinder.ai
          </h1>
          <p className="text-teal-light mt-2">Your journey starts here</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col font-sans selection:bg-teal-500/30">
      {/* Absolute Header (Only shown when results exist, otherwise hidden or minimized) */}
      <div
        className={`container mx-auto p-4 flex-shrink-0 transition-opacity duration-300 ${!roadmapData && !isGenerating ? "opacity-0 h-0 hidden" : "opacity-100"}`}
      >
        <div className="animate-fade-in-down flex justify-between items-center mb-0 pt-2">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-primary to-teal-primary">
            Pathfinder.ai
          </h1>
          {error && (
            <p className="text-red-500 text-sm hidden md:block">{error}</p>
          )}
        </div>
      </div>

      <div
        className={`flex-grow flex w-full relative ${!roadmapData && !isGenerating ? "items-center justify-center" : ""}`}
      >
        {/* Main Content */}
        {!roadmapData && !isGenerating ? (
          <div className="w-full max-w-3xl mx-auto px-4 pb-32 animate-fade-in-up flex flex-col items-center">
            <div className="text-center mb-10">
              <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-teal-300 to-blue-600 mb-6 tracking-tight drop-shadow-sm">
                Pathfinder
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                What do you want to learn today? Enter any topic, tool, or
                career path and we'll map out your journey.
              </p>
            </div>

            <div className="w-full max-w-2xl">
              <RoadmapGenerator
                topic={topic}
                setTopic={setTopic}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                handleSuggestionClick={handleSuggestionClick}
                handleGenerateRoadmap={handleGenerateRoadmap}
                isGenerating={isGenerating}
              />
            </div>

            {error && (
              <p className="text-red-500 mt-6 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}
          </div>
        ) : (
          <div className="w-full h-full absolute inset-0 animate-fade-in flex flex-col gap-4 px-4 pb-4">
            <div className="flex justify-between items-center mb-2 px-2 z-10 relative">
              <button
                onClick={() => {
                  setRoadmapData(null);
                  setIsGenerating(false);
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-teal-primary/30 rounded-lg text-teal-light transition-colors shadow-sm flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                New Search
              </button>
            </div>

            <div className="flex-grow w-full relative">
              <div className="absolute inset-0">
                <RoadmapVisualizer
                  roadmapData={roadmapData}
                  isGenerating={isGenerating}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
