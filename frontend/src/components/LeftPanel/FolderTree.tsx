import { useEffect } from 'react';
import { useFileStore } from '../../store/useFileStore';
import FolderItem from './FolderItem';
import '../../styles/leftpanel.scss';

function FolderTree() {
  const folderTree = useFileStore((s) => s.folderTree);
  const fetchTree = useFileStore((s) => s.fetchFolderTree);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  return (
    <div className="left-panel">
      <div className="left-header">
        <span className='header'>Folders & Documents</span>
        <div className="stats">
          <div className='d-flex flex-column' style={{borderRight: "1px solid #dcd7d7"}}>
            <i className="material-icons-outlined fz-2">folder</i>
            <div className='d-flex flex-column mt-2'>
              <span> Folders </span> 
              <span style={{fontSize: "1rem", fontWeight: "bold"}}> 200+</span>
            </div>
          </div>
          <div className='d-flex flex-column'>
            <i className="material-icons-outlined fz-2">description</i>
            <div className='d-flex flex-column mt-2'>
              <span> Documents </span> 
              <span style={{fontSize: "1rem", fontWeight: "bold"}}> 200+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="folder-list">
        {folderTree.map((folder) => (
          <FolderItem key={folder._id} folder={folder} />
        ))}
      </div>
    </div>
  );
}

export default FolderTree;
