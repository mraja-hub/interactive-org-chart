// src/components/OrgChart.tsx
import React from 'react';
import type { Employee } from './Sidebar';
import { DndContext } from '@dnd-kit/core';
import EmployeeNode from './EmployeeNode';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface OrgChartProps {
  employees: Employee[];
  onManagerChange: (employeeId: string, newManagerId: string) => void;
}

// Helper to build tree from flat array
function buildOrgTree(employees: Employee[]): any[] {
  const map: Record<string, any> = {};
  employees.forEach((emp) => (map[emp.id] = { ...emp, children: [] }));
  const roots: any[] = [];
  employees.forEach((emp) => {
    if (emp.manager && map[emp.manager]) {
      map[emp.manager].children.push(map[emp.id]);
    } else {
      roots.push(map[emp.id]);
    }
  });
  return roots;
}

const OrgChart: React.FC<OrgChartProps> = ({ employees, onManagerChange }) => {
  const tree = buildOrgTree(employees);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      onManagerChange(active.id, over.id);
    }
  };

  return (
    <section
      style={{
        width: '77vw',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '2rem 2rem 2rem 2rem',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#2563eb',
          letterSpacing: '0.02em',
          fontFamily: 'Inter, Arial, sans-serif',
          background: 'linear-gradient(90deg, #e3eafc 0%, #f7f8fa 100%)',
          padding: '1rem 2rem',
          margin: 0,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(37,99,235,0.04)',
          alignSelf: 'flex-start',
        }}
      >
        Organization Chart
      </h2>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'grab',
          background:
            'repeating-linear-gradient(135deg, #f0f4ff 0px, #f0f4ff 40px, #e3eafc 40px, #e3eafc 80px)',
          borderRadius: '18px',
          boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
          border: '2px dashed #b3c6ff',
          marginTop: '1rem',
          transition: 'background 0.3s',
        }}
      >
        <TransformWrapper
          minScale={0.1}
          maxScale={2}
          initialScale={0.8}
          wheel={{ step: 0.1 }}
          panning={{ disabled: false }}
          pinch={{ disabled: false }}
          doubleClick={{ disabled: false }}
        >
          {({ zoomIn, zoomOut, resetTransform, setTransform }) => (
            <React.Fragment>
              <div
                style={{
                  marginBottom: '1rem',
                  position: 'absolute',
                  zIndex: 2,
                  left: '2rem',
                  top: '2rem',
                  background: '#fff',
                  borderRadius: '24px',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                <button
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    borderRadius: '24px',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                  }}
                  onClick={() => zoomOut()}
                >
                  -
                </button>
                <button
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    borderRadius: '24px',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                  }}
                  onClick={() => zoomIn()}
                >
                  +
                </button>
                <button
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    borderRadius: '24px',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                  }}
                  onClick={() => {
                    resetTransform();
                    setTransform(0, 0, 0.8, 200, 'easeOut');
                  }}
                >
                  Reset
                </button>
              </div>
              <TransformComponent>
                <div
                  style={{
                    width: '1800px',
                    minHeight: '600px',
                    transition: 'transform 0.2s ease',
                    fontFamily: 'Inter, Arial, sans-serif',
                    color: '#222',
                    fontSize: '1rem',
                    background: 'transparent',
                    padding: '2rem 0',
                  }}
                >
                  <DndContext onDragEnd={handleDragEnd}>
                    <ul style={{ padding: '4rem 4rem 4rem 4rem' }}>
                      {tree.map((node) => (
                        <EmployeeNode key={node.id} node={node} onDrop={onManagerChange} />
                      ))}
                    </ul>
                  </DndContext>
                </div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </section>
  );
};

export default OrgChart;
