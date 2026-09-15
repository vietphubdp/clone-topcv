import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DRAWER_WIDTH = 260;

const AdminLayout = ({ children, title = 'Danh sách công ty' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const currentUser = (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : { full_name: 'Quản trị viên', email: 'admin@topcv.vn', role: 'ADMIN' };
    } catch {
      return { full_name: 'Quản trị viên', email: 'admin@topcv.vn', role: 'ADMIN' };
    }
  })();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navMenuItems = [
    { text: 'Danh sách công ty', icon: <BusinessIcon />, path: '/admin', active: true },
  ];

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#1e293b', color: '#f8fafc' }}>
      {/* Navigation Links */}
      <Box sx={{ flex: 1, py: 2.5, px: 1.5 }}>
        <Typography sx={{ px: 1.5, mb: 1.5, fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          Menu chính
        </Typography>
        <List disablePadding>
          {navMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: '10px',
                  py: 1.3,
                  px: 1.8,
                  bgcolor: '#00b14f',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0, 177, 79, 0.3)',
                  '&:hover': {
                    bgcolor: '#009643',
                    color: '#ffffff',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: '#ffffff',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f1f5f9' }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: '#ffffff',
          color: '#1e293b',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: '#00b14f' }}
            >
              <MenuIcon />
            </IconButton>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '16px', sm: '18px' }, color: '#0f172a' }}>
                {title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: { xs: 'none', sm: 'block' } }}>
                Hệ thống quản lý tin tuyển dụng TopCV
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{
                borderColor: '#e2e8f0',
                color: '#475569',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                fontSize: '12.5px',
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': {
                  borderColor: '#00b14f',
                  color: '#00b14f',
                  bgcolor: '#f0fdf4',
                },
              }}
            >
              Về trang chủ
            </Button>

            <IconButton
              onClick={(e) => setProfileAnchor(e.currentTarget)}
              sx={{ p: 0.5 }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: '#00b14f',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                {(currentUser.full_name || 'A')[0].toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              PaperProps={{
                elevation: 3,
                sx: { mt: 1, minWidth: 180, borderRadius: 2, p: 0.5 },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                  {currentUser.full_name || 'Admin'}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                  {currentUser.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                onClick={() => {
                  setProfileAnchor(null);
                  navigate('/');
                }}
                sx={{ fontSize: '13.5px', fontWeight: 500, my: 0.5 }}
              >
                <OpenInNewIcon sx={{ fontSize: 18, mr: 1, color: '#64748b' }} /> Trang người dùng
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ fontSize: '13.5px', fontWeight: 600, color: '#ef4444', my: 0.5 }}
              >
                <LogoutIcon sx={{ fontSize: 18, mr: 1 }} /> Đăng xuất
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer Component */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="admin navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid #1e293b',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 3.5 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
