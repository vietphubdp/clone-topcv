import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const CategoryIcon = ({ type }) => {
  switch (type) {
    case 'sales':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          <path d="M 12 28 L 32 8 L 56 32 L 36 52 Z" fill="#00b14f" />
          <circle cx="24" cy="20" r="4" fill="#ffffff" />
          <text x="31" y="37" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">$</text>
        </svg>
      );
    case 'marketing':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          {/* Megaphone */}
          <polygon points="12,28 22,22 42,16 42,48 22,42 12,36" fill="#2c3e50" />
          <path d="M 22 42 L 26 56 L 34 56 L 30 42 Z" fill="#2c3e50" />
          {/* Media Floating Icons */}
          <rect x="44" y="10" width="16" height="14" rx="2" fill="#00b14f" />
          <polygon points="50,14 56,17 50,20" fill="#ffffff" />
          <rect x="40" y="28" width="16" height="12" rx="2" fill="#00b14f" />
          <path d="M 42 31 L 48 35 L 54 31" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );
    case 'cs':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          {/* Headset */}
          <path d="M 14 36 A 20 20 0 0 1 50 36" fill="none" stroke="#1c2d3d" strokeWidth="6" strokeLinecap="round" />
          <rect x="10" y="32" width="8" height="16" rx="4" fill="#1c2d3d" />
          <rect x="46" y="32" width="8" height="16" rx="4" fill="#1c2d3d" />
          {/* Green Speech Bubble */}
          <circle cx="32" cy="30" r="14" fill="#00b14f" />
          <circle cx="25" cy="30" r="2" fill="#ffffff" />
          <circle cx="32" cy="30" r="2" fill="#ffffff" />
          <circle cx="39" cy="30" r="2" fill="#ffffff" />
        </svg>
      );
    case 'hr':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          {/* Briefcase */}
          <rect x="14" y="22" width="36" height="26" rx="4" fill="#2c3e50" />
          <path d="M 24 22 V 16 Q 24 12 28 12 H 36 Q 40 12 40 16 V 22" fill="none" stroke="#2c3e50" strokeWidth="4" />
          {/* Green Paperclip */}
          <path d="M 44 26 V 46 Q 44 52 38 52 Q 32 52 32 46 V 32 Q 32 28 36 28 Q 40 28 40 32 V 42" fill="none" stroke="#00b14f" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'it':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          {/* Laptop Base */}
          <rect x="8" y="44" width="48" height="6" rx="3" fill="#2c3e50" />
          {/* Screen */}
          <rect x="14" y="18" width="36" height="24" rx="3" fill="#00b14f" />
          <text x="24" y="35" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">IT</text>
          {/* Gear Icon */}
          <circle cx="44" cy="18" r="6" fill="#2c3e50" />
        </svg>
      );
    case 'finance':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          {/* Bank Roof */}
          <polygon points="32,12 12,24 52,24" fill="#2c3e50" />
          {/* Columns */}
          <rect x="16" y="26" width="6" height="18" fill="#00b14f" />
          <rect x="29" y="26" width="6" height="18" fill="#00b14f" />
          <rect x="42" y="26" width="6" height="18" fill="#00b14f" />
          <rect x="12" y="44" width="40" height="4" fill="#2c3e50" />
          {/* Coin */}
          <circle cx="44" cy="42" r="8" fill="#ffb300" />
          <text x="41" y="46" fill="#ffffff" fontSize="11" fontWeight="bold">$</text>
        </svg>
      );
    case 'realestate':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          {/* Green Building */}
          <rect x="14" y="16" width="20" height="34" fill="#00b14f" />
          <rect x="18" y="22" width="4" height="4" fill="#ffffff" />
          <rect x="26" y="22" width="4" height="4" fill="#ffffff" />
          <rect x="18" y="30" width="4" height="4" fill="#ffffff" />
          <rect x="26" y="30" width="4" height="4" fill="#ffffff" />
          {/* Dark House */}
          <polygon points="42,24 28,36 56,36" fill="#1c2d3d" />
          <rect x="32" y="36" width="20" height="14" fill="#1c2d3d" />
          <rect x="38" y="42" width="8" height="8" fill="#ffffff" />
        </svg>
      );
    case 'accounting':
      return (
        <svg viewBox="0 0 64 64" width="56" height="56">
          {/* Calculator */}
          <rect x="20" y="14" width="28" height="38" rx="4" fill="#2c3e50" />
          <rect x="24" y="18" width="20" height="8" fill="#ffffff" />
          <circle cx="26" cy="32" r="2" fill="#ffffff" />
          <circle cx="34" cy="32" r="2" fill="#ffffff" />
          <circle cx="42" cy="32" r="2" fill="#ffffff" />
          <circle cx="26" cy="40" r="2" fill="#ffffff" />
          <circle cx="34" cy="40" r="2" fill="#ffffff" />
          <circle cx="42" cy="40" r="2" fill="#ffffff" />
          {/* Green Check Circle */}
          <circle cx="20" cy="42" r="10" fill="#00b14f" />
          <path d="M 15 42 L 18 45 L 25 38" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

const SLUG_MAP = {
  sales: 'kinh-doanh-ban-hang',
  marketing: 'marketing-pr-quang-cao',
  cs: 'cham-soc-khach-hang-van-hanh',
  hr: 'nhan-su-hanh-chinh-phap-che',
  it: 'cong-nghe-thong-tin',
  finance: 'kinh-doanh-ban-hang',
  realestate: 'sales-bat-dong-san',
  accounting: 'nhan-su-hanh-chinh-phap-che',
};

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const slug = category.slug || SLUG_MAP[category.iconType] || 'cong-nghe-thong-tin';
    navigate(`/jobs?category_slug=${encodeURIComponent(slug)}&category_name=${encodeURIComponent(category.title)}`);
  };

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        p: '24px 16px',
        border: '1px solid #eef2f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
          backgroundColor: '#ffffff',
          borderColor: '#00b14f',
          boxShadow: '0 8px 24px rgba(0, 177, 79, 0.12)',
          transform: 'translateY(-4px)',
          '& .cat-card-title': {
            color: '#00b14f',
          },
        },
      }}
    >
      {/* Icon */}
      <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'center' }}>
        <CategoryIcon type={category.iconType} />
      </Box>

      {/* Title */}
      <Typography
        className="cat-card-title"
        sx={{
          fontWeight: 700,
          fontSize: '14.5px',
          color: '#212f3f',
          mb: 0.8,
          lineHeight: 1.3,
          height: '38px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          transition: 'color 0.2s ease',
        }}
      >
        {category.title}
      </Typography>

      {/* Job Count */}
      <Typography
        sx={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#00b14f',
        }}
      >
        {category.count}
      </Typography>
    </Box>
  );
};

export default CategoryCard;
