import React from 'react';
import { Outlet } from 'react-router-dom';
import DocumentViewer from './components/DocumentViewer/DocumentViewer';
import { useFileStore } from './store/useFileStore';

const App: React.FC = () => {
  const selectedFile = useFileStore((s) => s.selectedFile);
  console.log('Selected file:', selectedFile);
  return (
    <div className="app-container">
      <Outlet />
      {selectedFile && <DocumentViewer />}
    </div>
  );
};

export default App;
