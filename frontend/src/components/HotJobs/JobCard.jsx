import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
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
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (job.slug) {
      navigate(`/job/${job.slug}`);
    } else {
      navigate('/job-detail');
    }
  };

  const companyName = typeof job.company === 'string' ? job.company : job.company?.name || 'Công ty';
  const logoText = job.logoText || companyName.substring(0, 2).toUpperCase();

  let formattedSalary = job.salary;
  if (typeof job.salary === 'object' && job.salary !== null) {
    const { min, max, is_negotiable, type } = job.salary;
    if (is_negotiable || type === 'AGREEMENT') {
      formattedSalary = 'Thỏa thuận';
    } else if (min && max) {
      formattedSalary = `${(min / 1000000).toLocaleString('vi-VN')} - ${(max / 1000000).toLocaleString('vi-VN')} triệu`;
    } else if (max) {
      formattedSalary = `Tới ${(max / 1000000).toLocaleString('vi-VN')} triệu`;
    } else if (min) {
      formattedSalary = `Từ ${(min / 1000000).toLocaleString('vi-VN')} triệu`;
    } else {
      formattedSalary = 'Thỏa thuận';
    }
  } else if (!formattedSalary) {
    formattedSalary = 'Thỏa thuận';
  }

  let formattedLocation = job.location;
  if (!formattedLocation && Array.isArray(job.work_location) && job.work_location.length > 0) {
    formattedLocation = job.work_location
      .map((loc) => loc.city_name || loc.address_detail)
      .filter(Boolean)
      .join(', ') || 'Toàn quốc';
  } else if (!formattedLocation) {
    formattedLocation = 'Toàn quốc';
  }

  const badges = job.badges || (job.is_hot ? [{ type: 'hot', label: 'HOT' }] : []);

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        p: '14px 16px',
        border: '1px solid #eef2f5',
        borderLeft: (job.hasAccentBorder || job.is_hot) ? '4px solid #00b14f' : '1px solid #eef2f5',
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
          {job.company?.logo_url ? (
            <img src={job.company.logo_url} alt={companyName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '11px',
                color: job.logoColor || '#00b14f',
                textAlign: 'center',
                lineHeight: 1.1,
                wordBreak: 'break-word',
              }}
            >
              {logoText}
            </Typography>
          )}
        </Box>

        {/* Job Title & Company */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Badges Row */}
          {badges && badges.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.6, mb: 0.5, flexWrap: 'wrap' }}>
              {badges.map((b, idx) => renderBadge(b, idx))}
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
              {companyName}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bottom Section: Tags */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
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
            {formattedSalary}
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
              maxWidth: '160px',
            }}
          >
            {formattedLocation}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;
