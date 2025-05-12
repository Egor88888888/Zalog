import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  MenuItem, 
  Select, 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  FormHelperText,
  Tooltip,
  Alert,
  useTheme,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
  LinearProgress,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';
import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const scenarioIcons = {
  ideal: <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />,
  gray: <WarningIcon color="warning" sx={{ fontSize: 40 }} />,
  reject: <ErrorIcon color="error" sx={{ fontSize: 40 }} />,
  error: <ErrorIcon color="error" sx={{ fontSize: 40 }} />
};

const InfoIconStyled = styled(InfoIcon)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.primary.main,
  marginLeft: theme.spacing(1),
  cursor: 'pointer',
}));

const LoginForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { role, setRole, scenario, setScenario, language, setLanguage } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredScenario, setHoveredScenario] = useState<string | null>(null);

  // Если язык не установлен явно, устанавливаем русский при монтировании
  useEffect(() => {
    if (i18n.language !== 'ru') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
    }
  }, [i18n, setLanguage]);

  const handleLanguageChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newLanguage = e.target.value as string;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleLogin = () => {
    if (!role || !scenario) {
      setError('Выберите роль и сценарий для начала демонстрации');
      return;
    }

    setLoading(true);
    setError('');

    // Имитация загрузки
    setTimeout(() => {
      try {
        // Прямой переход к демонстрации, минуя промежуточную панель
        router.push(role === 'client' ? '/application' : '/staff');
      } catch (error) {
        setError('Произошла ошибка при входе в систему');
        setLoading(false);
      }
    }, 1000);
  };

  const scenarios = [
    {
      id: 'ideal',
      title: 'Идеальный клиент',
      subtitle: 'Автоматическое одобрение',
      description: 'Клиент с идеальной кредитной историей и высоким скоринговым баллом. Заявка проходит все проверки автоматически и одобряется без участия андеррайтера.',
      detailedDescription: 'В этом сценарии демонстрируется процесс автоматического одобрения заявки для клиента с высоким скоринговым баллом. Система последовательно проходит все этапы: валидацию данных, проверку кредитной истории, расчет долговой нагрузки, и автоматически принимает положительное решение без необходимости ручной проверки андеррайтером.',
      color: theme.palette.success.light,
      borderColor: theme.palette.success.main,
      icon: scenarioIcons.ideal,
      features: [
        'Скоринг: 90+ баллов',
        'Время обработки: 5 минут',
        'Полная автоматизация процесса',
        'Минимальные требования к документам'
      ],
      microservices: ['Аутентификация', 'Обработка заявки', 'Скоринг', 'Нотификация', 'Подготовка документов']
    },
    {
      id: 'gray',
      title: 'Пограничный случай',
      subtitle: 'Требуется андеррайтинг',
      description: 'Клиент со средней кредитной историей. Автоматический скоринг показывает средние риски, требуется подтверждение андеррайтера и возможный запрос дополнительных документов.',
      detailedDescription: 'Сценарий демонстрирует работу системы, когда автоматическая оценка рисков не дает однозначного результата. Заявка переходит на ручное рассмотрение сотрудником банка (андеррайтером), который может запросить дополнительные документы, провести верификацию и принять окончательное решение. Показывает взаимодействие автоматических и ручных процессов.',
      color: theme.palette.warning.light,
      borderColor: theme.palette.warning.main,
      icon: scenarioIcons.gray,
      features: [
        'Скоринг: 60-75 баллов',
        'Время обработки: 1-2 дня',
        'Участие андеррайтера',
        'Запрос доп. документов'
      ],
      microservices: ['Аутентификация', 'Обработка заявки', 'Скоринг', 'Управление документами', 'Система андеррайтинга', 'Нотификация']
    },
    {
      id: 'reject',
      title: 'Отказ по заявке',
      subtitle: 'Высокие риски',
      description: 'Клиент с негативной кредитной историей или низким скоринговым баллом. Заявка отклоняется системой с указанием причин отказа.',
      detailedDescription: 'Этот сценарий показывает процесс обработки заявки, которая будет отклонена из-за высоких рисков. Демонстрирует работу скоринговой модели при выявлении негативных факторов, формирование отчета о причинах отказа, а также процесс уведомления клиента с предоставлением подробного объяснения и возможных рекомендаций для будущих обращений.',
      color: theme.palette.error.light,
      borderColor: theme.palette.error.main,
      icon: scenarioIcons.reject,
      features: [
        'Скоринг: <50 баллов',
        'Высокая долговая нагрузка',
        'Негативная кредитная история',
        'Подробное объяснение причин'
      ],
      microservices: ['Аутентификация', 'Обработка заявки', 'Скоринг', 'Анализ рисков', 'Система формирования ответов', 'Нотификация']
    },
    {
      id: 'error',
      title: 'Технический сбой',
      subtitle: 'Ошибка в системе',
      description: 'Демонстрация работы системы при возникновении технических ошибок, отказе сервисов или потере связи между компонентами.',
      detailedDescription: 'Специальный сценарий для демонстрации отказоустойчивости системы. Показывает, как платформа обрабатывает различные технические сбои: недоступность микросервисов, ошибки при обмене данными, проблемы с базами данных. Демонстрирует механизмы обработки ошибок, логирования, оповещения администраторов и информирования пользователей о временных проблемах.',
      color: '#ffebee',
      borderColor: theme.palette.grey.A400,
      icon: scenarioIcons.error,
      features: [
        'Имитация отказа микросервисов',
        'Система обработки ошибок',
        'Экраны с описанием проблемы',
        'Варианты восстановления'
      ],
      microservices: ['Мониторинг', 'Восстановление данных', 'Обработка ошибок', 'Нотификация', 'Логирование']
    }
  ];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ maxWidth: 900, mx: 'auto', mt: 4, mb: 4 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          Демо Платформа Залогового Кредитования
        </Typography>
        
        <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 4, color: 'text.secondary' }}>
          Интерактивная визуализация процессов кредитования с детальной демонстрацией внутренней архитектуры
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body1">
            <strong>Инструкция по навигации:</strong> Выберите роль и сценарий, затем нажмите "Войти". 
            Для входа в <strong>кабинет сотрудника</strong> выберите роль "Сотрудник банка".
            В системе вы увидите интерактивные визуализации архитектуры и процессов обработки заявок.
          </Typography>
        </Alert>

        <Divider sx={{ mb: 4 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Box sx={{ width: '100%', maxWidth: '41.666%', pr: 2, pl: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Настройки демонстрации
            </Typography>
            
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel>Выберите роль</InputLabel>
              <Select
                value={role || ''}
                onChange={(e) => setRole(e.target.value as any)}
                label="Выберите роль"
              >
                <MenuItem value="client">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Клиент
                  </Box>
                </MenuItem>
                <MenuItem value="staff">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceIcon sx={{ mr: 1 }} />
                    Сотрудник банка
                  </Box>
                </MenuItem>
              </Select>
              <FormHelperText>
                {role === 'client' ? 'Демонстрация процесса подачи заявки от лица клиента' : 
                 role === 'staff' ? 'Демонстрация процесса обработки заявок от лица сотрудника банка' : 
                 'Выберите с какой стороны вы хотите увидеть процесс'}
              </FormHelperText>
            </FormControl>
            
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel>Выберите язык</InputLabel>
              <Select
                value={language}
                onChange={handleLanguageChange as any}
                label="Выберите язык"
              >
                <MenuItem value="ru">Русский</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
            
            {scenario && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Описание выбранного сценария:
                </Typography>
                <Typography variant="body2">
                  {scenarios.find(s => s.id === scenario)?.detailedDescription}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{ width: '100%', maxWidth: '58.333%', pr: 2, pl: 2 }}>
            <Typography variant="h6" gutterBottom>
              Выберите сценарий
            </Typography>
            
            <Stack spacing={2}>
              {scenarios.map((item) => (
                <MotionCard 
                  key={item.id}
                  onClick={() => setScenario(item.id as any)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{ 
                    cursor: 'pointer',
                    border: scenario === item.id ? `2px solid ${item.borderColor}` : '1px solid transparent',
                    boxShadow: scenario === item.id ? '0 5px 15px rgba(0,0,0,0.1)' : 'none',
                    bgcolor: item.color,
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    },
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {item.icon}
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.subtitle}
                        </Typography>
                        
                        <Divider sx={{ my: 1 }}/>
                        
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                          {item.description}
                        </Typography>
                        
                        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {item.features.map((feature, idx) => (
                            <Typography 
                              key={idx} 
                              component="span" 
                              variant="caption" 
                              sx={{ 
                                px: 1, 
                                py: 0.5, 
                                bgcolor: 'rgba(255,255,255,0.7)', 
                                borderRadius: 1,
                                fontSize: '0.7rem',
                                mr: 0.5,
                                mb: 0.5
                              }}
                            >
                              {feature}
                            </Typography>
                          ))}
                        </Box>
                        
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', fontSize: '0.7rem' }}>
                            Задействованные микросервисы:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {item.microservices.map((service, idx) => (
                              <Chip 
                                key={idx}
                                label={service}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.65rem', height: 22 }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MotionCard>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Кнопка входа с анимацией */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
              disabled={loading || !role || !scenario}
              sx={{ 
                minWidth: 200, 
                py: 1.5,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {loading ? (
                <LinearProgress 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0,
                    height: 4 
                  }}
                />
              ) : null}
              {loading ? t('common.loading') : t('login')}
            </Button>
          </MotionBox>
        </Box>
        
        <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
          После входа вы получите доступ к визуализации внутренней архитектуры системы и процессов обработки заявок.
        </Typography>
      </Paper>
    </MotionBox>
  );
};

export default LoginForm; 