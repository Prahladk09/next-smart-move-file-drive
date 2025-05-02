import { useFileStore } from '../../store/useFileStore';
import FolderRow from './FolderRow';
import '../../styles/table.scss';

function MiddlePanel() {
  const folderTree = useFileStore((s) => s.folderTree);

  return (
    <div className="middle-table">
      <div className="table-header">
        <span style={{paddingLeft: "3rem"}}>Name</span>
        <span>Description</span>
        <span>Created at</span>
        <span>Updated at</span>
      </div>

      <div className="table-body">
        {folderTree.map((folder) => (
          <FolderRow key={folder._id} folder={folder} level={0} />
        ))}
      </div>
    </div>
  );
}

export default MiddlePanel;

