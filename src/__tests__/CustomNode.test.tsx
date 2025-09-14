import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomNode from '../components/CustomNode';

describe('CustomNode rendering', () => {
  it('renders employee name', () => {
    const nodeDatum = { name: 'Alice', attributes: { id: '1' } };
    const { getByText } = render(
      <CustomNode nodeDatum={nodeDatum} onManagerChange={() => {}} isRoot={false} />
    );
    expect(getByText('Alice')).toBeInTheDocument();
  });

  it('shows lock icon for root node', () => {
    const nodeDatum = { name: 'CEO', attributes: { id: '0' } };
    const { getByTestId } = render(
      <CustomNode nodeDatum={nodeDatum} onManagerChange={() => {}} isRoot={true} />
    );
    expect(getByTestId('lock-icon')).toBeInTheDocument();
  });

  it('shows fallback image if photoUrl missing', () => {
    const nodeDatum = { name: 'Bob', attributes: { id: '2', photoUrl: undefined } };
    const { container } = render(
      <CustomNode nodeDatum={nodeDatum} onManagerChange={() => {}} isRoot={false} />
    );
    expect(container.querySelector('img')).toBeTruthy();
  });
});
