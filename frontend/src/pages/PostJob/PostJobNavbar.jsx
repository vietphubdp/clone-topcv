import React from 'react';
import { Box, Typography, Button, Avatar, Badge } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useNavigate } from 'react-router-dom';
import './PostJobNavbar.css';

const PostJobNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="postjob-navbar">
      <div className="topcv-container postjob-nav-container">
        {/* Left Side: Brand Logo + Employer Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ fontSize: '24px', fontWeight: 900, color: '#212f3f' }}>
              top<span style={{ color: '#00b14f' }}>cv</span>
            </Typography>
            <Box
              sx={{
                width: '16px',
                height: '16px',
                background: 'linear-gradient(135deg, #00b14f 0%, #008037 100%)',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-10deg)',
              }}
            />
          </Box>

          <Box
            sx={{
              backgroundColor: '#00b14f',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              px: 1.2,
              py: 0.3,
              borderRadius: '12px',
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}
          >
            Nhà Tuyển Dụng
          </Box>
        </Box>

        {/* Center: Recruiter Menu Items */}
        <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
          <ul className="postjob-menu">
            <li className="postjob-menu-item" onClick={() => alert('Trang Quản lý tin tuyển dụng')}>
              Quản lý tin tuyển dụng
            </li>
            <li className="postjob-menu-item active">
              <AddCircleOutlinedIcon sx={{ fontSize: '16px', mr: 0.5, verticalAlign: 'middle' }} />
              Đăng tin mới
            </li>
            <li className="postjob-menu-item" onClick={() => alert('Trang Tìm hồ sơ CV')}>
              Tìm hồ sơ CV
            </li>
            <li className="postjob-menu-item" onClick={() => alert('Báo cáo tuyển dụng')}>
              Báo cáo tuyển dụng
            </li>
          </ul>
        </Box>

        {/* Right Side: Switch to Candidate & Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<SwapHorizIcon />}
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              borderColor: '#00b14f',
              color: '#00b14f',
              borderRadius: '20px',
              fontWeight: 600,
              fontSize: '12.5px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
          >
            Dành cho Ứng viên
          </Button>

          <Badge badgeContent={3} color="error">
            <NotificationsNoneOutlinedIcon sx={{ color: '#666', cursor: 'pointer' }} />
          </Badge>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                backgroundColor: '#00b14f',
                fontWeight: 800,
                fontSize: '13px',
              }}
            >
              AC
            </Avatar>
            <Typography
              sx={{
                display: { xs: 'none', lg: 'block' },
                fontSize: '13.5px',
                fontWeight: 700,
                color: '#333333',
              }}
            >
              Á Châu JSC
            </Typography>
          </Box>
        </Box>
      </div>
    </header>
  );
};

export default PostJobNavbar;
