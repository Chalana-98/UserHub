import { User, UserFormData } from '../types';

const API_URL = 'https://dummyjson.com';

//Fetch initial list
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users?limit=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.users.map((user: any) => ({
      ...user,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Add User
export const addUser = async (userData: UserFormData): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...userData,
        id: Date.now(), 
      });
    }, 300);
  });
};

// Update User
export const updateUser = async (id: number, userData: UserFormData): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...userData,
        id,
      });
    }, 300); 
  });
};

// Delete User
export const deleteUser = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); 
    }, 200); 
  });
};
