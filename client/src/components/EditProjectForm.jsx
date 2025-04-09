import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export default function EditProjectForm({ project }) {
  const navigate = useNavigate();
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { 
      id: project.id, 
      name, 
      description, 
      status: status === 'Not Started' ? 'new' : 
              status === 'In Progress' ? 'progress' : 
              'completed' 
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    onCompleted: () => {
      navigate('/');
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert('Please fill out all fields');
    }

    updateProject();
  };

  return (
    <div className="mt-5 p-4 border border-gray-600 rounded-lg bg-gray-800">
      <h3 className="text-lg font-medium text-gray-200 mb-4">Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label text-gray-200">Name</label>
          <input
            type="text"
            className="form-control border-gray-600"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-200">Description</label>
          <textarea
            className="form-control border-gray-600"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-200">Status</label>
          <select
            id="status"
            className="form-select border-gray-600"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
