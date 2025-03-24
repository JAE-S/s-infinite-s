// React Core Imports
import React from 'react';

// Internal Component Imports
import ArrowLeftIcon from '@/components/icons/arrow-left';
import ArrowRightIcon from '@/components/icons/arrow-right';

type ArrowButtonProps = {
  direction: 'left' | 'right';
  onClick?: () => void;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => {
  return (
    <button className="rounded-full bg-gray-200 px-8 py-2" onClick={onClick}>
      {direction === 'right' ? (
        <ArrowRightIcon width={24} height={24} />
      ) : (
        <ArrowLeftIcon width={24} height={24} />
      )}
    </button>
  );
};

export default ArrowButton;
