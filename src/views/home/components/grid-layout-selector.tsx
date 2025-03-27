// React Core Imports
import React from 'react';

export type GridLayoutOption = 3 | 6;

interface GridLayoutSelectorProps {
  currentLayout: GridLayoutOption;
  onLayoutChange: (layout: GridLayoutOption) => void;
}

const GridLayoutSelector: React.FC<GridLayoutSelectorProps> = ({
  currentLayout,
  onLayoutChange,
}) => {
  return (
    <div className="mb-4 flex items-center space-x-4" data-testid="grid-layout-selector">
      <span className="text-sm font-medium text-gray-700">Grid size:</span>
      <div className="flex overflow-hidden rounded-lg border">
        <button
          onClick={() => onLayoutChange(3)}
          className={`px-3 py-1 text-sm ${
            currentLayout === 3
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="3 columns grid layout"
          data-testid="layout-3-button"
        >
          3
        </button>
        <button
          onClick={() => onLayoutChange(6)}
          className={`border-l px-3 py-1 text-sm ${
            currentLayout === 6
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="6 columns grid layout"
          data-testid="layout-6-button"
        >
          6
        </button>
      </div>
      {/* Add a hidden element for current layout tracking in tests */}
      <span data-testid="current-layout" className="sr-only">
        Current: {currentLayout}
      </span>
    </div>
  );
};
GridLayoutSelector.displayName = 'GridLayoutSelector';

export default GridLayoutSelector;
