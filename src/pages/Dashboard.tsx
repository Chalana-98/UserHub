import React from 'react';

import UserList from '../components/Users/UserList';
import Layout from '../components/Layout/Layout';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default Dashboard;