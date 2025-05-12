import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => (
  <Box sx={{ width: '100%', mb: 2 }}>
    {label && <Typography variant="body2" mb={0.5}>{label}</Typography>}
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} style={{ overflow: 'hidden' }}>
      <LinearProgress variant="determinate" value={value} sx={{ height: 10, borderRadius: 5 }} />
    </motion.div>
  </Box>
);

export default ProgressBar; 