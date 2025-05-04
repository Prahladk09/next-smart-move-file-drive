// import { useState } from 'react';
import { Folder, FileItem } from '../../store/useFileStore';
import { useFileStore } from '../../store/useFileStore';

type Props = {
  folder: Folder;
};

function FolderItem({ folder }: Props) {
  const isExpanded = useFileStore((s) => s.expandedFolders[folder._id]);
  const toggleExpand = useFileStore((s) => s.toggleFolderExpand);
  const currentFolder = useFileStore((s) => s.currentFolder);
  const setCurrentFolder = useFileStore((s) => s.setCurrentFolder);

  const isActive = currentFolder?._id === folder._id;
  const hasChildren = Array.isArray(folder.children) && folder.children.length > 0;
  const hasFiles = Array.isArray(folder.files) && folder.files.length > 0;

  const loadedFolders = useFileStore((s) => s.loadedFolders);
  const loadFolderById = useFileStore((s) => s.loadFolderById);
  const folderData = loadedFolders[folder._id] || folder;
  const setSelectedFile = useFileStore((s) => s.setSelectedFile);

  const handleClick = (file: FileItem) => {
    setSelectedFile(file);
  };


  return (
    <div>
      <div
        className={`folder-row ${isActive ? 'active' : ''}`}
        onClick={() => setCurrentFolder(folder)}
      >
        <div className="d-flex align-center gap-1">
            <i className="material-icons-outlined folder-icon">folder</i>
          <span className="folder-name">{folder.name}</span>
        </div>
          {(hasChildren || hasFiles) ? (
            <i
              className="material-icons-outlined toggle-icon"
              onClick={async (e) => {
                e.stopPropagation();
                toggleExpand(folder._id);
                setCurrentFolder(folder);
                if (!loadedFolders[folder._id]) {
                    await loadFolderById(folder._id); // lazy load
                  }
              }}
            >
              {isExpanded ? 'do_not_disturb_on' : 'add_circle'}
            </i>
          ) : (
            <i className="material-icons-outlined" style={{ width: 24 }} />
          )}

         
      </div>

      {isExpanded && (
        <div className="folder-children">
          {folderData.children?.map((child) => (
            <FolderItem key={child._id} folder={child} />
          ))}

          {folderData.files?.map((file: FileItem) => (
            <div key={file._id} className="file-row d-flex align-center gap-1" onClick= {() =>handleClick(file)}>
              <i className="material-icons-outlined file-icon">description</i>
              <span className="file-name">{file.originalName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;
