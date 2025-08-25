import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import DataTable, { DataTableProps, Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

// Your default export is correct, but let's make it more explicit
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    onRowSelect: {
      action: 'rowsSelected',
    },
  },
  // Add parameters to satisfy Storybook
  parameters: {
    layout: 'fullscreen',
  },
  
};

export default meta;

const Template: StoryFn<DataTableProps<User>> = (args) => <DataTable {...args} />;

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2023-12-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2023-12-05' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2023-11-20' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2023-12-10' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2023-11-15' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true, width: '80px' },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status', 
    sortable: true,
    render: (value: string) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
];

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  columns: columns,
};

export const SelectableMultiple = Template.bind({});
SelectableMultiple.args = {
  data: sampleData,
  columns: columns,
  selectable: 'multiple',
};

export const SelectableSingle = Template.bind({});
SelectableSingle.args = {
  data: sampleData,
  columns: columns,
  selectable: 'single',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  data: [],
  columns: columns,
  loading: true,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
  columns: columns,
  emptyText: 'No users found. Try adjusting your search filters.',
};

export const WithCustomRowStyling = Template.bind({});
WithCustomRowStyling.args = {
  data: sampleData,
  columns: columns,
  rowClassName: (record) => record.status === 'inactive' ? 'bg-gray-50' : '',
};