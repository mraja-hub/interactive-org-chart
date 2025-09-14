// src/services/employeeService.ts
// Service for employee API calls

export async function fetchEmployees() {
  // TODO: Replace with actual API endpoint
  const response = await fetch('/api/employees');
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
}

export async function updateManager(employeeId: string, newManagerId: string) {
  // TODO: Replace with actual API endpoint
  const response = await fetch(`/api/employees/${employeeId}/manager`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ manager: newManagerId }),
  });
  if (!response.ok) throw new Error('Failed to update manager');
  return response.json();
}
