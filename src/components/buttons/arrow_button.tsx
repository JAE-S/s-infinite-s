// React Core Imports
import React from 'react';

// Relative Imports
import ArrowLeftIcon from '../icons/arrow-left';
import ArrowRightIcon from '../icons/arrow-right';

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
