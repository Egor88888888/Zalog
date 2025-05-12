import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationProps {
  open: boolean;
  message: string;
  type?: AlertColor;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ open, message, type = 'info', onClose }) => (
  <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default Notification; 