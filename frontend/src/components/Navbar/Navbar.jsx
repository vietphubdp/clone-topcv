import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { logoutUser } from '../../services/api';
import logoImg from '../../assets/logo.png';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();

  // User auth state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  // Sync user state on route change / window focus
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedUser = localStorage.getItem('user');
        setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setCurrentUser(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Desktop Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  // Mobile Drawer state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);

  const handleOpenMenu = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuName);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const toggleMobileDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const handleToggleMobileSubmenu = (menuName) => {
    setExpandedMobileMenu(expandedMobileMenu === menuName ? null : menuName);
  };

  const handleLogout = async () => {
    setUserMenuAnchor(null);
    setMobileOpen(false);
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      navigate('/');
    }
  };

  const menuItemsConfig = {
    'viec-lam': ['Việc làm IT', 'Việc làm Mới nhất', 'Việc làm Bán thời gian', 'Việc làm Remote'],
    'tao-cv': ['Mẫu CV chuẩn', 'Tạo Cover Letter', 'Hướng dẫn viết CV', 'Dịch vụ CV Pro'],
    'cong-cu': ['Tính lương GROSS - NET', 'Bảo hiểm thất nghiệp', 'Lập kế hoạch tiết kiệm', 'Tính lãi suất vay'],
    'cam-nang': ['Báo cáo thị trường tuyển dụng', 'Kinh nghiệm phỏng vấn', 'Bí quyết thăng tiến', 'Góc định hướng'],
  };

  return (
    <header className="topcv-navbar">
      <div className="navbar-container topcv-container">
        {/* Left Side: Brand Logo & Desktop Links & Mobile Hamburger */}
        <div className="navbar-left">
          {/* Mobile Hamburger Menu Icon */}
          <IconButton
            onClick={toggleMobileDrawer(true)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: '#00b14f',
              p: 0.5,
            }}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>

          {/* Logo */}
          <div className="brand-logo-wrapper" onClick={() => navigate('/')}>
            <img src={logoImg} alt="TopCV" className="brand-logo-img" />
          </div>

          {/* Desktop Nav Menu Links */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
            <ul className="nav-menu">
              <li className="nav-item" onClick={(e) => handleOpenMenu(e, 'viec-lam')}>
                Việc làm <KeyboardArrowDownIcon className="mui-icon" />
              </li>
              <li className="nav-item" onClick={(e) => handleOpenMenu(e, 'tao-cv')}>
                Tạo CV <KeyboardArrowDownIcon className="mui-icon" />
              </li>
              <li className="nav-item" onClick={(e) => handleOpenMenu(e, 'cong-cu')}>
                Công cụ <KeyboardArrowDownIcon className="mui-icon" />
              </li>
              <li className="nav-item" onClick={(e) => handleOpenMenu(e, 'cam-nang')}>
                Cẩm nang nghề nghiệp <KeyboardArrowDownIcon className="mui-icon" />
              </li>
              <li className="nav-item">
                TopCV <span className="badge-pro">Pro</span>
              </li>
            </ul>
          </Box>
        </div>

        {/* Desktop Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 180,
              '& .MuiMenuItem-root': {
                fontSize: '14px',
                fontWeight: 500,
                py: 1,
                '&:hover': {
                  backgroundColor: '#f4fbf7',
                  color: '#00b14f',
                },
              },
            },
          }}
        >
          {activeMenu &&
            menuItemsConfig[activeMenu]?.map((item, idx) => (
              <MenuItem key={idx} onClick={handleCloseMenu}>
                {item}
              </MenuItem>
            ))}
        </Menu>

        {/* Right Side: Action Buttons */}
        <div className="navbar-right">
          {currentUser ? (
            <>
              {/* Nút Đăng tuyển: Chỉ dành cho Nhà tuyển dụng (EMPLOYER) */}
              {currentUser.role === 'EMPLOYER' && (
                <Button
                  variant="text"
                  className="btn-recruiter"
                  onClick={() => navigate('/post-job')}
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Đăng tuyển & tìm hồ sơ
                </Button>
              )}

              {/* Nút hiển thị tên User & Menu Đăng xuất */}
              <Button
                onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                startIcon={
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: '#00b14f',
                      fontSize: '14px',
                      fontWeight: 700,
                    }}
                  >
                    {(currentUser.full_name || currentUser.company_name || currentUser.email || 'U')[0].toUpperCase()}
                  </Avatar>
                }
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: '#212f3f',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  textTransform: 'none',
                  borderRadius: '20px',
                  px: 1.6,
                  py: 0.6,
                  backgroundColor: '#f4fbf7',
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#e6f7ef' },
                }}
              >
                {currentUser.full_name || currentUser.company_name || currentUser.email}
              </Button>

              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={() => setUserMenuAnchor(null)}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1,
                    minWidth: 190,
                    borderRadius: 2,
                    p: 0.5,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                    {currentUser.full_name || currentUser.company_name || 'Người dùng'}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#777' }}>
                    {currentUser.email}
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#00b14f', fontWeight: 700, mt: 0.5 }}>
                    {currentUser.role === 'EMPLOYER' ? 'Nhà tuyển dụng' : 'Ứng viên'}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setUserMenuAnchor(null);
                    navigate('/admin');
                  }}
                  sx={{
                    color: '#0f172a',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    borderRadius: 1,
                    my: 0.5,
                    gap: 1,
                  }}
                >
                  <AdminPanelSettingsIcon fontSize="small" sx={{ color: '#00b14f' }} /> Trang Quản trị
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    color: '#d32f2f',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    borderRadius: 1,
                    my: 0.5,
                    gap: 1,
                  }}
                >
                  <LogoutIcon fontSize="small" /> Đăng xuất
                </MenuItem>

              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                className="btn-register-candidate"
                onClick={() => navigate('/register-candidate')}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  borderColor: '#00b14f',
                  color: '#00b14f',
                  fontWeight: 700,
                  borderRadius: '20px',
                  px: 1.5,
                  py: 0.6,
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#e6f7ef',
                    borderColor: '#00b14f',
                  },
                }}
              >
                Đăng ký Ứng viên
              </Button>

              <Button
                variant="outlined"
                className="btn-register-employer"
                onClick={() => navigate('/register')}
                sx={{
                  display: { xs: 'none', lg: 'inline-flex' },
                  borderColor: '#212f3f',
                  color: '#212f3f',
                  fontWeight: 700,
                  borderRadius: '20px',
                  px: 1.5,
                  py: 0.6,
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#f0f4f8',
                    borderColor: '#212f3f',
                  },
                }}
              >
                Đăng ký NTD
              </Button>

              <Button
                variant="contained"
                className="btn-login"
                onClick={() => navigate('/login')}
                sx={{
                  whiteSpace: 'nowrap',
                  px: 1.8,
                }}
              >
                Đăng nhập
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleMobileDrawer(false)}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: '#ffffff',
          },
        }}
      >
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <div className="brand-logo-wrapper" onClick={() => { setMobileOpen(false); navigate('/'); }}>
            <img src={logoImg} alt="TopCV" className="brand-logo-img" />
          </div>

          <IconButton onClick={toggleMobileDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Drawer Content */}
        <Box sx={{ flex: 1, py: 1 }}>
          <List component="nav" sx={{ px: 1 }}>
            {/* Việc làm */}
            <ListItem
              button
              onClick={() => handleToggleMobileSubmenu('viec-lam')}
              sx={{ borderRadius: '8px', my: 0.3 }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: '#00b14f' }}>
                <WorkOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Việc làm"
                primaryTypographyProps={{ fontWeight: 600, fontSize: '15px' }}
              />
              {expandedMobileMenu === 'viec-lam' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandedMobileMenu === 'viec-lam'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {menuItemsConfig['viec-lam'].map((sub, idx) => (
                  <ListItem button key={idx} onClick={toggleMobileDrawer(false)}>
                    <ListItemText
                      primary={sub}
                      primaryTypographyProps={{ fontSize: '14px', color: '#555' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Tạo CV */}
            <ListItem
              button
              onClick={() => handleToggleMobileSubmenu('tao-cv')}
              sx={{ borderRadius: '8px', my: 0.3 }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: '#00b14f' }}>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tạo CV"
                primaryTypographyProps={{ fontWeight: 600, fontSize: '15px' }}
              />
              {expandedMobileMenu === 'tao-cv' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandedMobileMenu === 'tao-cv'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {menuItemsConfig['tao-cv'].map((sub, idx) => (
                  <ListItem button key={idx} onClick={toggleMobileDrawer(false)}>
                    <ListItemText
                      primary={sub}
                      primaryTypographyProps={{ fontSize: '14px', color: '#555' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Công cụ */}
            <ListItem
              button
              onClick={() => handleToggleMobileSubmenu('cong-cu')}
              sx={{ borderRadius: '8px', my: 0.3 }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: '#00b14f' }}>
                <BuildOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Công cụ"
                primaryTypographyProps={{ fontWeight: 600, fontSize: '15px' }}
              />
              {expandedMobileMenu === 'cong-cu' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandedMobileMenu === 'cong-cu'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {menuItemsConfig['cong-cu'].map((sub, idx) => (
                  <ListItem button key={idx} onClick={toggleMobileDrawer(false)}>
                    <ListItemText
                      primary={sub}
                      primaryTypographyProps={{ fontSize: '14px', color: '#555' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Cẩm nang nghề nghiệp */}
            <ListItem
              button
              onClick={() => handleToggleMobileSubmenu('cam-nang')}
              sx={{ borderRadius: '8px', my: 0.3 }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: '#00b14f' }}>
                <MenuBookOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cẩm nang nghề nghiệp"
                primaryTypographyProps={{ fontWeight: 600, fontSize: '15px' }}
              />
              {expandedMobileMenu === 'cam-nang' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandedMobileMenu === 'cam-nang'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {menuItemsConfig['cam-nang'].map((sub, idx) => (
                  <ListItem button key={idx} onClick={toggleMobileDrawer(false)}>
                    <ListItemText
                      primary={sub}
                      primaryTypographyProps={{ fontSize: '14px', color: '#555' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* TopCV Pro */}
            <ListItem button onClick={toggleMobileDrawer(false)} sx={{ borderRadius: '8px', my: 0.3 }}>
              <ListItemIcon sx={{ minWidth: 38, color: '#ff9800' }}>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    TopCV <span className="badge-pro">Pro</span>
                  </Box>
                }
                primaryTypographyProps={{ fontWeight: 600, fontSize: '15px' }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider />

        {/* Drawer Action Buttons */}
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          {currentUser ? (
            <>
              <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#f4fbf7', border: '1px solid #e6f7ef' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#212f3f' }}>
                  {currentUser.full_name || currentUser.company_name || 'Người dùng'}
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#666' }}>
                  {currentUser.email}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#00b14f', fontWeight: 700, mt: 0.5 }}>
                  {currentUser.role === 'EMPLOYER' ? 'Nhà tuyển dụng' : 'Ứng viên'}
                </Typography>
              </Box>

              {currentUser.role === 'EMPLOYER' && (
                <Button
                  variant="text"
                  fullWidth
                  className="btn-recruiter"
                  onClick={() => { setMobileOpen(false); navigate('/post-job'); }}
                >
                  Đăng tuyển & tìm hồ sơ
                </Button>
              )}

              <Button
                variant="outlined"
                fullWidth
                startIcon={<AdminPanelSettingsIcon />}
                onClick={() => { setMobileOpen(false); navigate('/admin'); }}
                sx={{
                  borderColor: '#00b14f',
                  color: '#00b14f',
                  borderRadius: '20px',
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#e6f7ef' },
                }}
              >
                Trang Quản trị
              </Button>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ borderRadius: '20px', fontWeight: 700, textTransform: 'none' }}
              >
                Đăng xuất
              </Button>

            </>
          ) : (
            <>
              <Button
                variant="contained"
                fullWidth
                className="btn-login"
                onClick={() => { setMobileOpen(false); navigate('/login'); }}
              >
                Đăng nhập
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: '#00b14f',
                  color: '#00b14f',
                  fontWeight: 700,
                  borderRadius: '20px',
                  py: 0.8,
                  fontSize: '13.5px',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#e6f7ef' },
                }}
                onClick={() => { setMobileOpen(false); navigate('/register-candidate'); }}
              >
                Đăng ký Ứng viên
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: '#212f3f',
                  color: '#212f3f',
                  fontWeight: 700,
                  borderRadius: '20px',
                  py: 0.8,
                  fontSize: '13.5px',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#f0f4f8' },
                }}
                onClick={() => { setMobileOpen(false); navigate('/register'); }}
              >
                Đăng ký Nhà tuyển dụng
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </header>
  );
};

export default Navbar;
