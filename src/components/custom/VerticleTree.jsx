import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

// VerticalTree Component
const VerticalTree = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Render the root node */}
      <VerticalNode item={data[0]} level={0} />
    </div>
  );
};

// VerticalNode Component
const VerticalNode = ({ item, level }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const [showDetails, setShowDetails] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const hasDetails =
    item.tools.length > 0 ||
    item.prerequisites.length > 0 ||
    item.resources.length > 0 ||
    item.milestones.length > 0;

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Calculate colors based on level
  const getBgColor = () => {
    switch (level) {
      case 0:
        return "bg-ocean-900 hover:bg-ocean-800";
      case 1:
        return "bg-ocean-800 hover:bg-ocean-700";
      case 2:
        return "bg-ocean-700 hover:bg-ocean-600";
      default:
        return "bg-ocean-600 hover:bg-ocean-500";
    }
  };

  const getBorderColor = () => {
    switch (level) {
      case 0:
        return "border-ocean-300";
      case 1:
        return "border-ocean-400";
      case 2:
        return "border-ocean-500";
      default:
        return "border-ocean-600";
    }
  };

  const getLineColor = () => {
    switch (level) {
      case 0:
        return "bg-ocean-400";
      case 1:
        return "bg-ocean-500";
      case 2:
        return "bg-ocean-600";
      default:
        return "bg-ocean-700";
    }
  };

  const indent = level * 24; // Smaller indentation

  return (
    <div className="relative">
      {/* Node */}
      <div
        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors 
                     ${getBgColor()} border-l-4 ${getBorderColor()} 
                     mb-1 relative z-10 p-5`}
        onClick={toggleExpand}
        style={{ marginLeft: `${indent}px`, width: `calc(100% - ${indent}px)` }}
      >
        {hasChildren && (
          <div className="mr-2 text-white">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        )}
        <div className={`${level === 0 ? "font-bold" : "font-medium"} text-sm`}>
          {item.title}
        </div>

        {/* Toggle Button for Additional Fields */}
        {hasDetails && (
          <button
            className="ml-auto text-xs font-bold text-white hover:text-gray-300 "
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent click handler
              toggleDetails();
            }}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        )}
      </div>

      {/* Additional Details */}
      {showDetails && hasDetails && (
        <div
          className="pl-8 pt-2 pb-2 bg-gray-800/50 border border-gray-700 rounded-md mt-1"
          style={{
            marginLeft: `${indent + 24}px`,
            width: `calc(100% - ${indent + 24}px)`,
          }}
        >
          {item.tools.length > 0 && (
            <div className="mb-1">
              <span className="font-semibold text-gray-300">Tools:</span>{" "}
              <span className="text-gray-400">{item.tools.join(", ")}</span>
            </div>
          )}
          {item.prerequisites.length > 0 && (
            <div className="mb-1">
              <span className="font-semibold text-gray-300">
                Prerequisites:
              </span>{" "}
              <span className="text-gray-400">
                {item.prerequisites.join(", ")}
              </span>
            </div>
          )}
          {item.resources.length > 0 && (
            <div className="mb-1">
              <span className="font-semibold text-gray-300">Resources:</span>{" "}
              <span className="text-gray-400">{item.resources.join(", ")}</span>
            </div>
          )}
          {item.milestones.length > 0 && (
            <div>
              <span className="font-semibold text-gray-300">Milestones:</span>{" "}
              <span className="text-gray-400">
                {item.milestones.join(", ")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Children with connecting lines */}
      {isExpanded && hasChildren && (
        <div className="relative">
          {/* Vertical line from parent */}
          <div
            className={`absolute ${getLineColor()} w-0.5`}
            style={{
              left: `${indent + 12}px`,
              top: "0px",
              height: "100%",
            }}
          ></div>

          <div className="pt-1">
            {item.children.map((child, index) => (
              <div key={index} className="relative">
                {/* Horizontal connector line to child */}
                <div
                  className={`absolute ${getLineColor()} h-0.5`}
                  style={{
                    left: `${indent + 12}px`,
                    top: "16px",
                    width: "12px",
                  }}
                ></div>
                <VerticalNode item={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default VerticalTree;
