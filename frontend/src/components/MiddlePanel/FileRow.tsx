import { FileItem, useFileStore } from '../../store/useFileStore';
import RowActionsMenu from '../modals/RowActionModal';

type Props = {
  file: FileItem;
  level: number;
};

function FileRow({ file, level }: Props) {
  const indent = { paddingLeft: `${level * 2.5}rem` };
  const setSelectedFile = useFileStore((s) => s.setSelectedFile);

  const handleClick = () => {
    setSelectedFile(file);
  };


  return (
    <div className="table-row file-row">
      <div className="cell clickable" style={indent} onClick={handleClick}>
        <i className="material-icons-outlined file-icon">description</i>
        <span className="name">{file.originalName}</span>
      </div>
      <div className="cell">---</div>
      <div className="cell">{new Date(file.createdAt).toLocaleString()}</div>
      <div className="cell">{new Date(file.updatedAt).toLocaleString()}</div>
      <div className="cell actions"><RowActionsMenu rowType = {"file"} target={file} /></div>
    </div>
  );
}

export default FileRow;
