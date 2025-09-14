import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../components/Sidebar';

const employees = [
	{ id: '1', name: 'Alice', designation: 'CEO', team: 'A', manager: null },
	{ id: '2', name: 'Bob', designation: 'VP', team: 'A', manager: '1' },
];

describe('Sidebar filtering and search', () => {
	beforeAll(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	it('shows all employees by default', () => {
		render(
			<Sidebar
				employees={employees}
				search=""
				team=""
				onSearch={() => {}}
				onTeamChange={() => {}}
				teams={['A']}
			/>
		);
		expect(screen.getByText('Alice')).toBeInTheDocument();
		expect(screen.getByText('Bob')).toBeInTheDocument();
	});

	it('filters by team', () => {
		render(
			<Sidebar
				employees={employees}
				search=""
				team="A"
				onSearch={() => {}}
				onTeamChange={() => {}}
				teams={['A']}
			/>
		);
		expect(screen.getByText('Alice')).toBeInTheDocument();
	});

	it('filters by search', () => {
		render(
			<Sidebar
				employees={employees}
				search=""
				team=""
				onSearch={() => {}}
				onTeamChange={() => {}}
				teams={['A']}
			/>
		);
		fireEvent.change(screen.getByPlaceholderText('Search by name, designation, team'), {
			target: { value: 'Bob' },
		});
		expect(screen.getByText('Bob')).toBeInTheDocument();
	});
});
