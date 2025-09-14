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
    return (
      <g>
        <foreignObject width={220} height={100} x={-110} y={-40}>
          <div className="node-card">
            <div className="node-name">{nodeDatum.name}</div>
            <div className="node-designation">({nodeDatum.attributes.designation})</div>
            <div className="node-team">{nodeDatum.attributes.team}</div>
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
  };

  return (
    <section className="org-section">
      <h2 className="org-title">Organization Chart</h2>
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
