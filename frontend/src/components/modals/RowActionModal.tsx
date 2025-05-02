import { useState } from 'react';
import type { Folder, FileItem } from '../../store/useFileStore';
import CreateFolderModal from '../modals/CreateFolderModal';
import UploadFileModal from '../modals/UploadFileModal';
import "../../styles/rowAction.scss";

type Props = {
  target:  Folder | FileItem;
};

function RowActionsModal({ target }: Props) {
    console.log(target)
  const [open, setOpen] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="row-actions">
      <i
        className="material-icons-outlined"
        onClick={() => setOpen((prev) => !prev)}
      >
        more_vert
      </i>
      {open && (
          <div className="dropdown">
            <div>
              <i className="material-icons-outlined">edit</i>
              Edit
            </div>
            <div>
              <i className="material-icons-outlined">delete</i>
              Delete
            </div>
            <div onClick={() => { setShowFolderModal(true); setOpen(false); }}>
              <i className="material-icons-outlined">create_new_folder</i>
              Create Folder
            </div>
            <div onClick={() => { setShowUploadModal(true); setOpen(false); }}>
              <i className="material-icons-outlined">upload_file</i>
              Upload Document
            </div>
          </div>
        )}
        {showFolderModal && <CreateFolderModal parentId = {target._id} onClose={() => setShowFolderModal(false)} />}
        {showUploadModal && <UploadFileModal parentId = {target._id} onClose={() => setShowUploadModal(false)} />}

    </div>
  );
}

export default RowActionsModal;
