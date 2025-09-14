// src/components/Sidebar.tsx
import React from 'react';

export interface Employee {
  id: string;
  name: string;
  designation: string;
  team: string;
  manager: string | null;
}

interface SidebarProps {
  employees: Employee[];
  search: string;
  onSearch: (value: string) => void;
  team: string;
  onTeamChange: (value: string) => void;
  teams: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  employees,
  search,
  onSearch,
  team,
  onTeamChange,
  teams,
}) => {
  return (
    <aside
      style={{
        backgroundColor: '#fff',
        padding: '1rem',
        width: '22vw',
        borderRight: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{
        fontSize: '1.5rem', marginBottom: '1rem',
        background: 'linear-gradient(90deg, #e3eafc 0%, #f7f8fa 100%)',
        padding: '1rem 2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(37,99,235,0.04)',
      }}>Employees List</h2>
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff', paddingBottom: '0.5rem' }}>
        <input
          type="text"
          placeholder="Search by name, designation, team"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "-webkit-fill-available",
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <select
          value={team}
          onChange={(e) => onTeamChange(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <ul style={{ flex: 1, overflowY: 'auto', padding: 0, listStyle: 'none', margin: 0 }}>
        {employees.map((emp) => (
          <li
            key={emp.id}
            style={{
              marginBottom: '1rem',
              background: '#f7f8fa',
              borderRadius: '6px',
              padding: '0.5rem 0.75rem',
            }}
          >
            <strong>{emp.name}</strong>
            <br />
            <span style={{ color: '#4a5568' }}>{emp.designation}</span>
            <br />
            <span style={{ color: '#3182ce', fontWeight: 500 }}>{emp.team}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
