import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../queries/projectQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

export default function AddProjectModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');
  const [clientId, setClientId] = useState('');

  // Get clients for the dropdown
  const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS);

  const [addProject, { loading }] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || description === '' || status === '' || clientId === '') {
      return alert('Please fill in all fields');
    }
    addProject();
    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
    setShow(false);
  };

  if (loading || clientsLoading) return <Spinner />;
  if (clientsError) return <p>Error loading clients: {clientsError.message}</p>;

  return (
    <>
      <button
        type="button"
        className="btn btn-primary me-2"
        onClick={() => setShow(true)}
      >
        Add Project
      </button>

      {show && (
        <div className="modal show" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShow(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select
                      className="form-select"
                      id="clientId"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value="">Select Client</option>
                      {clientsData?.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
