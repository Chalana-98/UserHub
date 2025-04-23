export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phone?: string;
    address?: {
      address: string;
      city: string;
    };
  }
  
  export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phone?: string;
  }
  
  export interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    user: {
      email: string;
      name: string;
    } | null;
  }