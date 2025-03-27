// React Core Imports
import React from 'react';

type IconProps = {
  width?: number;
  height?: number;
  className?: string;
};

const StarIcon: React.FC<IconProps> = ({ width = 24, height = 24, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-star ${className}`}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};
StarIcon.displayName = 'StarIcon';

export default StarIcon;
