import React from 'react';
import '../styles/fileManager.scss';
import TopBar from '../components/TopBars/TopBar';
import FolderTree from '../components/LeftPanel/FolderTree';
import PrimarySidebar from '../components/PrimarySidebar/PrimarySidebar';
import MiddlePanel from '../components/MiddlePanel/MiddlePanel';
// import { useFileStore } from '../store/useFileStore';

const FileManagerPage: React.FC = () => {
  // const isSidebarOpen = useFileStore((s) => s.isLeftSidebarOpen);
  // const setSidebarOpen = useFileStore((s) => s.setLeftSidebarOpen);

  return (
    <div className="file-manager">
      <div className="file-manager-body">
        <PrimarySidebar />
        {/* <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}> */}
          <FolderTree />
        {/* </div> */}
        <div className='right-panel'>
          <TopBar />
          <MiddlePanel />
        </div>
        {/* Middle: Folder contents */}
        {/* Right: DocumentViewer */}
      </div>
    </div>
  );
};

export default FileManagerPage;
