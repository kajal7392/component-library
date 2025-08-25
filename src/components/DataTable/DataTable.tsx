import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: 'single' | 'multiple' | false;
  onRowSelect?: (selectedRows: T[]) => void;
  rowClassName?: (record: T, index: number) => string;
  emptyText?: string;
  className?: string;
}

const DataTable = <T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowClassName,
  emptyText = 'No data available',
  className = '',
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const handleRowSelect = (row: T) => {
    if (!selectable) return;

    const isSelected = selectedRows.some(
      selectedRow => selectedRow.id === row.id || selectedRow === row
    );

    let newSelectedRows: T[];

    if (selectable === 'single') {
      newSelectedRows = isSelected ? [] : [row];
    } else {
      newSelectedRows = isSelected
        ? selectedRows.filter(
            selectedRow => selectedRow.id !== row.id && selectedRow !== row
          )
        : [...selectedRows, row];
    }

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onRowSelect?.([]);
    } else {
      setSelectedRows([...data]);
      onRowSelect?.([...data]);
    }
  };

  const handleSort = (key: string) => {
    const column = columns.find(col => col.key === key);
    if (!column?.sortable) return;

    let direction: 'ascending' | 'descending' = 'ascending';

    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected =
    selectedRows.length > 0 && selectedRows.length < data.length;

  if (loading) {
    return (
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="min-w-full">
          {/* Header skeleton */}
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 grid grid-cols-12 gap-4">
            {selectable && (
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            )}
            {columns.map(column => (
              <div key={column.key} className="col-span-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Rows skeleton */}
          {[1, 2, 3].map(row => (
            <div
              key={row}
              className="px-6 py-4 grid grid-cols-12 gap-4 border-b border-gray-100 dark:border-gray-700"
            >
              {selectable && (
                <div className="col-span-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              )}
              {columns.map(column => (
                <div key={column.key} className="col-span-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
            No data available
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {emptyText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'w-full overflow-x-auto table-scroll max-h-[calc(100vh-200px)]',
        className
      )}
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  checked={allSelected}
                  ref={input => {
                    if (input) {
                      input.indeterminate = someSelected;
                    }
                  }}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                scope="col"
                className={clsx(
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                  column.sortable &&
                    'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right'
                )}
                style={{ width: column.width }}
                onClick={() => handleSort(column.key)}
              >
                <div
                  className={clsx(
                    'flex items-center',
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}
                >
                  {column.title}
                  {column.sortable && (
                    <span className="ml-1">
                      {sortConfig?.key === column.key ? (
                        sortConfig.direction === 'ascending' ? (
                          <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        )
                      ) : (
                        <div className="h-4 w-4 opacity-0 group-hover:opacity-100">
                          <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((row, index) => (
            <tr
              key={row.id || index}
              className={clsx(
                selectedRows.some(
                  selectedRow =>
                    selectedRow.id === row.id || selectedRow === row
                ) && 'bg-primary-50 dark:bg-primary-900/20',
                rowClassName?.(row, index),
                'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150'
              )}
            >
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    checked={selectedRows.some(
                      selectedRow =>
                        selectedRow.id === row.id || selectedRow === row
                    )}
                    onChange={() => handleRowSelect(row)}
                    aria-label={`Select row ${index + 1}`}
                  />
                </td>
              )}
              {columns.map(column => (
                <td
                  key={column.key}
                  className={clsx(
                    'px-6 py-4 text-sm text-gray-900 dark:text-gray-300',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                  style={{ width: column.width }}
                >
                  {column.render
                    ? column.render(row[column.dataIndex], row, index)
                    : String(row[column.dataIndex] || '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
