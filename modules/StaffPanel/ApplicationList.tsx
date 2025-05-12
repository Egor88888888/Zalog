import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getApplications } from '../../api-mock';

const STATUS_LABELS: Record<string, string> = {
  draft: 'Черновик',
  submitted: 'Отправлена',
  scoring: 'Скоринг',
  approved: 'Одобрена',
  rejected: 'Отклонена',
  issued: 'Выдан кредит'
};

const STATUS_COLORS: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  draft: 'default',
  submitted: 'info',
  scoring: 'warning',
  approved: 'success',
  rejected: 'error',
  issued: 'secondary'
};

const ApplicationList: React.FC = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');

  useEffect(() => {
    const apps = getApplications();
    setApplications(apps);
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.clientName.toLowerCase().includes(search.toLowerCase()) || 
                         app.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesProduct = productFilter === 'all' || app.product === productFilter;
    
    return matchesSearch && matchesStatus && matchesProduct;
  });

  const handleRowClick = (id: string) => {
    router.push(`/staff/applications/${id}`);
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <TextField
          label="Поиск"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={statusFilter}
            label="Статус"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">Все</MenuItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Продукт</InputLabel>
          <Select
            value={productFilter}
            label="Продукт"
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="mortgage">Ипотека</MenuItem>
            <MenuItem value="autoloan">Автокредит</MenuItem>
          </Select>
        </FormControl>
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          onClick={() => {
            setSearch('');
            setStatusFilter('all');
            setProductFilter('all');
          }}
        >
          Сбросить
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID заявки</TableCell>
              <TableCell>ФИО клиента</TableCell>
              <TableCell>Продукт</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата создания</TableCell>
              <TableCell>Сценарий</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <TableRow 
                  key={app.id} 
                  hover 
                  onClick={() => handleRowClick(app.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.clientName}</TableCell>
                  <TableCell>{app.product === 'mortgage' ? 'Ипотека' : 'Автокредит'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={STATUS_LABELS[app.status] || app.status} 
                      color={STATUS_COLORS[app.status] || 'default'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{new Date(app.createdAt).toLocaleString('ru')}</TableCell>
                  <TableCell>{app.scenario}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">Заявок не найдено</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApplicationList; 