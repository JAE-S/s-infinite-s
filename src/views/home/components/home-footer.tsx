// React Core Imports
import React from 'react';

// Internal Component Imports
import ArrowButton from '@/components/buttons/arrow_button';

const HomeFooter: React.FC = () => {
  return (
    <>
      <p className="mb-4 text-4xl font-light">See more produce</p>
      <ArrowButton direction="right" />
    </>
  );
};

export default HomeFooter;
