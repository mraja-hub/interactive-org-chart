import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchEmployees, updateManager } from '../services/employeeService';

// Mock fetch for Vitest
beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (url === '/api/employees' && !options) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', name: 'Alice', manager: '0', team: 'A', designation: 'CEO' }]),
      });
    }
    if (url === '/api/employees/1/manager' && options?.method === 'PUT') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '1', name: 'Alice', manager: '2', team: 'A', designation: 'CEO' }),
      });
    }
    return Promise.resolve({ ok: false });
  }) as any;
});

describe('employeeService', () => {
  it('fetchEmployees returns employee data', async () => {
    const data = await fetchEmployees();
    expect(data).toEqual([{ id: '1', name: 'Alice', manager: '0', team: 'A', designation: 'CEO' }]);
  });

  it('updateManager updates manager', async () => {
    const updated = await updateManager('1', '2');
    expect(updated.manager).toBe('2');
  });

  it('fetchEmployees throws on error', async () => {
    (global.fetch as any).mockImplementationOnce(() => Promise.resolve({ ok: false }));
    await expect(fetchEmployees()).rejects.toThrow('Failed to fetch employees');
  });
});