import React from 'react';
import { Box, Typography } from '@mui/material';
import ApplicationList from '../../../modules/StaffPanel/ApplicationList';
import MainLayout from '../../../components/Layout/MainLayout';

const ApplicationsPage: React.FC = () => (
  <MainLayout>
    <Typography variant="h4" mb={3}>Заявки на кредит</Typography>
    <ApplicationList />
  </MainLayout>
);

export default ApplicationsPage; 