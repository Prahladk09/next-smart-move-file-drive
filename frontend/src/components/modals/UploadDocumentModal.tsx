/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../styles/UploadDocumentModal.scss';
import { useEffect, useState } from 'react';
import { useFileStore } from '../../store/useFileStore';
import Axios from '../../services/Axios';

type Props = {
  onClose: () => void;
  parentId?: any;
};

function UploadDocumentModal({ onClose, parentId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadProgress = useFileStore((s) => s.uploadProgress);
  const setUploadProgress = useFileStore((s) => s.setUploadProgress);
  const currentFolder = parentId;
  const loadFolderById = useFileStore((s) => s.loadFolderById);
  const setCurrentFolder = useFileStore((s) => s.setCurrentFolder);

  const [clientId] = useState(() => `client-${Date.now()}`);

  const baseURL = Axios.defaults.baseURL;

  useEffect(() => {
    if (!isUploading) return;

    const eventSource = new EventSource(`${baseURL}/files/stream-progress?id=${clientId}`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUploadProgress(data.progress);
    };
    eventSource.onerror = () => {
      eventSource.close();
    };
    return () => eventSource.close();
  }, [baseURL, clientId, isUploading, setUploadProgress]);

  const fetchTree = useFileStore((s) => s.fetchFolderTree);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', clientId);
    if(currentFolder) formData.append('folderId', currentFolder);
    

    try {
      await Axios.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await fetchTree(); //refreshes left tree panel
      if (currentFolder) {
        await loadFolderById(currentFolder);
      } else {
        setCurrentFolder(null); // root view update
      }
      setTimeout(async () => {
        await fetchTree(); // updates left panel
      }, 100);
      onClose();
    } catch (err) {
      console.error('Upload failed:', err);
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-modal">
      <div className="modal-head">
        <span>Upload document</span>
        <i className="material-icons close-icon close-btn" onClick={onClose}>close</i>
      </div>

      {!isUploading && (
        <>
          <label htmlFor="upload-input">
            <div className="upload-box">
              <i className="material-icons-outlined">upload_file</i>
            </div>
          </label>
          <input
            type="file"
            id="upload-input"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(f);
            }}
          />
        </>
      )}

      {file && (
        <div style={{ marginTop: '0.5rem' }}>
          <strong>{file.name}</strong> <span style={{ fontSize: '13px' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
      )}

      {isUploading && (
        <div style={{ marginTop: '0.5rem' }}>
          <div className="progress-bar">
            <div className="bar" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <div className="progress-text">{uploadProgress}% upload completed</div>
        </div>
      )}

      <div className="modal-actions">
        <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn btn-upload" onClick={handleUpload} disabled={!file || isUploading}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadDocumentModal;
