import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import TopDownGraph from "./TopDownGraph";

function RoadmapVisualizer({ roadmapData, isGenerating }) {
  return (
    <div className="w-full h-full relative">
      {isGenerating ? (
        <LoadingState />
      ) : roadmapData ? (
        <div className="animate-fade-in w-full h-full">
          <TopDownGraph data={[roadmapData]} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default RoadmapVisualizer;
