import { useState } from 'react';
import { type Folder, type FileItem, useFileStore } from '../../store/useFileStore';
import CreateFolderModal from '../modals/CreateFolderModal';
import UploadFileModal from './UploadDocumentModal';
import "../../styles/rowAction.scss";
import Axios from '../../services/Axios';

type Props = {
  target:  Folder | FileItem;
  rowType: 'folder' | 'file';
};

function RowActionsModal({ target, rowType }: Props) {
    // console.log(target)
  const [open, setOpen] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fetchTree = useFileStore((s) => s.fetchFolderTree);
  const loadFolderById = useFileStore((s) => s.loadFolderById);
  const setCurrentFolder = useFileStore((s) => s.setCurrentFolder);

  const handleDelete = async (Id: string, rowType:string) => {
    if (rowType === 'folder') {
      try {
        await Axios.delete(`/folders/${Id}`);
        await fetchTree();                      //update left panel
        const currentFolder = useFileStore.getState().currentFolder;
        if (currentFolder?._id) {
          await loadFolderById(currentFolder._id);    //update middle panel
        } else {
          await setCurrentFolder(null);
        }
      } catch (err) {
        console.error('Failed to delete folder:', err);
      }
    } else if (rowType === 'file') {
      try {
        await Axios.delete(`/files/${Id}`);
        await fetchTree();
        const currentFolder = useFileStore.getState().currentFolder;
        if (currentFolder?._id) {
          await loadFolderById(currentFolder._id);  
        } else {
          await setCurrentFolder(null);
        }
      } catch (err) {
        console.error('Failed to delete file:', err);
      }
    }
  };
  
  

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
            <div onClick={() => { handleDelete(target._id, rowType); setOpen(false); }}>
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
