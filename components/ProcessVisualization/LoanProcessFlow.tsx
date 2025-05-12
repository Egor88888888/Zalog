import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Button,
  Divider,
  Chip,
  Stack,
  CircularProgress,
  Grid,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import WarningIcon from '@mui/icons-material/Warning';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import CalculateIcon from '@mui/icons-material/Calculate';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// Стилизованные компоненты для визуализации
const DataPacket = styled(motion.div)(({ theme }) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  zIndex: 10
}));

const DataFlow = styled(motion.div)(({ theme }) => ({
  height: 2,
  backgroundColor: theme.palette.divider,
  position: 'relative',
  margin: '10px 0'
}));

const ServiceBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'relative',
  borderRadius: theme.spacing(1),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease'
}));

// Типы статусов заявки
type LoanStatus = 'draft' | 'submitted' | 'scoring' | 'underwriting' | 'approved' | 'rejected' | 'issued';

interface LoanProcessFlowProps {
  currentStatus: LoanStatus;
  animate?: boolean;
}

const PROCESS_STEPS = [
  {
    label: 'Отправка заявки',
    status: 'submitted',
    description: 'Клиент заполняет и отправляет заявку на рассмотрение',
    services: ['Клиентский интерфейс', 'Сервис заявок', 'Валидация данных'],
    data: [
      { from: 'Клиент', to: 'Сервис заявок', description: 'Персональные данные' },
      { from: 'Сервис заявок', to: 'Валидация', description: 'Проверка полноты данных' },
      { from: 'Валидация', to: 'БД заявок', description: 'Сохранение заявки' }
    ]
  },
  {
    label: 'Скоринг',
    status: 'scoring',
    description: 'Автоматическая оценка кредитоспособности заемщика',
    services: ['Сервис заявок', 'Скоринговая система', 'Кредитное бюро'],
    data: [
      { from: 'Сервис заявок', to: 'Скоринг', description: 'Запрос оценки' },
      { from: 'Скоринг', to: 'Кредитное бюро', description: 'Запрос кредитной истории' },
      { from: 'Скоринг', to: 'Сервис заявок', description: 'Результат скоринга' }
    ]
  },
  {
    label: 'Андеррайтинг',
    status: 'underwriting',
    description: 'Углубленный анализ заявки сотрудником банка',
    services: ['Сервис заявок', 'Интерфейс андеррайтера', 'Сервис документов'],
    data: [
      { from: 'Сервис заявок', to: 'Интерфейс андеррайтера', description: 'Передача заявки' },
      { from: 'Интерфейс андеррайтера', to: 'Сервис документов', description: 'Запрос документов' },
      { from: 'Интерфейс андеррайтера', to: 'Сервис заявок', description: 'Решение по заявке' }
    ]
  },
  {
    label: 'Решение по заявке',
    status: ['approved', 'rejected'],
    description: 'Формирование решения о выдаче кредита',
    services: ['Сервис заявок', 'Генератор документов', 'Сервис уведомлений'],
    data: [
      { from: 'Сервис заявок', to: 'Генератор документов', description: 'Формирование решения' },
      { from: 'Генератор документов', to: 'Сервис уведомлений', description: 'Отправка уведомления' },
      { from: 'Сервис уведомлений', to: 'Клиент', description: 'СМС и Email оповещение' }
    ]
  },
  {
    label: 'Выдача кредита',
    status: 'issued',
    description: 'Подготовка и подписание кредитного договора',
    services: ['Сервис заявок', 'Кредитный договор', 'Банковские системы', 'CRM'],
    data: [
      { from: 'Сервис заявок', to: 'Кредитный договор', description: 'Формирование договора' },
      { from: 'Кредитный договор', to: 'Банковские системы', description: 'Открытие счета' },
      { from: 'Банковские системы', to: 'CRM', description: 'Регистрация клиента' }
    ]
  }
];

const getStepStatus = (stepStatus: string | string[], currentStatus: string) => {
  if (Array.isArray(stepStatus)) {
    return stepStatus.includes(currentStatus) ? 'current' : 
           stepStatus.some(s => PROCESS_STEPS.findIndex(step => 
             (typeof step.status === 'string' ? step.status : step.status[0]) === s
           ) > PROCESS_STEPS.findIndex(step => 
             (typeof step.status === 'string' ? step.status : step.status[0]) === currentStatus
           )) ? 'upcoming' : 'completed';
  }
  
  return stepStatus === currentStatus ? 'current' : 
         PROCESS_STEPS.findIndex(step => 
           (typeof step.status === 'string' ? step.status : step.status[0]) === stepStatus
         ) > PROCESS_STEPS.findIndex(step => 
           (typeof step.status === 'string' ? step.status : step.status[0]) === currentStatus
         ) ? 'upcoming' : 'completed';
};

const LoanProcessFlow: React.FC<LoanProcessFlowProps> = ({ currentStatus, animate = true }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeDataFlow, setActiveDataFlow] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(animate);
  const theme = useTheme();

  // Определяем активный шаг на основе текущего статуса
  useEffect(() => {
    const stepIndex = PROCESS_STEPS.findIndex(step => {
      if (Array.isArray(step.status)) {
        return step.status.includes(currentStatus);
      }
      return step.status === currentStatus;
    });
    
    if (stepIndex >= 0) {
      setActiveStep(stepIndex);
    }
  }, [currentStatus]);

  // Анимация движения данных, если включена
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      const step = PROCESS_STEPS[activeStep];
      if (step && step.data) {
        setActiveDataFlow(prev => {
          if (prev === null || prev >= step.data.length - 1) return 0;
          return prev + 1;
        });
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [activeStep, isAnimating]);

  // Обработчик для демонстрации следующего шага процесса
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      return nextStep < PROCESS_STEPS.length ? nextStep : prevActiveStep;
    });
  };

  // Обработчик для демонстрации предыдущего шага процесса
  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const prevStep = prevActiveStep - 1;
      return prevStep >= 0 ? prevStep : prevActiveStep;
    });
  };

  // Получение иконки для сервиса на основе его названия
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('Клиент')) return <PersonIcon color="primary" />;
    if (serviceName.includes('Заявок') || serviceName.includes('заявок')) return <DescriptionIcon color="info" />;
    if (serviceName.includes('Скоринг')) return <CalculateIcon color="warning" />;
    if (serviceName.includes('Документ')) return <DescriptionIcon color="secondary" />;
    if (serviceName.includes('Банк')) return <AccountBalanceIcon color="success" />;
    if (serviceName.includes('Валидация')) return <VerifiedUserIcon color="info" />;
    if (serviceName.includes('Бюро')) return <StorageIcon color="warning" />;
    if (serviceName.includes('CRM')) return <PeopleIcon color="secondary" />;
    if (serviceName.includes('Уведомлен')) return <NotificationsIcon color="error" />;
    return <SettingsIcon color="action" />;
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Процесс обработки заявки
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Визуализация процесса рассмотрения заявки на кредит. Текущий этап: <Chip 
                size="small" 
                label={currentStatus === 'submitted' ? 'Отправлена' :
                       currentStatus === 'scoring' ? 'Скоринг' :
                       currentStatus === 'underwriting' ? 'Андеррайтинг' :
                       currentStatus === 'approved' ? 'Одобрена' :
                       currentStatus === 'rejected' ? 'Отклонена' :
                       currentStatus === 'issued' ? 'Выдан кредит' : currentStatus} 
                color={
                  currentStatus === 'approved' ? 'success' :
                  currentStatus === 'rejected' ? 'error' :
                  currentStatus === 'issued' ? 'secondary' : 'primary'
                }
              />
            </Typography>
            
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 3 }}>
              {PROCESS_STEPS.map((step, index) => {
                const stepStatus = getStepStatus(step.status, currentStatus);
                return (
                  <Step key={index}>
                    <StepLabel
                      StepIconProps={{
                        icon: stepStatus === 'completed' ? <CheckCircleIcon color="success" /> :
                               stepStatus === 'current' ? <PendingIcon color="primary" /> :
                               stepStatus === 'upcoming' ? 
                                (currentStatus === 'rejected' ? <ErrorIcon color="error" /> : index + 1) : 
                                index + 1
                      }}
                    >
                      <Typography variant="subtitle2">{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                      <Box sx={{ mb: 2, mt: 1 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={index === PROCESS_STEPS.length - 1}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          Следующий шаг
                        </Button>
                        <Button
                          onClick={handleBack}
                          disabled={index === 0}
                          size="small"
                        >
                          Назад
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
            
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                size="small"
                startIcon={isAnimating ? <PauseIcon /> : <PlayArrowIcon />}
                onClick={() => setIsAnimating(!isAnimating)}
              >
                {isAnimating ? 'Пауза' : 'Запуск'} анимации
              </Button>
              <Chip
                label={currentStatus === 'rejected' ? 'Заявка отклонена' : 'В процессе'}
                color={currentStatus === 'rejected' ? 'error' : 'info'}
                size="small"
                icon={currentStatus === 'rejected' ? <ErrorIcon /> : <PendingIcon />}
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Визуализация данных
            </Typography>
            
            <Box sx={{ position: 'relative', mt: 2, minHeight: 300 }}>
              {PROCESS_STEPS[activeStep]?.services && (
                <Grid container spacing={2}>
                  {PROCESS_STEPS[activeStep].services.map((service, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                      <ServiceBox 
                        elevation={2}
                        component={motion.div}
                        whileHover={{ scale: 1.03 }}
                        sx={{ 
                          borderTop: `3px solid ${
                            idx === 0 ? theme.palette.primary.main :
                            idx === 1 ? theme.palette.info.main :
                            idx === 2 ? theme.palette.warning.main :
                            theme.palette.success.main
                          }`,
                          bgcolor: activeDataFlow !== null && 
                                  (PROCESS_STEPS[activeStep].data[activeDataFlow].from === service ||
                                   PROCESS_STEPS[activeStep].data[activeDataFlow].to === service) ? 
                                   'rgba(25, 118, 210, 0.08)' : 'background.paper'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {getServiceIcon(service)}
                          <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 'medium' }}>
                            {service}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          {idx === 0 ? 'Источник данных' : 
                           idx === PROCESS_STEPS[activeStep].services.length - 1 ? 'Получатель результата' : 
                           'Обработка данных'}
                        </Typography>
                        
                        {activeDataFlow !== null && 
                         PROCESS_STEPS[activeStep].data[activeDataFlow].from === service && (
                          <Chip 
                            label="Отправка данных"
                            size="small"
                            color="primary"
                            sx={{ mt: 1, fontSize: '0.7rem' }}
                          />
                        )}
                        
                        {activeDataFlow !== null && 
                         PROCESS_STEPS[activeStep].data[activeDataFlow].to === service && (
                          <Chip 
                            label="Получение данных"
                            size="small"
                            color="success"
                            sx={{ mt: 1, fontSize: '0.7rem' }}
                          />
                        )}
                      </ServiceBox>
                    </Grid>
                  ))}
                </Grid>
              )}
              
              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Поток данных:
                </Typography>
                
                {PROCESS_STEPS[activeStep]?.data.map((flow, idx) => (
                  <Box key={idx} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mt: 1,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: activeDataFlow === idx ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
                  }}>
                    <Chip 
                      label={flow.from} 
                      size="small" 
                      sx={{ minWidth: 100 }}
                      color={activeDataFlow === idx ? 'primary' : 'default'}
                    />
                    
                    <Box sx={{ position: 'relative', mx: 2, flexGrow: 1 }}>
                      <DataFlow 
                        initial={{ backgroundColor: theme.palette.divider }}
                        animate={activeDataFlow === idx ? {
                          backgroundColor: [
                            theme.palette.primary.main,
                            theme.palette.primary.light,
                            theme.palette.primary.main
                          ]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      
                      {activeDataFlow === idx && (
                        <DataPacket
                          initial={{ left: 0 }}
                          animate={{ left: '100%' }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      
                      <Typography variant="caption" sx={{ 
                        position: 'absolute',
                        top: -18,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: 'background.paper',
                        px: 1,
                        fontSize: '0.7rem',
                        color: activeDataFlow === idx ? 'primary.main' : 'text.secondary'
                      }}>
                        {flow.description}
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={flow.to} 
                      size="small" 
                      sx={{ minWidth: 100 }}
                      color={activeDataFlow === idx ? 'success' : 'default'}
                    />
                  </Box>
                ))}
                
                {isAnimating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      Анимация потока данных...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanProcessFlow; 