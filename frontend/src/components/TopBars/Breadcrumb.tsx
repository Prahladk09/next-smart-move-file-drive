import { useEffect, useState } from 'react';
import { useFileStore } from '../../store/useFileStore';
import { getPathFromTree } from '../../utils/folderUtils';
import '../../styles/breadcrumb.scss';

function Breadcrumb() {
  const folderTree = useFileStore((s) => s.folderTree);
  const currentFolder = useFileStore((s) => s.currentFolder);
  const setCurrentFolder = useFileStore((s) => s.setCurrentFolder);
  const [path, setPath] = useState<typeof folderTree>([]);

  useEffect(() => {
    if (currentFolder) {
      const resolved = getPathFromTree(folderTree, currentFolder._id);
      setPath(resolved);
    } else {
      setPath([]);
    }
  }, [currentFolder, folderTree]);

  return (
    <div className="breadcrumb">
      {path.map((folder, idx) => (
        <span key={folder._id} onClick={() => setCurrentFolder(folder)}>
          {folder.name}
          {idx < path.length - 1 && <span className="separator">/</span>}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;
