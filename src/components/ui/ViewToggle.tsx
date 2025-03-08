import React from 'react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onViewChange('grid')}
        className={`px-3 py-1 rounded ${
          view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Cuadrícula
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`px-3 py-1 rounded ${
          view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Lista
      </button>
    </div>
  );
};

export default ViewToggle;