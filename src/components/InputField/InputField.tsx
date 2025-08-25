import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import clsx from 'clsx';

// Define the types locally since we can't import them
type Variant = 'filled' | 'outlined' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  type?: string;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInputValue('');
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  // Size classes with proper typing
  const sizeClasses: Record<Size, string> = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-4 text-base',
    lg: 'py-3 px-5 text-lg',
  };

  // Variant classes with proper typing
  const variantClasses: Record<Variant, string> = {
    filled: clsx(
      'bg-gray-100 dark:bg-gray-800 border-0',
      !disabled && 'hover:bg-gray-200 dark:hover:bg-gray-700',
      'focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500'
    ),
    outlined: clsx(
      'bg-transparent border border-gray-300 dark:border-gray-600',
      !disabled && 'hover:border-gray-400 dark:hover:border-gray-500',
      'focus:ring-2 focus:ring-primary-500 focus:border-transparent'
    ),
    ghost: clsx(
      'bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 rounded-none',
      !disabled && 'hover:border-gray-600 dark:hover:border-gray-400',
      'focus:ring-0 focus:border-primary-500 dark:focus:border-primary-400'
    ),
  };

  // State classes
  const stateClasses = clsx(
    (invalid || errorMessage) && 'border-error-500 focus:ring-error-500 dark:border-error-400',
    disabled && 'opacity-60 cursor-not-allowed'
  );

  // Input classes
  const inputClasses = clsx(
    'w-full rounded-md transition-all duration-200 ease-in-out input-focus',
    sizeClasses[size],
    variantClasses[variant],
    stateClasses,
    (loading || showClearButton || (showPasswordToggle && type === 'password')) && 'pr-10',
    className
  );

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label 
          htmlFor={label} 
          className={clsx(
            'block text-sm font-medium transition-colors duration-200',
            invalid || errorMessage 
            ? 'text-error-600 dark:text-error-400' 
            : 'text-gray-700 dark:text-gray-300'
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={label}
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputClasses}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-help` : undefined}
        />
        
        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
        
        {/* Clear button */}
        {showClearButton && inputValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {/* Password toggle */}
        {showPasswordToggle && type === 'password' && !loading && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
          >
            {inputType === 'password' ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      
      {errorMessage ? (
      <p 
        id={`${label}-help`} 
        className="text-sm text-error-600 dark:text-error-400 animate-fade-in"
      >
        {errorMessage}
      </p>
    ) : helperText ? (
      <p 
        id={`${label}-help`} 
        className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in"
      >
        {helperText}
      </p>
    ) : null}
    </div>
  );
};

export default InputField;