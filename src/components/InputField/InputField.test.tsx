import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText(/Test Label/)).toBeInTheDocument();
  });

  test('handles input change', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<InputField label="Test Input" onChange={handleChange} />);
    
    const input = screen.getByLabelText(/Test Input/);
    await user.type(input, 'test value');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('shows error message when invalid', () => {
    render(<InputField label="Test Input" invalid errorMessage="Error message" />);
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByLabelText(/Test Input/)).toHaveAttribute('aria-invalid', 'true');
  });

  test('clear button works', async () => {
    const user = userEvent.setup();
    render(<InputField label="Test Input" showClearButton value="test value" />);
    
    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);
    
    const input = screen.getByLabelText(/Test Input/) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('password toggle works', async () => {
    const user = userEvent.setup();
    render(<InputField label="Password" type="password" showPasswordToggle />);
    
    const toggleButton = screen.getByLabelText('Show password');
    await user.click(toggleButton);
    
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toHaveAttribute('type', 'text');
  });
});