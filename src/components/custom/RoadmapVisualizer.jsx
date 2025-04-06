import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import VerticalTree from "./VerticleTree";



function RoadmapVisualizer({ roadmapData, isGenerating }) {
  return (
    <div className="backdrop-blur-lg bg-black/30 border border-teal-primary/20 rounded-2xl p-6 min-h-[600px] h-full shadow-glow-teal">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-teal-light">
        Your Learning Path
      </h2>

      <div className="overflow-auto max-h-[calc(100vh-200px)]">
        {isGenerating ? (
          <LoadingState/>
        ) : roadmapData ? (
          <div className="animate-fade-in">
            <VerticalTree data={[roadmapData]} />
          </div>
        ) : (
          <EmptyState/>
        )}
      </div>
    </div>
  );
}

export default RoadmapVisualizer;