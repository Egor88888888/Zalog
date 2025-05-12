import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ApplicationDetail from '../../../modules/StaffPanel/ApplicationDetail';
import MainLayout from '../../../components/Layout/MainLayout';
import SystemArchitecture from '../../../components/ProcessVisualization/SystemArchitecture';
import LoanProcessFlow from '../../../components/ProcessVisualization/LoanProcessFlow';
import { getApplicationById } from '../../../api-mock';

const ApplicationDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Получение данных заявки для передачи статуса в компоненты визуализации
  const application = id ? getApplicationById(id as string) : null;
  const currentStatus = application?.status || 'draft';

  return (
    <MainLayout>
      <Typography variant="h4" mb={3}>Детали заявки</Typography>
      {id && <ApplicationDetail id={id as string} />}
      
      {/* Компоненты визуализации процессов */}
      <Box sx={{ mt: 4 }}>
        <LoanProcessFlow currentStatus={currentStatus} />
      </Box>
      
      <Box sx={{ mt: 6 }}>
        <SystemArchitecture activeScenario={currentStatus} />
      </Box>
    </MainLayout>
  );
};

export default ApplicationDetailPage; 