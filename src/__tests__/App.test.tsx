import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

vi.mock('react-d3-tree', () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-tree" />,
}));

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

describe('App integration', () => {
  it('shows loading then employee list', async () => {
    render(<App />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('shows error on fetch failure', async () => {
    (global.fetch as any).mockImplementationOnce(() => Promise.resolve({ ok: false }));
    render(<App />);
    await waitFor(() => expect(screen.getByText(/Error Occured/)).toBeInTheDocument());
  });
  
  it('shows empty employee list', async () => {
    (global.fetch as any).mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    }));
    render(<App />);
    await waitFor(() => expect(screen.queryByText('Alice')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('Bob')).not.toBeInTheDocument());
  });
});
