import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

const Button: React.FC<ButtonProps> = (props) => (
  <MuiButton
    component={motion.button}
    whileTap={{ scale: 0.97 }}
    {...props}
  />
);

export default Button; 