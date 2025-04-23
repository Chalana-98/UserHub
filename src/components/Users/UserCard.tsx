import React, { useState } from 'react';
import { User } from '../../types';
import { Mail, Phone,MapPin, Edit, Trash2 } from 'lucide-react';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Mail size={14} className="mr-1" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {user.age} years
          </span>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            {user.phone && (
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <Phone size={14} className="mr-2 flex-shrink-0" />
                <span>{user.phone}</span>
              </div>
            )}
            
            {user.address && (
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <MapPin size={14} className="mr-2 flex-shrink-0" />
                <span>{user.address.address}, {user.address.city}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;