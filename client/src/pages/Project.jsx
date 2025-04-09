import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5 bg-gray-800 border border-gray-600'>
          <Link to='/' className='btn btn-primary btn-sm w-25 d-inline ms-auto mb-4'>
            Back
          </Link>

          <div className="p-4 border border-gray-600 rounded-lg bg-gray-800 mb-4">
            <h1 className="text-2xl font-semibold text-gray-200 mb-2">{data.project.name}</h1>
            <p className="text-gray-300">{data.project.description}</p>
          </div>

          <div className="p-4 border border-gray-600 rounded-lg bg-gray-800 mb-4">
            <h5 className="text-lg font-medium text-gray-200 mb-4">Project Status</h5>
            <p className="text-gray-200 p-3 border border-gray-600 rounded bg-gray-700">
              {data.project.status}
            </p>
          </div>

          <ClientInfo client={data.project.client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}
