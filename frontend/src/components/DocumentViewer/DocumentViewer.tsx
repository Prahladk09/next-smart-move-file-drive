import { useFileStore } from '../../store/useFileStore';
import '../../styles/documentViewer.scss';

const DocumentViewer = () => {
    const selectedFile = useFileStore((s) => s.selectedFile);
    const setSelectedFile = useFileStore((s) => s.setSelectedFile);
  
    if (!selectedFile) return null;
  
    const { fileType, url, originalName } = selectedFile;
  
    const renderContent = () => {
      if (fileType === 'application/pdf') {
        return <iframe src={url} title={originalName} />;
      }
  
      if (fileType.startsWith('image/')) {
        return <img src={url} alt={originalName} />;
      }
  
      if (fileType === 'text/plain') {
        return <iframe src={url} title={originalName} />;
      }
  
      return <p>Unsupported file type</p>;
    };
  
    return (
        <div className="fullscreen-viewer" onClick={() => setSelectedFile(null)}>
        <div className="viewer-box" onClick={(e) => e.stopPropagation()}>
          <div className="viewer-header">
            <span className="file-name">{originalName}</span>
            <button className="close-btn" onClick={() => setSelectedFile(null)}>✕</button>
          </div>
          <div className="viewer-content">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  };
  

export default DocumentViewer;
