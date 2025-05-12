import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';

interface PersonalData {
  name: string;
  phone: string;
  email: string;
  passport: string;
}

interface PersonalDataStepProps {
  value?: PersonalData;
  onChange: (data: PersonalData) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({ value, onChange, onNext, onBack }) => {
  const [data, setData] = useState<PersonalData>(
    value || { name: '', phone: '', email: '', passport: '' }
  );
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    onChange(data);
    // eslint-disable-next-line
  }, [data]);

  const isValid =
    data.name.length > 2 &&
    /^\+?\d{10,15}$/.test(data.phone) &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email) &&
    /^\d{4}\s?\d{6}$/.test(data.passport);

  return (
    <Box>
      <Typography mb={2}>Персональные данные</Typography>
      <Stack spacing={2} direction="column">
        <TextField
          label="ФИО"
          value={data.name}
          onChange={e => setData(d => ({ ...d, name: e.target.value }))}
          error={touched && data.name.length <= 2}
          helperText={touched && data.name.length <= 2 ? 'Введите ФИО полностью' : ''}
        />
        <TextField
          label="Телефон"
          value={data.phone}
          onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
          error={touched && !/^\+?\d{10,15}$/.test(data.phone)}
          helperText={touched && !/^\+?\d{10,15}$/.test(data.phone) ? 'Введите телефон в формате +79991234567' : ''}
        />
        <TextField
          label="Email"
          value={data.email}
          onChange={e => setData(d => ({ ...d, email: e.target.value }))}
          error={touched && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)}
          helperText={touched && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email) ? 'Введите корректный email' : ''}
        />
        <TextField
          label="Паспорт (серия и номер)"
          value={data.passport}
          onChange={e => setData(d => ({ ...d, passport: e.target.value }))}
          error={touched && !/^\d{4}\s?\d{6}$/.test(data.passport)}
          helperText={touched && !/^\d{4}\s?\d{6}$/.test(data.passport) ? 'Введите 10 цифр без пробелов или с пробелом' : ''}
        />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" onClick={onBack}>Назад</Button>
          <Button
            variant="contained"
            onClick={() => {
              setTouched(true);
              if (isValid) onNext();
            }}
            disabled={!isValid}
          >
            Далее
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PersonalDataStep; 