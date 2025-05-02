import React from 'react';
import Breadcrumb from './Breadcrumb';
import ContextMenu from './ContextMenu';
import '../../styles/topbar.scss';
import { useState } from 'react';
import FilterModal from '../modals/FilterModal';

const TopBar: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="topbar">
      <div className="left">
        <Breadcrumb />
      </div>
      <div className="right">
        <button className="filter-btn" onClick={() => setIsFilterOpen(true)}>
          <i className="material-icons">filter_alt</i>
        </button>
        <ContextMenu />
      </div>

      {isFilterOpen && (
        <FilterModal
          onClose={() => setIsFilterOpen(false)}
          onApply={(filters) => {
            // TODO: save to store or trigger filtering
            console.log('Applied filters:', filters);
            setIsFilterOpen(false);
          }}
          onClear={() => {
            console.log('Filters cleared');
            setIsFilterOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TopBar;

