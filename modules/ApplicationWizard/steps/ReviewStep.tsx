import React from 'react';
import { Box, Typography, Button, Stack, Avatar } from '@mui/material';
import { addApplication } from '../../../api-mock';

interface ReviewStepProps {
  form: any;
  onBack: () => void;
}

const fileToUrl = (file?: File | null) => (file ? URL.createObjectURL(file) : undefined);

const ReviewStep: React.FC<ReviewStepProps> = ({ form, onBack }) => {
  const handleSubmit = () => {
    // Генерируем id и сохраняем заявку в мок-API
    const id = Date.now().toString();
    addApplication({
      id,
      clientName: form.personal?.name || '',
      product: form.product,
      status: 'scoring',
      scenario: 'ideal', // для демо можно брать из контекста
      createdAt: new Date().toISOString(),
    });
    localStorage.removeItem('application_draft');
    window.location.href = `/application/status?id=${id}`;
  };

  return (
    <Box>
      <Typography mb={2}>Проверьте данные перед отправкой</Typography>
      <Stack spacing={2}>
        <Typography>Продукт: <b>{form.product === 'mortgage' ? 'Ипотека' : 'Автокредит'}</b></Typography>
        <Typography>Сумма: <b>{form.calculator?.amount?.toLocaleString()} ₽</b></Typography>
        <Typography>Срок: <b>{form.calculator?.term} мес.</b></Typography>
        <Typography>Платёж: <b>{form.calculator?.payment?.toLocaleString()} ₽</b></Typography>
        <Typography>ФИО: <b>{form.personal?.name}</b></Typography>
        <Typography>Телефон: <b>{form.personal?.phone}</b></Typography>
        <Typography>Email: <b>{form.personal?.email}</b></Typography>
        <Typography>Паспорт: <b>{form.personal?.passport}</b></Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>Паспорт:</Typography>
          {form.docs?.passportFile && <Avatar src={fileToUrl(form.docs.passportFile)} variant="rounded" sx={{ width: 56, height: 56 }} />}
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>СНИЛС:</Typography>
          {form.docs?.snilsFile && <Avatar src={fileToUrl(form.docs.snilsFile)} variant="rounded" sx={{ width: 56, height: 56 }} />}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" onClick={onBack}>Назад</Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>Отправить заявку</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewStep; 