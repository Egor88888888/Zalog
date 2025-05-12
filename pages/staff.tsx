import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Stack, Chip, Alert, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MainLayout from '../components/Layout/MainLayout';
import SystemArchitecture from '../components/ProcessVisualization/SystemArchitecture';
import { getApplications } from '../api-mock';

const MotionCard = motion(Card);

const StaffDashboard: React.FC = () => {
  const router = useRouter();
  const applications = getApplications();
  
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
      color: '#e3f2fd',
      tooltip: 'Заявки, ожидающие проверки и принятия решения. Нажмите для просмотра списка.'
    },
    {
      title: 'Одобренные заявки',
      count: approvedApplications,
      icon: <AccountBalanceIcon fontSize="large" color="success" />,
      action: 'Перейти к выдаче',
      path: '/staff/applications',
      color: '#e8f5e9',
      tooltip: 'Заявки, по которым принято положительное решение. Нажмите для перехода к процессу выдачи кредита.'
    },
    {
      title: 'Выданные кредиты',
      count: issuedApplications,
      icon: <PeopleAltIcon fontSize="large" color="secondary" />,
      action: 'Подробная статистика',
      path: '/staff/statistics',
      color: '#f3e5f5',
      tooltip: 'Кредиты, выданные клиентам. Нажмите для просмотра подробной информации.'
    },
    {
      title: 'Общая статистика',
      count: applications.length,
      icon: <BarChartIcon fontSize="large" color="warning" />,
      action: 'Аналитика',
      path: '/staff/analytics',
      color: '#fff3e0',
      tooltip: 'Просмотр статистики по всем заявкам, включая распределение по статусам и типам кредитов.'
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

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
          Панель управления сотрудника
        </Typography>
        <Tooltip title="Здесь вы можете управлять заявками клиентов, просматривать статистику и анализировать работу системы">
          <IconButton size="small" color="primary">
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body1">
          <strong>Руководство по работе:</strong> На этой странице вы можете увидеть общую статистику по заявкам,
          последние поступившие заявки и интерактивную схему архитектуры системы. 
          Используйте карточки для навигации к соответствующим разделам системы.
        </Typography>
      </Alert>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Tooltip title={card.tooltip} placement="top">
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
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack 
                    direction="row" 
                    spacing={2} 
                    sx={{ mb: 2, alignItems: 'center' }}
                  >
                    {card.icon}
                    <Typography variant="h5" component="div">
                      {card.count}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    {card.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => router.push(card.path)}
                  >
                    {card.action}
                  </Button>
                </CardActions>
              </MotionCard>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
            Последние заявки
          </Typography>
          <Tooltip title="Нажмите на карточку заявки, чтобы перейти к детальному просмотру и обработке">
            <IconButton size="small" color="primary">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Grid container spacing={2} mb={2}>
          {applications.slice(0, 4).map((app) => (
            <Grid item xs={12} sm={6} md={3} key={app.id}>
              <MotionCard 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/staff/applications/${app.id}`)}
              >
                <CardContent>
                  <Typography variant="subtitle1" noWrap>{app.clientName}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip 
                      label={app.product === 'mortgage' ? 'Ипотека' : 'Автокредит'} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={app.status} 
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
        <Button 
          variant="outlined" 
          onClick={() => router.push('/staff/applications')}
        >
          Все заявки
        </Button>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
            Архитектура системы
          </Typography>
          <Tooltip title="Интерактивная схема показывает архитектуру микросервисов платформы и потоки данных между ними">
            <IconButton size="small" color="primary">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Интерактивная визуализация архитектуры системы. Нажмите на любой микросервис, чтобы увидеть его функции и связи с другими компонентами платформы.
        </Typography>
        <SystemArchitecture />
      </Box>
    </MainLayout>
  );
};

export default StaffDashboard; 