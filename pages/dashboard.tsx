import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../components/Auth/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { role, scenario } = useAuth();

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" mb={2}>{t('client')}: {t('dashboard')}</Typography>
      <Typography mb={2}>{t('selectScenario')}: {t(scenario || 'ideal')}</Typography>
      <Button variant="contained" color="primary" href="/application">{t('next')}</Button>
    </Box>
  );
};

export default Dashboard; 