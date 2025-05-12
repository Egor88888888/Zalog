import React from 'react';
import { LinearProgress, Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, showPercentage = false }) => {
  const theme = useTheme();
  
  // Определяем цвет прогресса в зависимости от значения
  const getProgressColor = () => {
    if (value < 30) return theme.palette.error.main;
    if (value < 70) return theme.palette.warning.main;
    return theme.palette.success.main;
  };
  
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        {label && (
          <Typography 
            variant="body2" 
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            sx={{ fontWeight: 500 }}
          >
            {label}
          </Typography>
        )}
        {showPercentage && (
          <Typography 
            variant="body2" 
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{ 
              fontWeight: 'bold',
              color: getProgressColor()
            }}
          >
            {Math.round(value)}%
          </Typography>
        )}
      </Box>
      
      <Box 
        sx={{ 
          bgcolor: theme.palette.grey[200], 
          borderRadius: 2,
          height: 12,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div 
          initial={{ width: 0, opacity: 0 }} 
          animate={{ 
            width: `${value}%`, 
            opacity: 1,
            transition: { 
              width: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }
          }}
          style={{ 
            height: '100%',
            borderRadius: 8,
            background: getProgressColor(),
            position: 'relative'
          }}
        />
        
        {/* Пульсирующая анимация для прогресса */}
        {value > 0 && value < 100 && (
          <Box 
            component={motion.div}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: `calc(${value}% - 10px)`,
              height: '100%',
              width: 20,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.4)', 
              mixBlendMode: 'overlay',
              pointerEvents: 'none'
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProgressBar; 