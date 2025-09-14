// src/components/OrgChart.tsx
import React, { useMemo, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import type { Employee } from "./Sidebar";
import { buildTreeData } from "../utils/buildTreeData";
import "./OrgChart.css";

interface OrgChartProps {
  employees: Employee[];
  onManagerChange: (employeeId: string, newManagerId: string) => void;
  selectedEmployeeId?: string | null;
}



const OrgChart: React.FC<OrgChartProps> = ({ employees, onManagerChange, selectedEmployeeId }) => {
  const treeData = useMemo(() => buildTreeData(employees), [employees]);
  const treeRef = useRef<any>(null);
  // Map employeeId to hierarchy node
  const hierarchyNodeMap = useRef<Record<string, any>>({});

  // Custom node renderer, also builds map of employeeId to hierarchy node
  const renderNode = (props: any) => {
    const { nodeDatum, hierarchyPointNode } = props;
    if (nodeDatum.attributes?.id === "root") {
      return <g />;
    }
    // Store mapping for centering
    if (hierarchyPointNode && nodeDatum.attributes?.id) {
      hierarchyNodeMap.current[nodeDatum.attributes.id] = hierarchyPointNode;
    }

    // Determine image source: use photoUrl if present, else fallback to ui-avatars
    const photoUrl =
      nodeDatum.attributes.photoUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(nodeDatum.name)}&background=2563eb&color=fff&size=128`;

    return (
      <g>
        <foreignObject width={220} height={70} x={-110} y={-35}>
          <div className="node-card node-card-row">
            <img
              src={photoUrl}
              alt={nodeDatum.name}
              className="node-photo"
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                objectFit: "cover",
                marginRight: 16,
                background: "#e3eafc",
                marginBottom: 0,
              }}
            />
            <div className="node-info">
              <div className="node-name">{nodeDatum.name}</div>
              <div className="node-designation">({nodeDatum.attributes.designation})</div>
              <div className="node-team">{nodeDatum.attributes.team}</div>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };

  // Center on selected employee
  useEffect(() => {
    if (!selectedEmployeeId || !treeRef.current) return;
    const hierarchyNode = hierarchyNodeMap.current[selectedEmployeeId];
    if (hierarchyNode && typeof treeRef.current.centerNode === "function") {
      treeRef.current.centerNode(hierarchyNode);
    }
  }, [selectedEmployeeId, treeData]);

  // Zoom state and controls
  const [zoom, setZoom] = React.useState(1);
  const minZoom = 0.2;
  const maxZoom = 3.5;

  // Update zoom on Tree
  useEffect(() => {
    if (treeRef.current && typeof treeRef.current.zoom === "function") {
      treeRef.current.zoom(zoom);
    }
  }, [zoom]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, maxZoom));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, minZoom));
  const handleZoomReset = () => setZoom(1);

  const treeProps = {
    data: treeData,
    orientation: "vertical" as const,
    pathFunc: "elbow" as const,
    translate: { x: 800, y: 80 },
    nodeSize: { x: 260, y: 140 },
    separation: { siblings: 1.2, nonSiblings: 1.6 },
    zoomable: true,
    collapsible: true,
    renderCustomNodeElement: renderNode,
    scaleExtent: { min: minZoom, max: maxZoom },
    zoom,
  };

  return (
    <section className="org-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <h2 className="org-title">Organization Chart</h2>
        <div style={{
          position: "relative",
          zIndex: 2,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
          padding: "0.25rem 0.5rem",
          display: "flex",
          gap: "0.25rem",
        }}>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              borderRadius: 16,
              padding: "0.25rem 0.6rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            -
          </button>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              borderRadius: 16,
              padding: "0.25rem 0.6rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onClick={handleZoomIn}
            title="Zoom In"
          >
            +
          </button>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              borderRadius: 16,
              padding: "0.25rem 0.6rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onClick={handleZoomReset}
            title="Reset Zoom"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="org-canvas">
        <Tree
          ref={treeRef}
          {...(treeProps as any)}
        />
      </div>
    </section>
  );
};

export default OrgChart;
