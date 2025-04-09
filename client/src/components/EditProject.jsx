import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../queries/projectQueries';
import Spinner from './Spinner';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id, name, description, status },
    onCompleted: () => navigate('/'),
  });

  useEffect(() => {
    if (data?.project) {
      setName(data.project.name);
      setDescription(data.project.description);
      setStatus(data.project.status);
    }
  }, [data]);

  if (loading) return <Spinner />;
  if (error) return <p>Error loading project: {error.message}</p>;

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }
    updateProject();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Project</h5>
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
                <button type="submit" className="btn btn-primary">
                  Update Project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 