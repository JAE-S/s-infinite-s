// React Core Imports
import React from 'react';
// Internal Component Imports
import ArrowLeftIcon from '@/components/icons/arrow-left';
import ArrowRightIcon from '@/components/icons/arrow-right';

type ArrowButtonProps = {
  direction: 'left' | 'right';
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  label,
  disabled = false,
  size = 'medium',
  variant = 'default',
  className = '',
}) => {
  // Determine default label if not provided
  const defaultLabel = direction === 'left' ? 'Previous' : 'Next';
  const ariaLabel = label || defaultLabel;

  // Size mappings
  const sizeClasses = {
    small: 'p-1.5',
    medium: 'p-2',
    large: 'p-3',
  };

  // Icon size mappings
  const iconSizes = {
    small: 18,
    medium: 24,
    large: 30,
  };

  // Variant styles
  const variantClasses = {
    default: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-600',
  };

  // Disabled state style
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`rounded-full transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} focus:outline-none focus:ring-2 focus:ring-offset-2 ${className} `}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={`arrow-button-${direction}`}
      type="button"
    >
      {direction === 'right' ? (
        <ArrowRightIcon
          width={iconSizes[size]}
          height={iconSizes[size]}
          aria-hidden="true"
          data-testid="arrow-right-icon"
        />
      ) : (
        <ArrowLeftIcon
          width={iconSizes[size]}
          height={iconSizes[size]}
          aria-hidden="true"
          data-testid="arrow-left-icon"
        />
      )}
      {label && <span className="sr-only">{label}</span>}
    </button>
  );
};

export default ArrowButton;
