// src/components/Sidebar.tsx
import React from 'react';
import './Sidebar.css';

export interface Employee {
  id: string;
  name: string;
  designation: string;
  team: string;
  manager: string | null;
  photoUrl?: string;
}

interface SidebarProps {
  employees: Employee[];
  search: string;
  onSearch: (value: string) => void;
  team: string;
  onTeamChange: (value: string) => void;
  teams: string[];
  onSelectEmployee?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  employees,
  search,
  onSearch,
  team,
  onTeamChange,
  teams,
  onSelectEmployee,
}) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Employees List</h2>
      <div className="sidebar-controls">
        <input
          type="text"
          placeholder="Search by name, designation, team"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="sidebar-search"
        />
        <select
          value={team}
          onChange={(e) => onTeamChange(e.target.value)}
          className="sidebar-select"
        >
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <ul className="sidebar-list">
        {employees.map((emp) => (
          <li
            key={emp.id}
            className="sidebar-list-item"
            onClick={() => onSelectEmployee && onSelectEmployee(emp.id)}
          >
            <span className="sidebar-list-name">{emp.name}</span>
            <br />
            <span className="sidebar-list-designation">{emp.designation}</span>
            <br />
            <span className="sidebar-list-team">{emp.team}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
