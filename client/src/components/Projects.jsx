import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import Spinner from './Spinner';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return (
    <div className="alert alert-danger" role="alert">
      Error loading projects: {error.message}
    </div>
  );

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-4">Projects</h3>
        <div className="row">
          {!data?.projects || data.projects.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info" role="alert">
                No projects found. Click the "Add Project" button in the header to create one.
              </div>
            </div>
          ) : (
            data.projects.map((project) => (
              <div key={project.id} className="col-md-4 mb-3">
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
