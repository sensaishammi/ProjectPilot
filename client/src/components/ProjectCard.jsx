import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import DeleteProjectButton from './DeleteProjectButton';

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{project.name}</h5>
          <div>
            <Link
              to={`/projects/${project.id}`}
              className="btn btn-light btn-sm me-2"
              title="Edit Project"
            >
              <FaEdit className="icon" />
            </Link>
            <DeleteProjectButton projectId={project.id} />
          </div>
        </div>
        <p className="card-text">{project.description || 'No description provided'}</p>
        <p className="card-text">
          <strong>Status:</strong> {project.status || 'Not Set'}
        </p>
        <p className="card-text">
          <strong>Client:</strong> {project.client?.name || 'No client assigned'}
        </p>
      </div>
    </div>
  );
}
