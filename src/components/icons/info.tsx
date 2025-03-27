// React Core Imports
import React from 'react';

type IconProps = {
  width?: number;
  height?: number;
  className?: string;
};

const InfoIcon: React.FC<IconProps> = ({ width = 24, height = 24, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-info ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
};

InfoIcon.displayName = 'InfoIcon';

export default InfoIcon;
