import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../queries/projectQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
import { FaTrash } from 'react-icons/fa';

export default function DeleteProjectButton({ projectId }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter((project) => project.id !== deleteProject.id),
        },
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject();
    }
  };

  return (
    <button
      className="btn btn-danger btn-sm mt-4"
      onClick={handleDelete}
      title="Delete Project"
    >
      <FaTrash className="icon" />
    </button>
  );
}
