import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';

interface CalculatorStepProps {
  value?: { amount: number; term: number; payment: number };
  onChange: (data: { amount: number; term: number; payment: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

const calcPayment = (amount: number, term: number) => {
  // Простой аннуитетный расчет (без процентов для демо)
  if (!amount || !term) return 0;
  return Math.round(amount / term);
};

const CalculatorStep: React.FC<CalculatorStepProps> = ({ value, onChange, onNext, onBack }) => {
  const [amount, setAmount] = useState(value?.amount || 1000000);
  const [term, setTerm] = useState(value?.term || 120);
  const [payment, setPayment] = useState(value?.payment || calcPayment(amount, term));

  useEffect(() => {
    const p = calcPayment(amount, term);
    setPayment(p);
    onChange({ amount, term, payment: p });
    // eslint-disable-next-line
  }, [amount, term]);

  return (
    <Box>
      <Typography mb={2}>Калькулятор кредита</Typography>
      <Stack spacing={2} direction="column">
        <TextField
          label="Сумма кредита"
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          inputProps={{ min: 100000, step: 10000 }}
        />
        <TextField
          label="Срок (мес.)"
          type="number"
          value={term}
          onChange={e => setTerm(Number(e.target.value))}
          inputProps={{ min: 12, max: 360, step: 1 }}
        />
        <Typography>Ежемесячный платёж: <b>{payment.toLocaleString()} ₽</b></Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" onClick={onBack}>Назад</Button>
          <Button variant="contained" onClick={onNext} disabled={!amount || !term}>Далее</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CalculatorStep; 