import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const renderBadge = (badge, idx) => {
  let bgColor = '#00b14f';
  let icon = null;

  if (badge.type === 'hot') {
    bgColor = '#ff4d4f';
    icon = <FlashOnIcon sx={{ fontSize: '12px !important', mr: 0.2 }} />;
  } else if (badge.type === 'gap') {
    bgColor = '#ff9800';
  } else if (badge.type === 'new') {
    bgColor = '#1890ff';
    icon = <NewReleasesIcon sx={{ fontSize: '12px !important', mr: 0.2 }} />;
  } else if (badge.type === 'highlight') {
    bgColor = '#ff5722';
    icon = <StarIcon sx={{ fontSize: '12px !important', mr: 0.2 }} />;
  }

  return (
    <Box
      key={idx}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: bgColor,
        color: '#ffffff',
        fontSize: '9.5px',
        fontWeight: 800,
        px: '6px',
        py: '1px',
        borderRadius: '10px',
        lineHeight: 1.4,
        letterSpacing: '0.3px',
      }}
    >
      {icon}
      {badge.label}
    </Box>
  );
};

const JobCard = ({ job }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/job-detail');
  };

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        p: '14px 16px',
        border: '1px solid #eef2f5',
        borderLeft: job.hasAccentBorder ? '4px solid #00b14f' : '1px solid #eef2f5',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        height: '140px',
        boxSizing: 'border-box',
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
          borderColor: '#00b14f',
          boxShadow: '0 6px 18px rgba(0, 177, 79, 0.12)',
          transform: 'translateY(-2px)',
          '& .job-card-title': {
            color: '#00b14f',
          },
        },
      }}
    >
      {/* Top Section: Logo & Info */}
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {/* Company Logo Box */}
        <Box
          sx={{
            width: '52px',
            height: '52px',
            borderRadius: '10px',
            border: '1px solid #eeeeee',
            backgroundColor: job.logoBg || '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            flexShrink: 0,
            p: 0.5,
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '11px',
              color: job.logoColor || '#333',
              textAlign: 'center',
              lineHeight: 1.1,
              wordBreak: 'break-word',
            }}
          >
            {job.logoText}
          </Typography>
        </Box>

        {/* Job Title & Company */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Badges Row */}
          {job.badges && job.badges.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.6, mb: 0.5, flexWrap: 'wrap' }}>
              {job.badges.map((b, idx) => renderBadge(b, idx))}
            </Box>
          )}

          {/* Job Title */}
          <Tooltip title={job.title} placement="top" arrow>
            <Typography
              className="job-card-title"
              sx={{
                fontWeight: 700,
                fontSize: '13.5px',
                color: '#212f3f',
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'color 0.2s ease',
              }}
            >
              {job.title}
            </Typography>
          </Tooltip>

          {/* Company Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.4 }}>
            {job.isPro && (
              <Box
                sx={{
                  backgroundColor: '#ff9800',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 800,
                  px: '5px',
                  py: '1px',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                }}
              >
                Pro
              </Box>
            )}
            <Typography
              sx={{
                fontSize: '11.5px',
                color: '#666666',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {job.company}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bottom Section: Tags & Favorite Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          mt: 1,
        }}
      >
        {/* Salary & Location Tags */}
        <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center', overflow: 'hidden' }}>
          <Box
            sx={{
              backgroundColor: '#f4f6f8',
              color: '#00b14f',
              fontWeight: 700,
              fontSize: '11.5px',
              px: 1.2,
              py: 0.4,
              borderRadius: '12px',
              whiteSpace: 'nowrap',
            }}
          >
            {job.salary}
          </Box>
          <Box
            sx={{
              backgroundColor: '#f4f6f8',
              color: '#555555',
              fontWeight: 500,
              fontSize: '11.5px',
              px: 1.2,
              py: 0.4,
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '120px',
            }}
          >
            {job.location}
          </Box>
        </Box>

        {/* Favorite Heart Button */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          sx={{
            width: 28,
            height: 28,
            border: '1px solid',
            borderColor: isLiked ? '#00b14f' : '#d0d7de',
            color: isLiked ? '#00b14f' : '#888888',
            '&:hover': {
              borderColor: '#00b14f',
              backgroundColor: '#e6f7ef',
              color: '#00b14f',
            },
          }}
        >
          {isLiked ? <FavoriteIcon sx={{ fontSize: '16px' }} /> : <FavoriteBorderIcon sx={{ fontSize: '16px' }} />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default JobCard;
