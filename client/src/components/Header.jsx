import { Link } from 'react-router-dom';
import Logo from './Logo';
import AddProjectModal from './AddProjectModal';
import AddClientModal from './AddClientModal';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Logo />
          Project Management
        </Link>
        <div className="collapse navbar-collapse">
          <div className="d-flex ms-auto">
            <div className="me-3">
              <AddProjectModal />
            </div>
            <div>
              <AddClientModal />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
