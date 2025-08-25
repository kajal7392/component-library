import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import InputField, { InputFieldProps } from './InputField';

export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
    },
    value: {
      control: { type: 'text' },
    },
    onChange: {
      action: 'valueChanged',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md mx-auto"> 
        <Story />
      </div>
    ),
  ],
} as Meta<typeof InputField>;

const Template: StoryFn<InputFieldProps> = (args) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Email address',
  placeholder: 'Enter your email',
  helperText: 'We will never share your email with anyone else.',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Username',
  value: 'john_doe',
  placeholder: 'Enter your username',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  invalid: true,
  errorMessage: 'Please enter a valid email address.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  disabled: true,
  value: 'user@example.com',
};

export const WithClearButton = Template.bind({});
WithClearButton.args = {
  label: 'Search',
  placeholder: 'Search...',
  showClearButton: true,
  value: 'Search query',
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  showPasswordToggle: true,
  value: 'secretpassword',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  label: 'Loading',
  placeholder: 'Loading content...',
  loading: true,
};

export const DifferentSizes = Template.bind({});
DifferentSizes.args = {
  label: 'Size Variants',
  placeholder: 'Try different sizes',
};

export const DifferentVariants = () => (
  <div className="space-y-4">
    <InputField
      label="Filled variant"
      variant="filled"
      placeholder="Filled input"
    />
    <InputField
      label="Outlined variant"
      variant="outlined"
      placeholder="Outlined input"
    />
    <InputField
      label="Ghost variant"
      variant="ghost"
      placeholder="Ghost input"
    />
  </div>
);