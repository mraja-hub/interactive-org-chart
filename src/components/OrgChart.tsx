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
    const isRoot = nodeDatum.parent == null;
    return (
      <CustomNode
        nodeDatum={nodeDatum}
        onManagerChange={onManagerChange}
        isRoot={isRoot}
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

  // Build children map for safe-drop logic
  const buildChildrenMap = (emps: Employee[]) => {
    const map: Record<string, string[]> = {};
    emps.forEach((emp) => {
      if (emp.manager) {
        if (!map[emp.manager]) map[emp.manager] = [];
        map[emp.manager].push(emp.id);
      }
    });
    return map;
  };
  const childrenMap = useMemo(() => buildChildrenMap(employees), [employees]);

  // Helper to check if newManagerId is inside dragged employee's subtree
  const isDescendant = (childId: string, targetManagerId: string): boolean => {
    if (!childrenMap[childId]) return false;
    if (childrenMap[childId].includes(targetManagerId)) return true;
    return childrenMap[childId].some((c) => isDescendant(c, targetManagerId));
  };

  // DnD handler: when a node is dropped onto another, call onManagerChange with safe-drop logic
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active?.id || !over?.id) return;
    const draggedId = String(active.id);
    const newManagerId = String(over.id);
    if (draggedId === newManagerId) return; // ignore self-drop
    if (isDescendant(draggedId, newManagerId)) return; // prevent cycle
    onManagerChange(draggedId, newManagerId);
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
