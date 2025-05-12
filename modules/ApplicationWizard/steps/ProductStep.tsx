import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

interface ProductStepProps {
  value?: 'mortgage' | 'autoloan';
  onSelect: (product: 'mortgage' | 'autoloan') => void;
}

const ProductStep: React.FC<ProductStepProps> = ({ value, onSelect }) => (
  <Box>
    <Typography mb={2}>Выберите продукт</Typography>
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        variant={value === 'mortgage' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onSelect('mortgage')}
        sx={{ minWidth: 120 }}
      >
        Ипотека
      </Button>
      <Button
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        variant={value === 'autoloan' ? 'contained' : 'outlined'}
        color="secondary"
        onClick={() => onSelect('autoloan')}
        sx={{ minWidth: 120 }}
      >
        Автокредит
      </Button>
    </Stack>
  </Box>
);

export default ProductStep; 