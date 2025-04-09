import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from '../components/Spinner';
import ProjectCard from '../components/ProjectCard';
import ClientRow from '../components/ClientRow';

export default function Home() {
  const { loading: projectsLoading, error: projectsError, data: projectsData } = useQuery(GET_PROJECTS);
  const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS);

  if (projectsLoading || clientsLoading) return <Spinner />;
  if (projectsError) return <div className="alert alert-danger">Error loading projects: {projectsError.message}</div>;
  if (clientsError) return <div className="alert alert-danger">Error loading clients: {clientsError.message}</div>;

  return (
    <div className="container mt-4">
      {/* Projects Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title mb-4">Projects</h3>
          <div className="row">
            {!projectsData?.projects || projectsData.projects.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info">
                  No projects found. Click the "Add Project" button in the header to create one.
                </div>
              </div>
            ) : (
              projectsData.projects.map((project) => (
                <div key={project.id} className="col-md-4 mb-3">
                  <ProjectCard project={project} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Clients</h3>
          {!clientsData?.clients || clientsData.clients.length === 0 ? (
            <div className="alert alert-info">
              No clients found. Click the "Add Client" button in the header to create one.
            </div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.clients.map((client) => (
                  <ClientRow key={client.id} client={client} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
