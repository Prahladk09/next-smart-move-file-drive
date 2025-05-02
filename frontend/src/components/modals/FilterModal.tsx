import { useState } from 'react';
import '../../styles/FilterModal.scss';

type Props = {
  onClose: () => void;
  onApply: (filters: { name?: string; description?: string; date?: string }) => void;
  onClear: () => void;
};

const FilterModal = ({ onClose, onApply, onClear }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="filter-modal">
      <div className="modal-header">
        <h3>Filters</h3>
        <div>
          <button className="clear-btn" onClick={onClear}>Clear</button>
          <i className="material-icons close-icon" onClick={onClose}>close</i>
        </div>
      </div>

      <div className="modal-body">
        <label>Name</label>
        <input placeholder="Folder name" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description</label>
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Date</label>
        <input
          placeholder="DD-MM-YYYY"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="modal-footer">
        <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
        <button
          className="btn btn-apply"
          onClick={() => onApply({ name, description, date })}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
