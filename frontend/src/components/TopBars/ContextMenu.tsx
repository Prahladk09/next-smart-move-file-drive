import React, { useState } from 'react';
import CreateFolderModal from '../modals/CreateFolderModal';
import UploadFileModal from '../modals/UploadDocumentModal';
import '../../styles/context-menu.scss';

const ContextMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="context-menu">
      <button onClick={() => setOpen(!open)} className="plus-btn">
        <i className="material-icons">add</i>
      </button>
      {open && (
        <div className="dropdown">
          <div style={{borderBottom: "1px solid #dcd7d7"}} onClick={() => { setShowFolderModal(true); setOpen(false); }}>
            Create Folder
          </div>
          <div onClick={() => { setShowUploadModal(true); setOpen(false); }}>
            Upload Document
          </div>
        </div>
      )}
      {showFolderModal && <CreateFolderModal parentId = {null} onClose={() => setShowFolderModal(false)} />}
      {showUploadModal && <UploadFileModal parentId = {null} onClose={() => setShowUploadModal(false)} />}
    </div>
  );
};

export default ContextMenu;
