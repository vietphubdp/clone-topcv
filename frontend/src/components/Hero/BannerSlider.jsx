import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const BannerSlider = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        flex: 1,
        width: '100%',
        minHeight: { xs: 'auto', md: '320px' },
        borderRadius: '16px',
        background: 'linear-gradient(125deg, #e4f3ff 0%, #d4ebfd 50%, #e1f4ff 100%)',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 3, md: 0 },
      }}
    >
      {/* Main Banner Content Layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          alignItems: 'center',
          justify: 'space-between',
          px: { xs: 2.5, sm: 4, md: 5 },
          gap: { xs: 2, sm: 1 },
        }}
      >
        {/* Left Professional Illustration Graphic */}
        <Box
          sx={{
            width: { xs: '100%', sm: '42%', md: '45%' },
            maxHeight: { xs: '180px', sm: '260px', md: '280px' },
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            position: 'relative',
          }}
        >
          {/* Custom SVG Graphic of 2 smiling professionals holding laptops */}
          <svg
            viewBox="0 0 320 280"
            style={{ width: '100%', height: '100%', maxHeight: '250px', objectFit: 'contain' }}
          >
            <defs>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64b5f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1e88e5" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="shirtGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e0e0e0" />
              </linearGradient>
              <linearGradient id="shirtGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1976d2" />
                <stop offset="100%" stopColor="#0d47a1" />
              </linearGradient>
            </defs>

            {/* Background Decorative Circle */}
            <circle cx="160" cy="140" r="110" fill="url(#bgGrad)" />

            {/* Woman Figure (Left) */}
            <g transform="translate(45, 40)">
              <path d="M 55 50 Q 55 10 95 10 Q 135 10 135 50 Q 135 90 120 120 L 70 120 Z" fill="#2c1d11" />
              <ellipse cx="95" cy="65" rx="28" ry="32" fill="#ffdbac" />
              <circle cx="85" cy="60" r="3" fill="#2c1d11" />
              <circle cx="105" cy="60" r="3" fill="#2c1d11" />
              <path d="M 87 75 Q 95 85 103 75" fill="none" stroke="#d32f2f" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 60 100 L 130 100 L 140 220 L 50 220 Z" fill="url(#shirtGrad1)" />
              <path d="M 55 100 Q 80 120 75 220 L 50 220 Z" fill="#37474f" />
              <path d="M 135 100 Q 110 120 115 220 L 140 220 Z" fill="#37474f" />
              <rect x="70" y="140" width="75" height="50" rx="4" fill="#90a4ae" />
              <rect x="75" y="145" width="65" height="35" rx="2" fill="#e0f7fa" />
              <polygon points="60,190 155,190 150,200 65,200" fill="#78909c" />
            </g>

            {/* Man Figure (Right) */}
            <g transform="translate(135, 20)">
              <path d="M 65 35 Q 95 10 125 35 L 125 55 L 65 55 Z" fill="#1a1a1a" />
              <ellipse cx="95" cy="60" rx="27" ry="30" fill="#f1c27d" />
              <circle cx="85" cy="55" r="3" fill="#1a1a1a" />
              <circle cx="105" cy="55" r="3" fill="#1a1a1a" />
              <path d="M 87 72 Q 95 82 103 72" fill="none" stroke="#c62828" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 55 95 L 135 95 L 145 240 L 45 240 Z" fill="url(#shirtGrad2)" />
              <polygon points="92,95 98,95 96,150 94,150" fill="#d32f2f" />
              <rect x="40" y="150" width="75" height="50" rx="4" fill="#37474f" />
              <rect x="45" y="155" width="65" height="35" rx="2" fill="#ffffff" />
              <polygon points="30,200 125,200 120,210 35,210" fill="#263238" />
            </g>

            {/* Floating Job Icon Badges */}
            <g transform="translate(20, 90)">
              <circle cx="20" cy="20" r="18" fill="#64b5f6" />
              <path d="M 12 15 L 28 15 L 28 26 L 12 26 Z" fill="none" stroke="#ffffff" strokeWidth="2" />
              <path d="M 12 15 L 20 21 L 28 15" fill="none" stroke="#ffffff" strokeWidth="2" />
            </g>
            <g transform="translate(250, 70)">
              <circle cx="20" cy="20" r="18" fill="#66bb6a" />
              <path d="M 13 20 L 18 25 L 27 14" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </Box>

        {/* Right Banner Text Info */}
        <Box
          sx={{
            width: { xs: '100%', sm: '55%', md: '52%' },
            pl: { xs: 0, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {/* Subtitle Script */}
          <Typography
            sx={{
              fontFamily: '"Caveat", "Brush Script MT", cursive, sans-serif',
              fontSize: { xs: '22px', md: '26px' },
              color: '#1565c0',
              fontWeight: 700,
              lineHeight: 1,
              fontStyle: 'italic',
            }}
          >
            Cơ hội được đề xuất
          </Typography>

          {/* Main Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: '#102a43',
              fontSize: { xs: '18px', sm: '20px', md: '23px' },
              lineHeight: 1.3,
            }}
          >
            Kiếm thêm{' '}
            <span style={{ color: '#00b14f', fontWeight: 900 }}>thu nhập</span>
            <br />
            khi đang tìm việc
          </Typography>

          {/* Badges Row */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.8,
              my: 0.5,
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Chip
              icon={<AccessTimeIcon sx={{ fontSize: '15px !important', color: '#00b14f !important' }} />}
              label="Thời gian linh hoạt"
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderColor: '#b2dfdb',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2e7d32',
                height: '26px',
              }}
            />
            <Chip
              icon={<AccountCircleOutlinedIcon sx={{ fontSize: '15px !important', color: '#00b14f !important' }} />}
              label="Nhà tuyển dụng uy tín"
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderColor: '#b2dfdb',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2e7d32',
                height: '26px',
              }}
            />
            <Chip
              icon={<VerifiedUserOutlinedIcon sx={{ fontSize: '15px !important', color: '#00b14f !important' }} />}
              label="Ứng tuyển minh bạch"
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderColor: '#b2dfdb',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2e7d32',
                height: '26px',
              }}
            />
          </Box>

          {/* Action Button */}
          <Box sx={{ mt: 0.5 }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#00b14f',
                color: '#ffffff',
                borderRadius: '24px',
                px: 3,
                py: 0.8,
                fontWeight: 700,
                fontSize: '13.5px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0, 177, 79, 0.3)',
                '&:hover': {
                  backgroundColor: '#009643',
                },
              }}
            >
              Khám phá ngay
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerSlider;
