import '../../styles/primary-sidebar.scss';
import { FaUserCircle } from 'react-icons/fa';

function PrimarySidebar() {
  return (
    <div className="primary-sidebar">
      <div className="nav-upper">
        <div className="nav-icons">
          <div  className="nav-head-icon" />
        </div>
        <div className="nav-icons">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="nav-icon" />
          ))}
        </div>
      </div>
      <div className="profile-icon">
        <FaUserCircle size={28} color="#fff" />
      </div>
    </div>
  );
}

export default PrimarySidebar;
