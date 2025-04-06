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
        t.toLowerCase().includes(topic.toLowerCase())
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
    <main className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="animate-fade-in-down flex justify-center mb-8 pt-6 mt-2">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-primary to-teal-primary">
            Pathfinder.ai
          </h1>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Input */}
          <div className="lg:w-1/3 w-full animate-fade-in-left">
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

          {/* Right Side - Roadmap Visualization */}
          <div className="lg:w-2/3 w-full animate-fade-in-right">
            <RoadmapVisualizer
              roadmapData={roadmapData}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
