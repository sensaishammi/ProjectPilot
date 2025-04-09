import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <div className="alert alert-danger">Error loading clients: {error.message}</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-4">Clients</h3>
        {!data?.clients || data.clients.length === 0 ? (
          <div className="alert alert-info">No clients found. Click the "Add Client" button in the header to create one.</div>
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
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
