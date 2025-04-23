import React from 'react';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './Context/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <Dashboard /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;