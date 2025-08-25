import React, { useState, useEffect } from 'react';
import InputField from './components/InputField';
import DataTable, { Column } from './components/DataTable';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  useEffect(() => {
    // Initialize theme
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme === 'dark' || (!storedTheme && systemPrefersDark);
    
    if (initialTheme) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const sampleData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'inactive' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' },
    { id: 7, name: 'Bruce Wayne', email: 'bruce@example.com', role: 'Editor', status: 'active' },
    { id: 8, name: 'Clark Kent', email: 'clark@example.com', role: 'User', status: 'inactive' },
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
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            value === 'active' 
              ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300' 
              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient bg-gradient-to-r from-primary-600 to-secondary-600">
            🚀 Component Library
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Professional React Components
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Beautiful, accessible, and fully responsive UI components built with React, TypeScript, and TailwindCSS
            </p>
          </div>

          {/* Components Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* InputField Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-300/50 dark:border-gray-600/50 
                          transition-all duration-300 hover:shadow-lg hover:border-gray-400/30 dark:hover:border-gray-500/50
                          backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                InputField Component
              </h3>
              <div className="space-y-6">
                <InputField
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="We'll never share your email with anyone else."
                />
                
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter secure password"
                  showPasswordToggle
                  helperText="Use at least 8 characters with mixed case and numbers"
                />
                
                <InputField
                  label="Search Users"
                  placeholder="Type to search..."
                  showClearButton
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                
                <InputField
                  label="Error State"
                  placeholder="This field has validation issues"
                  errorMessage="Email address is required and must be valid"
                />
              </div>
            </div>

            {/* DataTable Card with optimized scrollbar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-300/50 dark:border-gray-600/50
                          transition-all duration-300 hover:shadow-lg hover:border-gray-400/30 dark:hover:border-gray-500/50
                          backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                DataTable Component
              </h3>
              
              {/* Container with optimized scrollbar */}
              <div className="max-h-[500px] overflow-auto table-scroll-light rounded-lg">
                <DataTable
                  data={sampleData}
                  columns={columns}
                  selectable="multiple"
                  onRowSelect={setSelectedRows}
                  className="w-full"
                />
              </div>
              
              {selectedRows.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                    ✅ {selectedRows.length} row(s) selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '🎨', title: 'Modern Design', desc: 'Beautiful gradients and animations' },
              { icon: '🌙', title: 'Dark Mode', desc: 'Full dark/light theme support' },
              { icon: '📱', title: 'Responsive', desc: 'Perfect on all devices and screens' },
              { icon: '⚡', title: 'Fast & Light', desc: 'Optimized performance and bundle size' },
              { icon: '🔧', title: 'Customizable', desc: 'Easy to customize and extend' },
              { icon: '✅', title: 'Accessible', desc: 'WCAG compliant with ARIA support' },
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-300/50 dark:border-gray-600/50
                                        transition-all duration-300 hover:shadow-lg hover:border-gray-400/30 dark:hover:border-gray-500/50
                                        backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white 
                        py-6 md:py-8 lg:py-10
                        border-t border-gray-700 dark:border-gray-600
                        min-h-[120px] md:min-h-[140px]
                        flex items-center justify-center
                        mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center w-full">
          <p className="text-gray-300 dark:text-gray-400 text-base md:text-lg lg:text-xl 
                      transition-colors duration-300 mb-2">
            Built with <strong>React</strong>, <strong>TypeScript</strong>, and <strong>TailwindCSS</strong>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;