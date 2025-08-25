import React, { useEffect } from 'react';

export const withThemeDecorator = (Story, context) => {
  const { theme } = context.globals;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`component-wrapper ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'} p-6 rounded-lg`}>
      <div className="storybook-container">
        <Story {...context} />
      </div>
    </div>
  );
};