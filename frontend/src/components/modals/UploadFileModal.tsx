/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useRef, useState } from 'react';
// import { useFileStore } from '../../store/useFileStore';
// import api from '../../services/Axios';
// import '../../styles/modal.scss';

// type Props = {
//   onClose: () => void;
//   parentId?: any;
// };

// function UploadFileModal({ onClose, parentId }: Props) {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [clientId] = useState(() => `client-${Date.now()}`);

//   const currentFolder = parentId;//useFileStore((s) => s.currentFolder);
//   const progress = useFileStore((s) => s.uploadProgress);
//   const setProgress = useFileStore((s) => s.setUploadProgress);
//   const fetchTree = useFileStore((s) => s.fetchFolderTree);

//   const eventSourceRef = useRef<EventSource | null>(null);

//   useEffect(() => {
//     if (!uploading) return;
//     const es = new EventSource(`/api/files/stream-progress?id=${clientId}`);
//     es.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setProgress(data.progress);
//       if (data.progress >= 100) {
//         setTimeout(() => {
//           es.close();
//           setProgress(0);
//           onClose();
//           fetchTree?.();
//         }, 500);
//       }
//     };
//     eventSourceRef.current = es;
//     return () => es.close();
//   }, [clientId, fetchTree, onClose, setProgress, uploading]);

//   const handleUpload = async () => {
//     if (!file) return;
//     setUploading(true);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('folderId', currentFolder );//?._id || '');
//     formData.append('clientId', clientId);

//     try {
//       await api.post('/api/files/upload', formData);
//     } catch (err) {
//       console.error('Upload failed:', err);
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-container">
//         <div className="modal-header">
//           <span>Upload document</span>
//           <button className='close-btn' onClick={onClose}><i className="material-icons">close</i></button>
//         </div>
//         <div className="modal-body">
//           <label>Browse document</label>
//           <div className="drop-area">
//             <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//             <p>{file?.name || 'No file selected'}</p>
//           </div>
//           {uploading && <div>Uploading... {progress}%</div>}
//         </div>
//         <div className="modal-footer">
//           <button className="cancel" onClick={onClose}>Cancel</button>
//           <button className="confirm" disabled={!file || uploading} onClick={handleUpload}>
//             {uploading ? 'Uploading...' : 'Upload'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadFileModal;



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
  const currentFolder = parentId;//useFileStore((s) => s.currentFolder);
  const loadFolderById = useFileStore((s) => s.loadFolderById);

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

      await loadFolderById(currentFolder);
      onClose();
    } catch (err) {
      console.error('Upload failed:', err);
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-modal">
      <div className="modal-header">
        <h3>Upload document</h3>
        <i className="material-icons close-icon" onClick={onClose}>close</i>
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
