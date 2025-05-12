import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Stack, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { getApplicationById, updateApplicationStatus } from '../../api-mock';

const STATUS_LABELS: Record<string, string> = {
  scoring: 'Скоринг заявки',
  approved: 'Одобрено',
  rejected: 'Отказано',
  issued: 'Кредит выдан',
};

const StatusPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [status, setStatus] = useState('scoring');
  const [app, setApp] = useState<any>(null);

  useEffect(() => {
    if (typeof id !== 'string') return;
    const a = getApplicationById(id);
    setApp(a);
    setStatus(a?.status || 'scoring');
    // Имитация скоринга и смены статуса
    if (a?.status === 'scoring') {
      setTimeout(() => {
        const newStatus = Math.random() > 0.2 ? 'approved' : 'rejected';
        updateApplicationStatus(id, newStatus as any);
        setStatus(newStatus);
      }, 3000);
    }
  }, [id]);

  if (!app) return <Box p={4}><Typography>Заявка не найдена</Typography></Box>;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" mb={2}>Статус заявки</Typography>
      <Stack spacing={2}>
        <Typography>Клиент: <b>{app.clientName}</b></Typography>
        <Typography>Продукт: <b>{app.product === 'mortgage' ? 'Ипотека' : 'Автокредит'}</b></Typography>
        <Typography>Статус: <b>{STATUS_LABELS[status]}</b></Typography>
        {status === 'scoring' && <CircularProgress color="primary" />}
        {status === 'approved' && <Alert severity="success">Ваша заявка одобрена!</Alert>}
        {status === 'rejected' && <Alert severity="error">К сожалению, заявка отклонена</Alert>}
        <Button variant="outlined" onClick={() => router.push('/dashboard')}>В дашборд</Button>
      </Stack>
    </Box>
  );
};

export default StatusPage; 