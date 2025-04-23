import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import { Plus, Loader } from 'lucide-react';
import { deleteUser, fetchUsers } from '../../services/UserService';
import { User } from '../../types';
import UserCard from './UserCard';
import UserForm from './UserForm';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
 

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(
        user => 
          user.firstName.toLowerCase().includes(term) || 
          user.lastName.toLowerCase().includes(term) || 
          user.email.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      } catch (err) {
      }
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  const handleUserSaved = (savedUser: User) => {
    if (currentUser) {
      // Update existing user
      setUsers(prevUsers => 
        prevUsers.map(u => u.id === savedUser.id ? savedUser : u)
      );
      setFilteredUsers(prevUsers => 
        prevUsers.map(u => u.id === savedUser.id ? savedUser : u)
      );
    } else {
      // Add new user
      setUsers(prevUsers => [savedUser, ...prevUsers]);
      setFilteredUsers(prevUsers => [savedUser, ...prevUsers]);
    }
    
    setIsFormOpen(false);
    setCurrentUser(null);
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={handleAddUser}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add User
        </button>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      {filteredUsers.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            {searchTerm ? 'No users match your search criteria.' : 'No users found. Add some!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      )}
      
      {isFormOpen && (
        <UserForm
          user={currentUser}
          onClose={handleFormClose}
          onSave={handleUserSaved}
        />
      )}
      
    </div>
  );
};

export default UserList;