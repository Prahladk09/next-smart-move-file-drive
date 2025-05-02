import { FileItem } from '../../store/useFileStore';
import RowActionsMenu from '../modals/RowActionModal';

type Props = {
  file: FileItem;
  level: number;
};

function FileRow({ file, level }: Props) {
  const indent = { paddingLeft: `${level * 2}rem` };

  return (
    <div className="table-row file-row">
      <div className="cell" style={indent}>
        <i className="material-icons-outlined file-icon">description</i>
        <span className="name">{file.originalName}</span>
      </div>
      <div className="cell">---</div>
      <div className="cell">{new Date(file.createdAt).toLocaleString()}</div>
      <div className="cell">{new Date(file.updatedAt).toLocaleString()}</div>
      <div className="cell actions"><RowActionsMenu target={file} /></div>
    </div>
  );
}

export default FileRow;
