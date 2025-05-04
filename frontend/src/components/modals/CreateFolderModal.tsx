/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { createFolder } from '../../services/api';
import { useFileStore } from '../../store/useFileStore';
import '../../styles/modal.scss';

type Props = {
  onClose: () => void;
  parentId?: any;
};

function CreateFolderModal({ onClose, parentId }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const currentFolder = parentId;
  const fetchTree = useFileStore((s) => s.fetchFolderTree);
  const loadFolderById = useFileStore((s) => s.loadFolderById);
  const setCurrentFolder = useFileStore((s) => s.setCurrentFolder);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await createFolder({
        name,
        description,
        parent: currentFolder 
      });
      if (currentFolder) {
        await loadFolderById(currentFolder);
      } else {
        setCurrentFolder(null); // root view update
      }
      setTimeout(async () => {
        await fetchTree(); // updates left panel
      }, 100);
      onClose();
    } catch (err) {
      console.error('Create folder failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <span>Create Folder</span>
          <button className='close-btn' onClick={onClose}><i className="material-icons">close</i></button>
        </div>
        <div className="modal-body">
          <label>Name</label>
          <input className='modal-input' placeholder="Folder name" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Description</label>
          <input className='modal-input' placeholder="Folder Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="modal-footer">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="confirm" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFolderModal;
