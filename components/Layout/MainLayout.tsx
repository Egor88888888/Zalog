import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NextLink from 'next/link';
import { useAuth } from '../Auth/AuthContext';

const drawerWidth = 240;

const MotionContainer = styled(motion.div)({
  width: '100%',
  height: '100%'
});

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { user, role } = useAuth();
  
  const isActive = (path: string) => router.pathname.startsWith(path);
  
  const getBreadcrumbs = () => {
    const pathSegments = router.pathname.split('/').filter(p => p);
    const breadcrumbs = [];
    
    // Домашняя страница всегда первая
    breadcrumbs.push({
      href: '/',
      label: t('common.home'),
      icon: <HomeIcon fontSize="small" />
    });
    
    // Добавляем сегменты пути
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let label;
      let icon = null;
      
      // Определяем человеко-читаемые названия и иконки
      switch(segment) {
        case 'dashboard':
          label = t('navigation.dashboard');
          icon = <DashboardIcon fontSize="small" />;
          break;
        case 'application':
          label = t('navigation.application');
          icon = <ListAltIcon fontSize="small" />;
          break;
        case 'staff':
          label = t('navigation.staff');
          icon = <PersonIcon fontSize="small" />;
          break;
        case 'applications':
          label = t('navigation.applications');
          break;
        default:
          // Для динамических сегментов, например ID заявки
          if (segment.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
            label = t('navigation.applicationDetails');
          } else {
            label = segment.charAt(0).toUpperCase() + segment.slice(1);
          }
      }
      
      breadcrumbs.push({
        href: currentPath,
        label,
        icon,
        active: index === pathSegments.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  const menuItems = [
    {
      label: t('navigation.dashboard'),
      href: role === 'staff' ? '/staff' : '/dashboard',
      icon: <DashboardIcon />
    },
    {
      label: t('navigation.newApplication'),
      href: '/application',
      icon: <ListAltIcon />,
      hideForStaff: true
    },
    {
      label: t('navigation.applications'),
      href: '/staff/applications',
      icon: <ListAltIcon />,
      showForStaff: true
    },
    {
      label: t('navigation.about'),
      href: '/about',
      icon: <InfoIcon />
    }
  ];
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleProfileMenuClose();
  };
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundImage: 'linear-gradient(to right, #1976d2, #2196f3)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            sx={{ flexGrow: 1 }}
          >
            {t('common.appName')} {role === 'staff' ? '- ' + t('common.staffPortal') : ''}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              icon={<LanguageIcon />}
              label={i18n.language.toUpperCase()}
              onClick={handleProfileMenuOpen}
              sx={{ mr: 2, cursor: 'pointer' }}
              variant="outlined"
              color="primary"
            />
            <IconButton
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Box>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => handleLanguageChange('ru')}>Русский</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
            <Divider />
            <MenuItem onClick={() => router.push('/')}>
              {t('auth.logout')}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Боковое меню */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => {
              // Пропускаем пункт меню, если он должен быть скрыт для текущей роли
              if ((item.hideForStaff && role === 'staff') || 
                  (item.showForStaff && role !== 'staff')) {
                return null;
              }
              
              return (
                <ListItem 
                  button 
                  key={item.label} 
                  component={NextLink}
                  href={item.href}
                  selected={isActive(item.href)}
                  sx={{
                    mb: 1,
                    borderRadius: '0 50px 50px 0',
                    pl: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      '&:hover': {
                        bgcolor: 'primary.light',
                      }
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive(item.href) ? 'primary.main' : 'inherit'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.href) ? 'bold' : 'regular'
                    }}
                  />
                  {isActive(item.href) && (
                    <KeyboardArrowRightIcon color="primary" />
                  )}
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem 
              button 
              component={NextLink}
              href="/settings"
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('navigation.settings')} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
      {/* Мобильное меню */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => {
              if ((item.hideForStaff && role === 'staff') || 
                  (item.showForStaff && role !== 'staff')) {
                return null;
              }
              
              return (
                <ListItem 
                  button 
                  key={item.label} 
                  component={NextLink}
                  href={item.href}
                  onClick={toggleDrawer}
                  selected={isActive(item.href)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      
      {/* Основной контент */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <MotionContainer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Хлебные крошки */}
          <Breadcrumbs 
            separator={<KeyboardArrowRightIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 3 }}
          >
            {getBreadcrumbs().map((crumb, index) => {
              const isLast = index === getBreadcrumbs().length - 1;
              
              return isLast ? (
                <Typography 
                  key={crumb.href} 
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {crumb.icon && <Box component="span" sx={{ mr: 0.5 }}>{crumb.icon}</Box>}
                  {crumb.label}
                </Typography>
              ) : (
                <MuiLink
                  key={crumb.href}
                  underline="hover"
                  color="inherit"
                  href={crumb.href}
                  component={NextLink}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {crumb.icon && <Box component="span" sx={{ mr: 0.5 }}>{crumb.icon}</Box>}
                  {crumb.label}
                </MuiLink>
              );
            })}
          </Breadcrumbs>
          
          <Container maxWidth="lg">
            {children}
          </Container>
        </MotionContainer>
      </Box>
    </Box>
  );
};

export default MainLayout; 