import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  Tabs,
  Tab,
  Stack,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getApplicationById, updateApplicationStatus } from '../../api-mock';
import UnderwritingForm from './UnderwritingForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Черновик',
  submitted: 'Отправлена',
  scoring: 'Скоринг',
  underwriting: 'Андеррайтинг',
  approved: 'Одобрена',
  rejected: 'Отклонена',
  issued: 'Выдан кредит'
};

const STATUS_COLORS: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  draft: 'default',
  submitted: 'info',
  scoring: 'warning',
  underwriting: 'info',
  approved: 'success',
  rejected: 'error',
  issued: 'secondary'
};

interface ApplicationDetailProps {
  id: string;
}

const ApplicationDetail: React.FC<ApplicationDetailProps> = ({ id }) => {
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const app = getApplicationById(id);
    setApplication(app);
  }, [id]);

  if (!application) {
    return <Typography>Заявка не найдена</Typography>;
  }

  const handleStartUnderwriting = () => {
    updateApplicationStatus(id, 'underwriting');
    setApplication({
      ...application,
      status: 'underwriting'
    });
  };

  return (
    <>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => router.push('/staff/applications')}
        sx={{ mb: 2 }}
      >
        Назад к списку
      </Button>

      <Paper sx={{ mb: 3, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">{application.clientName}</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              ID: {application.id} | Создана: {new Date(application.createdAt).toLocaleString('ru')}
            </Typography>
            
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Chip 
                label={application.product === 'mortgage' ? 'Ипотека' : 'Автокредит'} 
                color="primary" 
              />
              <Chip 
                label={STATUS_LABELS[application.status] || application.status} 
                color={STATUS_COLORS[application.status] || 'default'} 
              />
              <Chip 
                label={`Сценарий: ${application.scenario}`} 
                variant="outlined" 
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { md: 'flex-end' }, mt: { xs: 2, md: 0 } }}>
            {application.status === 'approved' && (
              <Button 
                variant="contained" 
                color="success"
                onClick={() => updateApplicationStatus(id, 'issued')}
              >
                Выдать кредит
              </Button>
            )}
            
            {(application.status === 'scoring' || application.status === 'submitted') && (
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleStartUnderwriting}
              >
                Начать андеррайтинг
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Информация о клиенте" />
          <Tab label="Андеррайтинг" />
          <Tab label="Документы" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Основная информация</Typography>
              <Typography>ФИО: <b>{application.clientName}</b></Typography>
              <Typography>Телефон: <b>{application.phone || '+7 (999) 123-45-67'}</b></Typography>
              <Typography>Email: <b>{application.email || 'client@example.com'}</b></Typography>
              <Typography>Паспорт: <b>{application.passport || '1234 567890'}</b></Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Параметры кредита</Typography>
              <Typography>Продукт: <b>{application.product === 'mortgage' ? 'Ипотека' : 'Автокредит'}</b></Typography>
              <Typography>Сумма: <b>{application.amount || '3 000 000'} ₽</b></Typography>
              <Typography>Срок: <b>{application.term || '180'} месяцев</b></Typography>
              <Typography>Ежемесячный платеж: <b>{application.payment || '30 000'} ₽</b></Typography>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {application.status === 'underwriting' ? (
            <UnderwritingForm 
              id={id} 
              application={application} 
              onStatusChange={(status) => {
                setApplication({
                  ...application,
                  status
                });
              }} 
            />
          ) : (
            <Typography>
              {application.status === 'approved' || application.status === 'rejected' ? 
                'Андеррайтинг завершен' : 
                'Андеррайтинг еще не начат'}
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Паспорт</Typography>
              <Paper 
                sx={{ 
                  p: 2, 
                  border: '1px dashed grey',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200
                }}
              >
                <Avatar variant="rounded" sx={{ width: 150, height: 200 }}>
                  {application.product === 'mortgage' ? 'Паспорт' : 'Паспорт'}
                </Avatar>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">СНИЛС</Typography>
              <Paper 
                sx={{ 
                  p: 2, 
                  border: '1px dashed grey',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200
                }}
              >
                <Avatar variant="rounded" sx={{ width: 150, height: 200 }}>
                  {application.product === 'mortgage' ? 'СНИЛС' : 'СНИЛС'}
                </Avatar>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </>
  );
};

export default ApplicationDetail; 