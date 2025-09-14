import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import type { Employee } from './components/Sidebar';
import OrgChart from './components/OrgChart';
import { fetchEmployees, updateManager } from './services/employeeService';
import './App.css';
import { makeServer } from "./services/server";

if (import.meta.env.VITE_USE_MIRAGE === "true") {
  makeServer();
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('');

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch employees');
        setLoading(false);
      });
  }, []);

  const teams = Array.from(new Set(employees.map((e) => e.team)));

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = [emp.name, emp.designation, emp.team]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTeam = team ? emp.team === team : true;
    return matchesSearch && matchesTeam;
  });

  const chartEmployees = team ? employees.filter((emp) => emp.team === team) : employees;

  const handleManagerChange = async (employeeId: string, newManagerId: string) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === employeeId ? { ...emp, manager: newManagerId } : emp))
    );
    try {
      await updateManager(employeeId, newManagerId);
    } catch (err: any) {
      setError(err.message || 'Failed to update manager');
    }
  };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.25rem' }}>Loading...</div>;
  if (error) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#e53e3e', fontSize: '1.25rem' }}>Error Occured: {error}</div>;

  return (
    <div style={{ display: 'flex', maxHeight: '100vh' }}>
      <Sidebar
        employees={filteredEmployees}
        search={search}
        onSearch={setSearch}
        team={team}
        onTeamChange={setTeam}
        teams={teams}
      />
      <OrgChart
        employees={chartEmployees}
        onManagerChange={handleManagerChange}
      />
    </div>
  );
}

export default App;
