import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable, { Column } from './DataTable';

interface TestData {
  id: number;
  name: string;
  email: string;
}

describe('DataTable', () => {
  const testData: TestData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  // Fix: Explicitly type the columns array and use 'as keyof TestData'
  const columns: Column<TestData>[] = [
    { key: 'id', title: 'ID', dataIndex: 'id' as keyof TestData, sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestData, sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email' as keyof TestData, sortable: true },
  ];

  test('renders table with data', () => {
    render(<DataTable data={testData} columns={columns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading={true} />);
    
    // Check for loading elements by class instead of test-id
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('handles row selection', async () => {
    const user = userEvent.setup();
    const handleRowSelect = jest.fn();
    
    render(
      <DataTable
        data={testData}
        columns={columns}
        selectable="multiple"
        onRowSelect={handleRowSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // Select first row
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  test('handles select all', async () => {
    const user = userEvent.setup();
    const handleRowSelect = jest.fn();
    
    render(
      <DataTable
        data={testData}
        columns={columns}
        selectable="multiple"
        onRowSelect={handleRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    await user.click(selectAllCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(testData);
  });

  test('handles sorting', async () => {
    const user = userEvent.setup();
    render(<DataTable data={testData} columns={columns} />);
    
    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);
    
    // After sorting, the first visible row should be Bob Johnson (ascending order)
    const rows = screen.getAllByRole('row');
    // Skip header row (index 0) and check first data row (index 1)
    expect(rows[1]).toHaveTextContent('Bob Johnson');
  });
});