// React Core Imports
import React from 'react';

type IconProps = {
  width: number;
  height: number;
};

const ArrowLeftIcon: React.FC<IconProps> = ({ width, height }) => {
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
      className="lucide lucide-arrow-left"
    >
      <path d="M5 12h14" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
};
ArrowLeftIcon.displayName = 'ArrowLeftIcon';

export default ArrowLeftIcon;
