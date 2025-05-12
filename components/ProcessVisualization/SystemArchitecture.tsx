import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip, 
  Button, 
  Grid, 
  Tooltip, 
  Card, 
  CardContent,
  IconButton,
  Stack,
  useTheme,
  Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { styled } from '@mui/material/styles';

// Стилизованные компоненты
const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  position: 'relative',
  overflow: 'visible',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease',
  height: '100%'
}));

const Database = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  minHeight: 60,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderRadius: theme.spacing(1),
  background: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`
}));

const DataPath = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  height: 2,
  backgroundColor: theme.palette.divider,
  zIndex: 5
}));

const DataPacket = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  zIndex: 10
}));

interface ServiceType {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  technologies?: string[];
  features?: string[];
}

const services: ServiceType[] = [
  { 
    id: 'auth', 
    name: 'Сервис аутентификации', 
    description: 'Управляет авторизацией и аутентификацией пользователей, ролевой моделью и управлением доступом',
    color: '#4caf50',
    icon: <SecurityIcon fontSize="large" color="success" />,
    technologies: ['JWT', 'OAuth 2.0', 'Spring Security'],
    features: ['Двухфакторная аутентификация', 'Управление ролями', 'Аудит доступа']
  },
  { 
    id: 'application', 
    name: 'Сервис заявок', 
    description: 'Обрабатывает и хранит заявки клиентов, управляет статусами и статистикой',
    color: '#2196f3',
    icon: <DescriptionIcon fontSize="large" color="primary" />,
    technologies: ['Spring Boot', 'PostgreSQL', 'Kafka'],
    features: ['Валидация данных', 'Маршрутизация', 'История изменений']
  },
  { 
    id: 'scoring', 
    name: 'Кредитный скоринг', 
    description: 'Оценивает кредитоспособность клиента и анализирует риски на основе предиктивных моделей',
    color: '#ff9800',
    icon: <AssessmentIcon fontSize="large" color="warning" />,
    technologies: ['Python', 'TensorFlow', 'XGBoost'],
    features: ['ML-модели', 'Скоринговые карты', 'Интеграция с БКИ']
  },
  { 
    id: 'document', 
    name: 'Сервис документов', 
    description: 'Управляет загрузкой, хранением и верификацией документов заявителя',
    color: '#9c27b0',
    icon: <DescriptionIcon fontSize="large" color="secondary" />,
    technologies: ['S3 Storage', 'OCR', 'Spring Boot'],
    features: ['Валидация документов', 'OCR распознавание', 'Проверка подлинности']
  },
  { 
    id: 'notification', 
    name: 'Сервис уведомлений', 
    description: 'Отправляет оповещения пользователям по различным каналам коммуникации',
    color: '#f44336',
    icon: <NotificationsIcon fontSize="large" color="error" />,
    technologies: ['WebSockets', 'SMS Gateway', 'Email'],
    features: ['Шаблоны сообщений', 'Мультиканальность', 'Планирование уведомлений']
  },
  { 
    id: 'reporting', 
    name: 'Сервис отчетности', 
    description: 'Генерирует отчеты, аналитику и статистику по заявкам и кредитам',
    color: '#795548',
    icon: <AssessmentIcon fontSize="large" color="action" />,
    technologies: ['Apache Spark', 'Elasticsearch', 'Grafana'],
    features: ['Бизнес-аналитика', 'Дашборды', 'Экспорт данных']
  }
];

const databases = [
  { 
    id: 'auth_db', 
    name: 'База данных пользователей', 
    serviceId: 'auth',
    type: 'PostgreSQL',
    description: 'Хранит пользователей, роли и токены доступа'
  },
  { 
    id: 'application_db', 
    name: 'База данных заявок', 
    serviceId: 'application',
    type: 'PostgreSQL',
    description: 'Заявки, статусы и история изменений'
  },
  { 
    id: 'scoring_db', 
    name: 'База данных скоринга', 
    serviceId: 'scoring',
    type: 'MongoDB',
    description: 'Скоринговые модели и результаты оценок'
  },
  { 
    id: 'document_db', 
    name: 'Хранилище документов', 
    serviceId: 'document',
    type: 'S3 Storage',
    description: 'Файлы документов и метаданные'
  }
];

// Связи между сервисами
const connections = [
  { from: 'auth', to: 'application', label: 'Валидация пользователя' },
  { from: 'application', to: 'scoring', label: 'Запрос оценки кредитоспособности' },
  { from: 'application', to: 'document', label: 'Запрос и проверка документов' },
  { from: 'scoring', to: 'application', label: 'Результат скоринга и оценка рисков' },
  { from: 'document', to: 'application', label: 'Статус проверки документов' },
  { from: 'application', to: 'notification', label: 'Запрос на отправку уведомлений' },
  { from: 'application', to: 'reporting', label: 'Данные для аналитики и отчетов' }
];

// Шина событий (Event Bus) для микросервисов
const eventTopics = [
  { id: 'user_events', name: 'Пользовательские события', services: ['auth', 'notification'] },
  { id: 'application_events', name: 'События заявок', services: ['application', 'scoring', 'document', 'notification'] },
  { id: 'document_events', name: 'События документов', services: ['document', 'application'] },
  { id: 'notification_events', name: 'События уведомлений', services: ['notification', 'application'] }
];

interface SystemArchitectureProps {
  // Активный сценарий или статус заявки для визуализации
  activeScenario?: string;
  showDetailedView?: boolean;
}

const SystemArchitecture: React.FC<SystemArchitectureProps> = ({ 
  activeScenario,
  showDetailedView = false
}) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [animateFlow, setAnimateFlow] = useState(false);
  const [activeConnection, setActiveConnection] = useState<number | null>(null);
  const [detailedView, setDetailedView] = useState(showDetailedView);
  const [zoomLevel, setZoomLevel] = useState(1);
  const theme = useTheme();
  
  // Управление анимацией потоков данных
  useEffect(() => {
    if (animateFlow) {
      const interval = setInterval(() => {
        setActiveConnection(prev => {
          if (prev === null || prev >= connections.length - 1) return 0;
          return prev + 1;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    } else {
      setActiveConnection(null);
    }
  }, [animateFlow]);
  
  const handleServiceHover = (serviceId: string) => {
    setHoveredService(serviceId);
  };
  
  const handleServiceLeave = () => {
    setHoveredService(null);
  };
  
  const getConnections = (serviceId: string) => {
    return connections.filter(c => c.from === serviceId || c.to === serviceId);
  };
  
  const isActiveConnection = (fromId: string, toId: string) => {
    if (!activeScenario) return false;
    
    // Имитация активности потоков для разных сценариев
    if (activeScenario === 'scoring' && 
        ((fromId === 'application' && toId === 'scoring') || 
         (fromId === 'scoring' && toId === 'application'))) {
      return true;
    }
    
    if (activeScenario === 'submitted' && 
        (fromId === 'auth' && toId === 'application')) {
      return true;
    }
    
    if (activeScenario === 'approved' && 
        (fromId === 'application' && toId === 'notification')) {
      return true;
    }
    
    // Также проверяем активную анимацию
    if (activeConnection !== null) {
      const activeConn = connections[activeConnection];
      return (fromId === activeConn.from && toId === activeConn.to);
    }
    
    return false;
  };
  
  const renderConnectionPath = (connection: any, index: number) => {
    // В реальном проекте здесь были бы конкретные координаты соединений
    // Здесь упрощённая демонстрация
    const isActive = isActiveConnection(connection.from, connection.to) || hoveredService === connection.from || hoveredService === connection.to;
    
    return (
      <Tooltip title={connection.label} key={`${connection.from}-${connection.to}`} arrow>
        <Box sx={{ 
          position: 'relative', 
          height: 20, 
          my: 1, 
          mx: 'auto',
          width: '80%',
          opacity: isActive ? 1 : 0.3,
          '&:hover': {
            opacity: 1
          }
        }}>
          <DataPath
            initial={{ backgroundColor: theme.palette.divider }}
            animate={isActive ? {
              backgroundColor: theme.palette.primary.main
            } : {}}
            style={{ 
              width: '100%',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          
          {isActive && (
            <DataPacket 
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
          
          <Typography variant="caption" sx={{ 
            position: 'absolute',
            top: '-18px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'background.paper',
            px: 1,
            borderRadius: 1,
            fontSize: '0.7rem'
          }}>
            {connection.label}
          </Typography>
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Микросервисная архитектура системы</Typography>
        <Box>
          <IconButton 
            size="small" 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
            sx={{ mr: 1 }}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            sx={{ mr: 1 }}
          >
            <ZoomOutIcon />
          </IconButton>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={animateFlow ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={() => setAnimateFlow(!animateFlow)}
            sx={{ mr: 1 }}
          >
            {animateFlow ? 'Остановить поток' : 'Запустить поток'}
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<InfoIcon />}
            onClick={() => setDetailedView(!detailedView)}
          >
            {detailedView ? 'Упрощенный вид' : 'Подробный вид'}
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ 
        transform: `scale(${zoomLevel})`, 
        transformOrigin: 'top center',
        transition: 'transform 0.3s ease'
      }}>
        {/* Шина событий (Event Bus) */}
        {detailedView && (
          <Box sx={{ mb: 4 }}>
            <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'rgba(25, 118, 210, 0.05)' }}>
              <Typography variant="subtitle1" gutterBottom>
                <CloudIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Шина событий (Event Bus)
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Асинхронный обмен сообщениями между микросервисами через Apache Kafka
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {eventTopics.map(topic => (
                  <Grid item xs={12} sm={6} md={3} key={topic.id}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
                        Топик: {topic.name}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {topic.services.map(serviceId => {
                          const service = services.find(s => s.id === serviceId);
                          return (
                            <Chip 
                              key={serviceId}
                              label={service?.name.split(' ')[1] || serviceId}
                              size="small"
                              sx={{ 
                                fontSize: '0.65rem',
                                bgcolor: service?.color ? `${service.color}20` : undefined
                              }}
                            />
                          );
                        })}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        )}
        
        {/* Сервисы */}
        <Grid container spacing={detailedView ? 3 : 2}>
          {services.map(service => (
            <Grid item xs={12} sm={6} md={detailedView ? 4 : 4} key={service.id}>
              <ServiceCard 
                component={motion.div}
                elevation={hoveredService === service.id ? 6 : 2}
                sx={{ 
                  borderTop: `5px solid ${service.color}`,
                  bgcolor: (hoveredService === service.id || activeScenario === service.id) 
                    ? 'rgba(25, 118, 210, 0.05)' 
                    : 'background.paper'
                }}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => handleServiceHover(service.id)}
                onMouseLeave={handleServiceLeave}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', mb: 1 }}>
                  {service.icon}
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle1" fontWeight="medium">{service.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{service.description}</Typography>
                  </Box>
                </Box>
                
                {detailedView && service.technologies && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold">
                        Технологии:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {service.technologies.map((tech, idx) => (
                          <Chip 
                            key={idx}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.65rem', height: 22 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </>
                )}
                
                {detailedView && service.features && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold">
                      Функциональность:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {service.features.map((feature, idx) => (
                        <Typography 
                          key={idx} 
                          variant="caption" 
                          component="span"
                          sx={{ 
                            fontSize: '0.65rem',
                            bgcolor: 'rgba(0,0,0,0.04)',
                            borderRadius: 1,
                            px: 0.7,
                            py: 0.3,
                            display: 'inline-block'
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}
                
                {/* База данных под микросервисом, если есть */}
                {databases.some(db => db.serviceId === service.id) && (
                  <Box sx={{ mt: detailedView ? 2 : 'auto', width: '100%' }}>
                    {databases
                      .filter(db => db.serviceId === service.id)
                      .map(db => (
                        <Database key={db.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <StorageIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Box>
                            <Typography variant="caption" fontWeight="medium">{db.name}</Typography>
                            {detailedView && (
                              <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                {db.type} - {db.description}
                              </Typography>
                            )}
                          </Box>
                        </Database>
                      ))
                    }
                  </Box>
                )}
                
                {/* API endpoints */}
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <Chip 
                    size="small" 
                    label={`API: /api/${service.id}`} 
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                  {service.id === 'scoring' && (
                    <Chip size="small" label="ML-модель" color="warning" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                  )}
                  {service.id === 'document' && (
                    <Chip size="small" label="S3 Storage" color="info" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                  )}
                </Box>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
        
        {/* Соединения между сервисами */}
        {detailedView && (
          <Box sx={{ mt: 4 }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Потоки данных между сервисами
              </Typography>
              <Stack spacing={1}>
                {connections.map((connection, index) => renderConnectionPath(connection, index))}
              </Stack>
            </Paper>
          </Box>
        )}
      </Box>
      
      <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 2 }}>
        * В реальной архитектуре микросервисы взаимодействуют через комбинацию синхронных (REST API) и асинхронных (Event Bus) коммуникаций
      </Typography>
    </Box>
  );
};

export default SystemArchitecture; 