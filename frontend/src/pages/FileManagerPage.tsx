import React from 'react';
import '../styles/fileManager.scss';
import TopBar from '../components/TopBars/TopBar';
import FolderTree from '../components/LeftPanel/FolderTree';
import PrimarySidebar from '../components/PrimarySidebar/PrimarySidebar';
import MiddlePanel from '../components/MiddlePanel/MiddlePanel';
// import DocumentViewer from '../components/DocumentViewer/DocumentViewer';

const FileManagerPage: React.FC = () => {

  return (
    <div className="file-manager">
      <div className="file-manager-body">
        <PrimarySidebar />
          <FolderTree />
        <div className='middle-panel'>
          <TopBar />
          <MiddlePanel />
        </div>
        {/* Right: DocumentViewer */}
        {/* <div className='right-panel'>
          <DocumentViewer />
        </div> */}
      </div>
    </div>
  );
};

export default FileManagerPage;
