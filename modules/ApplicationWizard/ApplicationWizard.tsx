import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Stepper, Step, StepLabel, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductStep from './steps/ProductStep';
import CalculatorStep from './steps/CalculatorStep';
import PersonalDataStep from './steps/PersonalDataStep';
import DocsStep from './steps/DocsStep';
import ReviewStep from './steps/ReviewStep';
import ProgressBar from '../../components/UI/ProgressBar';
import { getStorage, setStorage } from '../../utils/storage';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const STEPS = ['product', 'calculator', 'personal', 'docs', 'review'];

type FormData = {
  product?: 'mortgage' | 'autoloan';
  calculator?: { amount: number; term: number; payment: number };
  personal?: { name: string; phone: string; email: string; passport: string };
  docs?: { passportFile?: File | null; snilsFile?: File | null };
};

const STORAGE_KEY = 'application_draft';

const MotionPaper = motion(Paper);

const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiStepLabel-root': {
    cursor: 'pointer',
  },
  '& .MuiStepLabel-label': {
    fontSize: '0.85rem',
  }
}));

const NavigationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3)
}));

const ApplicationWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(getStorage<FormData>(STORAGE_KEY, {}));
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  
  const stepNames = [
    t('application.product', 'Продукт'),
    t('application.calcParams', 'Параметры кредита'),
    t('application.personalData', 'Личные данные'),
    t('application.documents', 'Документы'),
    t('application.review', 'Проверка заявки')
  ];

  useEffect(() => {
    setStorage(STORAGE_KEY, form);
  }, [form]);

  // Навигация по шагам
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  const goToStep = (idx: number) => {
    // Разрешаем переход только на шаги, для которых есть данные,
    // или на следующий шаг после последнего заполненного
    if (idx <= getLastCompletedStep() + 1) {
      setStep(idx);
    }
  };

  // Получить последний заполненный шаг
  const getLastCompletedStep = () => {
    if (form.docs) return 3;
    if (form.personal) return 2;
    if (form.calculator) return 1;
    if (form.product) return 0;
    return -1;
  }

  // Возврат на главную страницу
  const goToHome = () => {
    if (form.product || form.calculator || form.personal || form.docs) {
      if (confirm(t('application.confirmExit', 'Вы уверены, что хотите вернуться на главную? Данные заявки будут сохранены'))) {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 700, 
        mx: 'auto', 
        mt: { xs: 2, sm: 6 }, 
        px: { xs: 2, sm: 0 } 
      }}
    >
      <MotionPaper 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2, 
          boxShadow: 3,
          position: 'relative' 
        }}
      >
        <NavigationHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={t('common.home', 'Главная')}>
              <IconButton 
                color="primary" 
                onClick={goToHome}
                sx={{ mr: 1 }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            {step > 0 && (
              <Tooltip title={t('common.back', 'Назад')}>
                <IconButton onClick={back}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Typography 
            variant="h5" 
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('application.application', 'Заявка на кредит')}
          </Typography>
          <Box sx={{ width: 48 }} /> {/* Для центрирования заголовка */}
        </NavigationHeader>

        <StyledStepper activeStep={step} alternativeLabel>
          {stepNames.map((label, index) => (
            <Step key={label} completed={index <= getLastCompletedStep()}>
              <StepLabel onClick={() => goToStep(index)}>{label}</StepLabel>
            </Step>
          ))}
        </StyledStepper>

        <ProgressBar 
          value={((step + 1) / STEPS.length) * 100} 
          label={`${t('application.step', 'Шаг')} ${step + 1} ${t('application.of', 'из')} ${STEPS.length}`} 
        />
        
        <Box sx={{ minHeight: 300, mt: 3 }}>
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
        </Box>
        
        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          justifyContent: 'space-between',
          borderTop: `1px solid ${theme.palette.divider}`,
          pt: 2
        }}>
          <Button
            variant="outlined"
            onClick={goToHome}
            startIcon={<HomeIcon />}
          >
            {t('common.home', 'На главную')}
          </Button>
          
          {step < STEPS.length - 1 && step > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={next}
            >
              {t('common.next', 'Далее')}
            </Button>
          )}
        </Box>
      </MotionPaper>
    </Box>
  );
};

export default ApplicationWizard; 