// src/components/OrgChart.tsx
import React, { useMemo, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import type { Employee } from "./Sidebar";
import { buildTreeData } from "../utils/buildTreeData";
import { DndContext } from "@dnd-kit/core";
import CustomNode from "./CustomNode";
import "./OrgChart.css";

interface OrgChartProps {
  employees: Employee[];
  onManagerChange: (employeeId: string, newManagerId: string) => void;
}

const OrgChart: React.FC<OrgChartProps> = ({ employees, onManagerChange }) => {
  const treeData = useMemo(() => buildTreeData(employees), [employees]);
  const treeRef = useRef<any>(null);

  // Custom node renderer using DnD-enabled CustomNode
  const renderNode = (props: any) => {
    const { nodeDatum } = props;
    if (nodeDatum.attributes?.id === "root") {
      return <g />;
    }
    return (
      <CustomNode
        nodeDatum={nodeDatum}
        onManagerChange={onManagerChange}
      />
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

  // DnD handler: when a node is dropped onto another, call onManagerChange
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active?.id && over?.id && active.id !== over.id) {
      onManagerChange(String(active.id), String(over.id));
    }
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
        <DndContext onDragEnd={handleDragEnd}>
          <Tree
            ref={treeRef}
            {...(treeProps as any)}
          />
        </DndContext>
      </div>
    </section>
  );
};

export default OrgChart;
