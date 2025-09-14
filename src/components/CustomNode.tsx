import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

interface CustomNodeProps {
  nodeDatum: any;
  onManagerChange: (employeeId: string, newManagerId: string) => void;
  isRoot?: boolean;
}

const CustomNode: React.FC<CustomNodeProps> = ({ nodeDatum, onManagerChange, isRoot }) => {
  const id = nodeDatum.attributes?.id;

  // Only enable draggable for non-root nodes
  const { attributes, listeners, setNodeRef: setDragRef, isDragging } =
    useDraggable({ id, disabled: isRoot });
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id });

  const photoUrl =
    nodeDatum.attributes.photoUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      nodeDatum.name
    )}&background=2563eb&color=fff&size=128`;

  return (
    <g>
      <foreignObject width={320} height={110} x={-160} y={-55}>
        <div
          ref={(el) => {
            setDragRef(el);
            setDropRef(el);
          }}
          {...attributes}
          {...listeners}
          className="node-card node-card-row"
          style={{
            minHeight: 90,
            minWidth: 280,
            maxWidth: 400,
            paddingLeft: 18,
            opacity: isDragging ? 0.5 : 1,
            background: isOver ? "#e0f7fa" : "#fff",
            cursor: isRoot ? "not-allowed" : "pointer",
          }}
          data-employee-id={id}
        >
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
              flexShrink: 0,
            }}
          />
          <div className="node-info" style={{ minWidth: 0 }}>
            <div
              className="node-name"
              style={{
                fontWeight: 700,
                fontSize: "1.35rem",
                wordBreak: "break-word",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {nodeDatum.name}
              {isRoot && <span data-testid="lock-icon" title="CEO is fixed" style={{ fontSize: "1.2rem", marginLeft: 4 }}>🔒</span>}
            </div>
            <div
              className="node-designation"
              style={{ fontSize: "1.08rem", color: "#333", wordBreak: "break-word" }}
            >
              ({nodeDatum.attributes.designation})
            </div>
            <div
              className="node-team"
              style={{ fontSize: "1rem", color: "#888", wordBreak: "break-word" }}
            >
              {nodeDatum.attributes.team}
            </div>
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomNode;
