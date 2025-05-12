import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Stack, 
  Chip, 
  Tabs, 
  Tab, 
  Paper, 
  CircularProgress,
  Alert,
  Divider,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MainLayout from '../../components/Layout/MainLayout';
import SystemArchitecture from '../../components/ProcessVisualization/SystemArchitecture';
import LoanProcessFlow from '../../components/ProcessVisualization/LoanProcessFlow';
import { getApplications } from '../../api-mock';
import { styled } from '@mui/material/styles';

// Расширенная визуализация архитектуры с анимацией в реальном времени
const BackendVisualizer = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [play, setPlay] = useState(false);
  const theme = useTheme();

  // Имитация активности при загрузке страницы
  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        const services = ['auth', 'application', 'scoring', 'document', 'notification', 'reporting'];
        const randomService = services[Math.floor(Math.random() * services.length)];
        setActiveService(randomService);
        
        // Создаем случайные соединения
        const connections = [];
        if (randomService === 'application') {
          connections.push('application-scoring', 'application-document');
        } else if (randomService === 'scoring') {
          connections.push('scoring-application');
        } else if (randomService === 'auth') {
          connections.push('auth-application');
        }
        
        setActiveConnections(connections);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [play]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Микросервисная архитектура (реальное время)</Typography>
        <Button 
          variant="outlined" 
          startIcon={<PlayArrowIcon />} 
          onClick={() => setPlay(!play)}
          color={play ? "error" : "primary"}
        >
          {play ? "Остановить" : "Запустить"} визуализацию
        </Button>
      </Box>
      
      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Демонстрация движения данных и взаимодействия микросервисов в реальном времени. При обработке заявок данные последовательно обрабатываются разными сервисами.
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 2, bgcolor: theme.palette.grey[100], borderRadius: 1, height: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>Активность сервисов:</Typography>
              <Stack spacing={1}>
                <Chip 
                  label="Auth Service" 
                  size="small" 
                  color={activeService === 'auth' ? 'success' : 'default'} 
                  variant={activeService === 'auth' ? 'filled' : 'outlined'}
                />
                <Chip 
                  label="Application Service" 
                  size="small" 
                  color={activeService === 'application' ? 'success' : 'default'} 
                  variant={activeService === 'application' ? 'filled' : 'outlined'}
                />
                <Chip 
                  label="Scoring Service" 
                  size="small" 
                  color={activeService === 'scoring' ? 'success' : 'default'} 
                  variant={activeService === 'scoring' ? 'filled' : 'outlined'}
                />
                <Chip 
                  label="Document Service" 
                  size="small" 
                  color={activeService === 'document' ? 'success' : 'default'} 
                  variant={activeService === 'document' ? 'filled' : 'outlined'}
                />
              </Stack>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <SystemArchitecture activeScenario={activeService || undefined} />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, bgcolor: theme.palette.grey[100], borderRadius: 1, height: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>Логи системы:</Typography>
              <Box sx={{ 
                height: 200, 
                overflowY: 'auto', 
                p: 1, 
                bgcolor: 'black', 
                color: 'lightgreen',
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                borderRadius: 1
              }}>
                {play && (
                  <>
                    <Typography variant="caption" display="block" sx={{ color: 'lightgreen' }}>
                      [INFO] 10:32:14 - Начало обработки заявки #A12345
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'lightgreen' }}>
                      [INFO] 10:32:15 - Auth Service: проверка пользователя
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'lightgreen' }}>
                      [INFO] 10:32:16 - Application Service: создание заявки
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'yellow' }}>
                      [WARN] 10:32:18 - Document Service: ожидание загрузки документов
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'lightgreen' }}>
                      [INFO] 10:32:20 - Application Service: запрос в скоринг
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'lightgreen' }}>
                      [INFO] 10:32:25 - Scoring Service: расчет скорингового балла
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: activeService === 'scoring' ? 'cyan' : 'lightgreen' }}>
                      [INFO] 10:32:30 - Scoring Service: балл рассчитан - 87 (низкий риск)
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'lightgreen' }}>
                      [INFO] 10:32:32 - Application Service: обновление статуса
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'lightgreen' }}>
                      [INFO] 10:32:35 - Notification Service: отправка уведомления
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// Компонент визуализации процесса обработки заявок
const ProcessVisualizer = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('submitted');
  
  const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Визуализация процесса кредитования</Typography>
      
      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Tabs 
          value={selectedStatus} 
          onChange={handleStatusChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab value="submitted" label="Отправлена" />
          <Tab value="scoring" label="Скоринг" />
          <Tab value="underwriting" label="Андеррайтинг" />
          <Tab value="approved" label="Одобрена" />
          <Tab value="rejected" label="Отклонена" />
          <Tab value="issued" label="Выдан кредит" />
        </Tabs>
        
        <LoanProcessFlow currentStatus={selectedStatus as any} />
      </Paper>
    </Box>
  );
};

const MotionCard = motion(Card);

const StaffDashboard: React.FC = () => {
  const router = useRouter();
  const applications = getApplications();
  const [activeTab, setActiveTab] = useState(0);
  
  // Статистика по заявкам
  const pendingApplications = applications.filter(app => 
    ['submitted', 'scoring', 'underwriting'].includes(app.status)
  ).length;
  
  const approvedApplications = applications.filter(app => 
    app.status === 'approved'
  ).length;
  
  const issuedApplications = applications.filter(app => 
    app.status === 'issued'
  ).length;
  
  // Карточки с обзором статистики
  const dashboardCards = [
    {
      title: 'Заявки на рассмотрении',
      count: pendingApplications,
      icon: <AssignmentIcon fontSize="large" color="primary" />,
      action: 'Просмотреть заявки',
      path: '/staff/applications',
      color: '#e3f2fd'
    },
    {
      title: 'Одобренные заявки',
      count: approvedApplications,
      icon: <AccountBalanceIcon fontSize="large" color="success" />,
      action: 'Перейти к выдаче',
      path: '/staff/applications',
      color: '#e8f5e9'
    },
    {
      title: 'Выданные кредиты',
      count: issuedApplications,
      icon: <PeopleAltIcon fontSize="large" color="secondary" />,
      action: 'Подробная статистика',
      path: '/staff/statistics',
      color: '#f3e5f5'
    },
    {
      title: 'Мониторинг системы',
      count: '5 сервисов',
      icon: <SettingsIcon fontSize="large" color="warning" />,
      action: 'Открыть мониторинг',
      path: '/staff/monitoring',
      color: '#fff3e0'
    }
  ];
  
  // Анимация для карточек
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      } 
    })
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Панель управления сотрудника</Typography>
        <Typography variant="body1" color="text.secondary">
          Интерактивная демонстрация процессов обработки заявок и внутренней архитектуры системы
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <MotionCard 
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariants}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: card.color,
                transition: 'transform 0.3s, box-shadow 0.3s',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Stack 
                  direction="row" 
                  spacing={2} 
                  sx={{ mb: 2, alignItems: 'center' }}
                >
                  {card.icon}
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {card.count}
                  </Typography>
                </Stack>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  {card.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={() => router.push(card.path)}
                  fullWidth
                >
                  {card.action}
                </Button>
              </CardActions>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Архитектура системы" icon={<ViewInArIcon />} iconPosition="start" />
          <Tab label="Процесс кредитования" icon={<AssignmentIcon />} iconPosition="start" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="backend"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BackendVisualizer />
              </motion.div>
            )}
            
            {activeTab === 1 && (
              <motion.div
                key="process"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProcessVisualizer />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Paper>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>Последние заявки</Typography>
        <Grid container spacing={2}>
          {applications.slice(0, 4).map((app) => (
            <Grid item xs={12} sm={6} md={3} key={app.id}>
              <MotionCard 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                sx={{ 
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
                onClick={() => router.push(`/staff/applications/${app.id}`)}
              >
                <CardContent>
                  <Typography variant="subtitle1" noWrap fontWeight="medium">{app.clientName}</Typography>
                  <Typography variant="caption" color="text.secondary">ID: {app.id.substring(0, 8)}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip 
                      label={app.product === 'mortgage' ? 'Ипотека' : 'Автокредит'} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={
                        app.status === 'submitted' ? 'Отправлена' :
                        app.status === 'scoring' ? 'Скоринг' :
                        app.status === 'underwriting' ? 'Андеррайтинг' :
                        app.status === 'approved' ? 'Одобрена' :
                        app.status === 'rejected' ? 'Отклонена' :
                        app.status === 'issued' ? 'Выдан' : app.status
                      } 
                      size="small" 
                      color={
                        app.status === 'approved' ? 'success' :
                        app.status === 'rejected' ? 'error' :
                        app.status === 'issued' ? 'secondary' : 'default'
                      } 
                    />
                  </Stack>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => router.push('/staff/applications')}
          >
            Все заявки
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default StaffDashboard; 