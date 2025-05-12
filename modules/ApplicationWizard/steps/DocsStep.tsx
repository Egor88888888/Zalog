import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Input, Avatar } from '@mui/material';

interface DocsData {
  passportFile?: File | null;
  snilsFile?: File | null;
}

interface DocsStepProps {
  value?: DocsData;
  onChange: (data: DocsData) => void;
  onNext: () => void;
  onBack: () => void;
}

const fileToUrl = (file?: File | null) => (file ? URL.createObjectURL(file) : undefined);

const DocsStep: React.FC<DocsStepProps> = ({ value, onChange, onNext, onBack }) => {
  const [data, setData] = useState<DocsData>(value || {});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    onChange(data);
    // eslint-disable-next-line
  }, [data]);

  const isValid = !!data.passportFile && !!data.snilsFile;

  return (
    <Box>
      <Typography mb={2}>Загрузка документов</Typography>
      <Stack spacing={2} direction="column">
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" component="label">
            Паспорт
            <Input type="file" inputProps={{ accept: 'image/*,.pdf' }} sx={{ display: 'none' }} onChange={e => {
              const file = e.target.files?.[0] || null;
              setData(d => ({ ...d, passportFile: file }));
            }} />
          </Button>
          {data.passportFile && <Avatar src={fileToUrl(data.passportFile)} variant="rounded" sx={{ width: 56, height: 56 }} />}
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" component="label">
            СНИЛС
            <Input type="file" inputProps={{ accept: 'image/*,.pdf' }} sx={{ display: 'none' }} onChange={e => {
              const file = e.target.files?.[0] || null;
              setData(d => ({ ...d, snilsFile: file }));
            }} />
          </Button>
          {data.snilsFile && <Avatar src={fileToUrl(data.snilsFile)} variant="rounded" sx={{ width: 56, height: 56 }} />}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" onClick={onBack}>Назад</Button>
          <Button variant="contained" onClick={() => { setTouched(true); if (isValid) onNext(); }} disabled={!isValid}>Далее</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DocsStep; 