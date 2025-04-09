import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientInfo({ client }) {
  return (
    <div className="mt-5 p-5 border border-gray-600 rounded-lg bg-gray-800">
      <h5 className="text-lg font-medium text-gray-200 mb-4">Client Information</h5>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-200 p-3 border border-gray-600 rounded-lg bg-gray-700">
          <FaIdBadge className="text-indigo-400" />
          <span>{client.name}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-200 p-3 border border-gray-600 rounded-lg bg-gray-700">
          <FaEnvelope className="text-indigo-400" />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-200 p-3 border border-gray-600 rounded-lg bg-gray-700">
          <FaPhone className="text-indigo-400" />
          <span>{client.phone}</span>
        </div>
      </div>
    </div>
  );
}
