import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useTranslation } from 'react-i18next';

interface ProductStepProps {
  value?: 'mortgage' | 'autoloan';
  onSelect: (product: 'mortgage' | 'autoloan') => void;
}

const ProductCard = styled(motion(Card))(({ theme }) => ({
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
}));

const ProductIcon = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: 80,
  height: 80,
  margin: '0 auto',
}));

const products = [
  {
    id: 'mortgage',
    title: 'Ипотека',
    description: 'Ипотечный кредит на покупку жилья, строительство дома или рефинансирование',
    icon: <HomeIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
    backgroundGradient: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    hoverGradient: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
  },
  {
    id: 'autoloan',
    title: 'Автокредит',
    description: 'Кредит на покупку нового или подержанного автомобиля',
    icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
    color: '#9c27b0',
    backgroundGradient: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
    hoverGradient: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
  }
];

const MotionBox = motion(Box);

const ProductStep: React.FC<ProductStepProps> = ({ value, onSelect }) => {
  const { t } = useTranslation();
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h6" mb={3} textAlign="center">
        {t('application.selectProduct', 'Выберите продукт')}
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} key={product.id}>
            <ProductCard
              whileHover={{ 
                y: -8,
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                background: product.hoverGradient,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(product.id as 'mortgage' | 'autoloan')}
              sx={{ 
                border: value === product.id ? '3px solid' : '1px solid',
                borderColor: value === product.id ? product.color : 'divider',
                background: product.backgroundGradient,
                boxShadow: value === product.id ? '0 8px 16px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >              
              <CardContent sx={{ 
                textAlign: 'center', 
                color: 'white', 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 3
              }}>
                <ProductIcon 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                >
                  {product.icon}
                </ProductIcon>
                
                <Typography 
                  variant="h5" 
                  component={motion.div}
                  animate={{ 
                    scale: value === product.id ? [1, 1.05, 1] : 1
                  }}
                  transition={{ 
                    repeat: value === product.id ? Infinity : 0,
                    repeatType: "reverse",
                    duration: 1.5
                  }}
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  {product.title}
                </Typography>
                
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {product.description}
                </Typography>
                
                {value === product.id && (
                  <MotionBox
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    sx={{ 
                      mt: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      borderRadius: 2,
                      p: 1,
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {t('application.selected', 'Выбрано')}
                  </MotionBox>
                )}
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </MotionBox>
  );
};

export default ProductStep; 