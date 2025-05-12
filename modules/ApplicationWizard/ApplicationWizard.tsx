import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProductStep from './steps/ProductStep';
import CalculatorStep from './steps/CalculatorStep';
import PersonalDataStep from './steps/PersonalDataStep';
import DocsStep from './steps/DocsStep';
import ReviewStep from './steps/ReviewStep';
import ProgressBar from '../../components/UI/ProgressBar';
import { getStorage, setStorage } from '../../utils/storage';

const STEPS = ['product', 'calculator', 'personal', 'docs', 'review'];

type FormData = {
  product?: 'mortgage' | 'autoloan';
  calculator?: { amount: number; term: number; payment: number };
  personal?: { name: string; phone: string; email: string; passport: string };
  docs?: { passportFile?: File | null; snilsFile?: File | null };
};

const STORAGE_KEY = 'application_draft';

const ApplicationWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(getStorage<FormData>(STORAGE_KEY, {}));

  useEffect(() => {
    setStorage(STORAGE_KEY, form);
  }, [form]);

  // Навигация по шагам
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" mb={2}>Заявка на кредит</Typography>
        <ProgressBar value={((step + 1) / STEPS.length) * 100} label={`Шаг ${step + 1} из ${STEPS.length}`} />
        {step === 0 && (
          <ProductStep
            value={form.product}
            onSelect={product => {
              setForm(prev => ({ ...prev, product }));
              next();
            }}
          />
        )}
        {step === 1 && (
          <CalculatorStep
            value={form.calculator}
            onChange={data => setForm(prev => ({ ...prev, calculator: data }))}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 2 && (
          <PersonalDataStep
            value={form.personal}
            onChange={data => setForm(prev => ({ ...prev, personal: data }))}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <DocsStep
            value={form.docs}
            onChange={data => setForm(prev => ({ ...prev, docs: data }))}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <ReviewStep
            form={form}
            onBack={back}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ApplicationWizard; 