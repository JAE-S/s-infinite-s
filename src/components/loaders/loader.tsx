import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = 'primary',
  text,
  fullscreen = false,
}) => {
  // Map size to actual dimensions
  const sizeMap = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-2',
    large: 'w-12 h-12 border-3',
  };

  // Map color to tailwind classes
  const colorMap = {
    primary: 'border-blue-600 border-t-transparent',
    secondary: 'border-gray-600 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  // Determine spinner classes
  const spinnerClasses = `
    inline-block rounded-full animate-spin
    ${sizeMap[size]}
    ${colorMap[color]}
  `.trim();

  // If fullscreen, render a centered overlay
  if (fullscreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-75"
        data-testid="fullscreen-loader"
      >
        <div className={spinnerClasses} role="status" aria-label="Loading" />
        {text && <p className="mt-4 font-medium text-gray-700">{text}</p>}
      </div>
    );
  }

  // Otherwise render inline
  return (
    <div className="flex items-center justify-center" data-testid="inline-loader">
      <div className={spinnerClasses} role="status" aria-label="Loading" />
      {text && <p className="ml-3 font-medium text-gray-700">{text}</p>}
    </div>
  );
};

export default Loader;
