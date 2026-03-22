import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { ChevronDown, Info } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Computes graph layout
const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 150, ranksep: 200 });

  nodes.forEach((node) => {
    // Estimating standard dimension for the nodes
    dagreGraph.setNode(node.id, { width: 300, height: 120 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      // Adjust offset since dagre places origin in center, but react-flow sets it top-left
      position: {
        x: nodeWithPosition.x - 150,
        y: nodeWithPosition.y - 60,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

// Flatten the nested JSON structure into nodes and edges arrays
const generateGraphFromData = (data) => {
  const initialNodes = [];
  const initialEdges = [];

  // Data represents the root array like [roadmapData]
  let idCounter = 1;

  const traverse = (nodeData, parentId = null, level = 0) => {
    const currentId = `node-${idCounter++}`;
    const levelColors = [
      "bg-ocean-900 border-ocean-300",
      "bg-ocean-800 border-ocean-400",
      "bg-ocean-700 border-ocean-500",
      "bg-ocean-600 border-ocean-600",
    ];

    const themeClass = levelColors[Math.min(level, levelColors.length - 1)];

    initialNodes.push({
      id: currentId,
      type: "customNode",
      data: { ...nodeData, themeClass, level },
      position: { x: 0, y: 0 },
    });

    if (parentId) {
      initialEdges.push({
        id: `e${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        animated: true,
        style: { stroke: "#4fd1c5", strokeWidth: 2 },
      });
    }

    if (nodeData.children && nodeData.children.length > 0) {
      nodeData.children.forEach((child) =>
        traverse(child, currentId, level + 1),
      );
    }
  };

  if (data && data.length > 0) {
    traverse(data[0]);
  }

  return { initialNodes, initialEdges };
};

// Custom Node Component to display details
const CustomNode = ({ data, isConnectable }) => {
  const [showDetails, setShowDetails] = useState(false);

  const hasDetails =
    (data.tools && data.tools.length > 0) ||
    (data.prerequisites && data.prerequisites.length > 0) ||
    (data.resources && data.resources.length > 0) ||
    (data.milestones && data.milestones.length > 0);

  return (
    <div
      className={`relative w-[300px] border-l-4 rounded-xl shadow-lg p-4 cursor-pointer transition-all hover:scale-105 ${data.themeClass} relative overflow-hidden`}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-teal-300"
      />

      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-start justify-between">
          <h3 className="text-white font-bold text-lg leading-snug">
            {data.title}
          </h3>

          {hasDetails && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-teal-400 hover:text-teal-200 p-1 bg-black/20 rounded-full shrink-0 mt-0.5"
            >
              {showDetails ? <ChevronDown size={18} /> : <Info size={18} />}
            </button>
          )}
        </div>

        {showDetails && hasDetails && (
          <div className="mt-2 space-y-2 text-sm max-h-[200px] overflow-y-auto pr-1">
            {data.tools && data.tools.length > 0 && (
              <div>
                <span className="font-semibold text-gray-300 block">Tools</span>
                <span className="text-teal-100/80">
                  {data.tools.join(", ")}
                </span>
              </div>
            )}
            {data.prerequisites && data.prerequisites.length > 0 && (
              <div>
                <span className="font-semibold text-gray-300 block">
                  Prerequisites
                </span>
                <span className="text-teal-100/80">
                  {data.prerequisites.join(", ")}
                </span>
              </div>
            )}
            {data.resources && data.resources.length > 0 && (
              <div>
                <span className="font-semibold text-gray-300 block">
                  Resources
                </span>
                <span className="text-teal-100/80">
                  {data.resources.join(", ")}
                </span>
              </div>
            )}
            {data.milestones && data.milestones.length > 0 && (
              <div>
                <span className="font-semibold text-gray-300 block">
                  Milestones
                </span>
                <span className="text-teal-100/80">
                  {data.milestones.join(", ")}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-teal-300"
      />
    </div>
  );
};

// Register custom nodes type
const nodeTypes = {
  customNode: CustomNode,
};

// Main Graph Component wrapper
const TopDownGraph = ({ data }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  useEffect(() => {
    const { initialNodes, initialEdges } = generateGraphFromData(data);
    const layouted = getLayoutedElements(initialNodes, initialEdges, "TB");

    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, [data, setNodes, setEdges]);

  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: "100%", height: "100%" }} className="bg-transparent">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={1.5}
        attributionPosition="bottom-right"
      >
        <Controls className="bg-gray-800 text-teal-400 fill-teal-400 rounded-md border-gray-700" />
        <Background color="#0f766e" gap={20} size={1} variant="dots" />
      </ReactFlow>
    </div>
  );
};

export default TopDownGraph;
