// src/components/EmployeeNode.tsx
import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface EmployeeNodeProps {
  node: any;
  onDrop: (employeeId: string, newManagerId: string) => void;
}

const EmployeeNode: React.FC<EmployeeNodeProps> = ({ node, onDrop }) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({ id: node.id });
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: node.id });

  return (
    <div
      ref={(el) => {
        setDragRef(el);
        setDropRef(el);
      }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem', opacity: isDragging ? 0.5 : 1 }}
    >
      <div
        style={{
          border: '1px solid #ccc',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          background: isOver ? '#e0f7fa' : '#fff',
          minWidth: '180px',
          textAlign: 'center',
          boxShadow: isDragging ? '0 2px 8px rgba(0,0,0,0.1)' : undefined,
        }}
        {...attributes}
        {...listeners}
      >
        <strong>{node.name}</strong> <span>({node.designation})</span>
        <div style={{ fontSize: '0.9em', color: '#888' }}>{node.team}</div>
      </div>
      {node.children.length > 0 && (
        <div style={{ borderLeft: '2px solid #bbb', margin: '0.5rem 0', minHeight: '20px' }} />
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        {node.children.map((child: any) => (
          <EmployeeNode key={child.id} node={child} onDrop={onDrop} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeNode;
