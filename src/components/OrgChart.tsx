// src/components/OrgChart.tsx
import React, { useMemo, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import type { Employee } from "./Sidebar";
import { buildTreeData } from "../utils/buildTreeData";
import "./OrgChart.css";

interface OrgChartProps {
  employees: Employee[];
  onManagerChange: (employeeId: string, newManagerId: string) => void;
}



const OrgChart: React.FC<OrgChartProps> = ({ employees, onManagerChange }) => {
  const treeData = useMemo(() => buildTreeData(employees), [employees]);
  const treeRef = useRef<any>(null);

  // Custom node renderer
  const renderNode = (props: any) => {
    const { nodeDatum } = props;
    if (nodeDatum.attributes?.id === "root") {
      return <g />;
    }

    // Determine image source: use photoUrl if present, else fallback to ui-avatars
    const photoUrl =
      nodeDatum.attributes.photoUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(nodeDatum.name)}&background=2563eb&color=fff&size=128`;

    return (
      <g>
        <foreignObject width={320} height={110} x={-160} y={-55}>
          <div className="node-card node-card-row" style={{ minHeight: 90, minWidth: 280, maxWidth: 400, paddingLeft: 18 }}>
            <img
              src={photoUrl}
              alt={nodeDatum.name}
              className="node-photo"
              style={{
                width: 64,
                height: 64,
                borderRadius: 8,
                objectFit: "cover",
                marginRight: 20,
                background: "#e3eafc",
                marginBottom: 0,
                flexShrink: 0,
              }}
            />
            <div className="node-info" style={{ minWidth: 0 }}>
              <div className="node-name" style={{ fontWeight: 700, fontSize: "1.35rem", wordBreak: "break-word" }}>{nodeDatum.name}</div>
              <div className="node-designation" style={{ fontSize: "1.08rem", color: "#333", wordBreak: "break-word" }}>({nodeDatum.attributes.designation})</div>
              <div className="node-team" style={{ fontSize: "1rem", color: "#888", wordBreak: "break-word" }}>{nodeDatum.attributes.team}</div>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };


  // Zoom state and controls
  const [zoom, setZoom] = React.useState(1);
  const minZoom = 0.1;
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
    nodeSize: { x: 340, y: 170 },
    separation: { siblings: 1.6, nonSiblings: 2.2 },
    zoomable: true,
    collapsible: true,
    renderCustomNodeElement: renderNode,
    scaleExtent: { min: minZoom, max: maxZoom },
    zoom,
  };

  return (
    <section className="org-section">
      <div className="org-header">
        <h2 className="org-title">Organization Chart</h2>
        <div className="org-zoom-controls">
          <button className="org-zoom-btn" onClick={handleZoomOut} title="Zoom Out">-</button>
          <button className="org-zoom-btn" onClick={handleZoomIn} title="Zoom In">+</button>
          <button className="org-zoom-btn" onClick={handleZoomReset} title="Reset Zoom">Reset</button>
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
