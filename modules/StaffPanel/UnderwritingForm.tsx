import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Stack,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { updateApplicationStatus } from '../../api-mock';

interface UnderwritingFormProps {
  id: string;
  application: any;
  onStatusChange: (status: string) => void;
}

const UnderwritingForm: React.FC<UnderwritingFormProps> = ({ id, application, onStatusChange }) => {
  const [decision, setDecision] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [additionalDocs, setAdditionalDocs] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [riskScore, setRiskScore] = useState<number>(50);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const newStatus = decision === 'approve' ? 'approved' : 'rejected';
      updateApplicationStatus(id, newStatus);
      onStatusChange(newStatus);
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const handleRiskScoreChange = (event: Event, newValue: number | number[]) => {
    setRiskScore(newValue as number);
  };

  if (submitted) {
    return (
      <Alert severity={decision === 'approve' ? 'success' : 'error'}>
        Заявка {decision === 'approve' ? 'одобрена' : 'отклонена'}. {comment}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Андеррайтинг заявки</Typography>
      
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Оценка рисков</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography gutterBottom>Скоринговый балл</Typography>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="body2" color="error">Высокий риск</Typography>
                <Slider
                  value={riskScore}
                  onChange={handleRiskScoreChange}
                  aria-label="Risk Score"
                  valueLabelDisplay="auto"
                  sx={{ flexGrow: 1 }}
                />
                <Typography variant="body2" color="success">Низкий риск</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip 
                  label={`Скоринговый балл: ${riskScore}`}
                  color={riskScore > 70 ? 'success' : riskScore > 40 ? 'warning' : 'error'}
                />
                <Chip 
                  label={riskScore > 70 ? 'Рекомендуется одобрить' : riskScore > 40 ? 'Требуется анализ' : 'Рекомендуется отказать'}
                  variant="outlined"
                />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Запрос дополнительных документов</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Укажите необходимые документы"
            multiline
            rows={3}
            value={additionalDocs}
            onChange={(e) => setAdditionalDocs(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Например: Выписка из банка за последние 6 месяцев, справка 2-НДФЛ, документы на залоговое имущество и т.д."
          />
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 2 }}
            disabled={!additionalDocs}
          >
            Запросить документы
          </Button>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Решение по заявке</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Принятое решение</FormLabel>
        <RadioGroup value={decision} onChange={(e) => setDecision(e.target.value)}>
          <FormControlLabel value="approve" control={<Radio />} label="Одобрить заявку" />
          <FormControlLabel value="reject" control={<Radio />} label="Отклонить заявку" />
        </RadioGroup>
      </FormControl>
      
      <TextField
        label="Комментарий к решению"
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 3 }}
        placeholder="Укажите причину отказа или особые условия одобрения"
      />
      
      <Button 
        variant="contained" 
        color={decision === 'approve' ? 'success' : decision === 'reject' ? 'error' : 'primary'}
        onClick={handleSubmit}
        disabled={!decision || loading}
        fullWidth
      >
        {loading ? 'Обработка...' : 'Сохранить решение'}
      </Button>
    </Box>
  );
};

export default UnderwritingForm; 