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
  Divider,
  Stack,
  LinearProgress,
  Chip,
  Grid
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

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '40%' } }}>
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
        
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '55%' } }}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '16.66%' }}>
                      {item.icon}
                    </Box>
                    <Box sx={{ width: '83.33%' }}>
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
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            ))}
          </Stack>
        </Box>
      </Box>

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