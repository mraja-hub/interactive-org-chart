import { describe, it, expect } from 'vitest';
import { buildTreeData } from '../utils/buildTreeData';

describe('OrgChart logic', () => {
  const employees = [
    { id: '1', name: 'CEO', manager: null, team: 'A', designation: 'CEO' },
    { id: '2', name: 'VP', manager: '1', team: 'A', designation: 'VP' },
    { id: '3', name: 'Manager', manager: '2', team: 'A', designation: 'Manager' },
  ];

    it('buildTreeData builds correct tree', () => {
      const tree = buildTreeData(employees);
      expect(tree.children[0].children[0].name).toBe('Manager');
  });
});
