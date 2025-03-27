// React Core Imports
import React from 'react';
// Internal Component Imports
import ArrowButton from '@/components/buttons/arrow_button';

const HomeFooter: React.FC = () => {
  return (
    <div className="align-center flex gap-4">
      <p className="mb-4 text-4xl font-light">See more products</p>
      <ArrowButton direction="right" />
    </div>
  );
};

HomeFooter.displayName = 'HomeFooter';

export default HomeFooter;
