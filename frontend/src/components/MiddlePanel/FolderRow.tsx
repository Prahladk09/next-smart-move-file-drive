import { Folder } from '../../store/useFileStore';
import { useFileStore } from '../../store/useFileStore';
import FileRow from './FileRow';
import RowActionsModal from '../modals/RowActionModal';
import { useState } from 'react';

type Props = {
  folder: Folder;
  level: number;
  isChild?: boolean;
};

function FolderRow({ folder, level, isChild }: Props) {
  const isExpanded = useFileStore((s) => s.expandedFolders[folder._id]);
  const toggleExpand = useFileStore((s) => s.toggleFolderExpand);
  const setCurrentFolder = useFileStore((s) => s.setCurrentFolder);
  const currentFolder = useFileStore((s) => s.currentFolder);
  const [childExist, setChildExist] = useState(false);

  const indent = { paddingLeft: `${level * 1}rem` };
  const isActive = currentFolder?._id === folder._id;
  const handleChild = () => {
    setChildExist(!childExist);
  }

  return (
    <>
      <div className={`table-row folder-row ${isActive ? 'active' : ''} ${childExist ? 'is-child' : ''} ${isChild ? 'is-child' : ''}`}>
                {/* {isChild? "true": "false"} */}
        <div className="cell" style={indent} onClick={() => { toggleExpand(folder._id); handleChild(); setCurrentFolder(folder); }}>
            {(folder.children?.length || folder.files?.length) ? (
                <i className="material-icons-outlined" onClick={() => setCurrentFolder(folder)} style={{cursor: "pointer"}}>
                    {isExpanded ? 'expand_more' : 'chevron_right'}
                </i>
                ) : (
                <span style={{ width: '24px' }} />  // keeps alignment
            )}
          <i className="material-icons-outlined folder-icon">folder</i>
          <span className="name" onClick={() => setCurrentFolder(folder)}>{folder.name}</span>
        </div>
        <div className="cell">{folder.description || '---'}</div>
        <div className="cell">{new Date(folder.createdAt).toLocaleString()}</div>
        <div className="cell">{new Date(folder.updatedAt).toLocaleString()}</div>
        <div className="cell actions"><RowActionsModal target={folder} rowType = {"folder"}/></div>
      </div>

      {isExpanded && folder.children?.map((child) => (
        <FolderRow key={child._id} folder={child} level={level + 1} isChild={true} />
      ))}

      {isExpanded && folder.files?.map((file) => (
        <FileRow key={file._id} file={file} level={level + 1} />
      ))}
    </>
  );
}

export default FolderRow;
