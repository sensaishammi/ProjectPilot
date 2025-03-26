import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="mb-3">Projects</h3>
        {data.projects.length > 0 ? (
          <div className='row'>
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p>No Projects</p>
        )}
      </div>
    </div>
  );
}
